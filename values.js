(function () {

    "use strict";

    window.Values = Values;

    function Values( options ) {
        this.settings = {
            color: {
                hex: "#37D7C2",
                rgb: {r: 55,  g: 215, b: 194},
                hsl: {h: 172, s: 67,  l: 53},
                hslText: 'hsl(172, 67%, 53%)',
                rgbText: 'rgb(55, 215, 194)'
            },
            range: 1
        };

        if ( typeof options === "object" ) {
            for ( var i in options ) {
                if ( options.hasOwnProperty(i) ) {
                    this.settings[i] = options[i];
                }
            }
        }

        if ( typeof options === "string" ) {
            this.setColor( options );
        }
    }

    var HEXtoRGB = function ( color ) {
        color = color.replace('#', '');
        var r, g, b;
        if ( color.length === 6 ) {
            r = parseInt(color.slice(0,2), 16),
            g = parseInt(color.slice(2,4), 16),
            b = parseInt(color.slice(4,6), 16);
        } else {
            r = parseInt(color.slice(0,1) + color.slice(0,1), 16),
            g = parseInt(color.slice(1,2) + color.slice(1,2), 16),
            b = parseInt(color.slice(2,3) + color.slice(2,3), 16);
        }
        return {
            r : r,
            g : g,
            b : b
        };
    };

    var RGBtoHEX = function (r, g, b) {
        var r = parseInt(r).toString(16),
            g = parseInt(g).toString(16),
            b = parseInt(b).toString(16);
        r = r.length === 1 ? "0" + r : r;
        g = g.length === 1 ? "0" + g : g;
        b = b.length === 1 ? "0" + b : b;
        return '#' + r + '' + g + '' + b;
    };

    var RGBtoHSL = function( r, g, b ) {
        var r   = r/255, g   = g/255, b   = b/255,
            max = Math.max(r, g, b), min = Math.min(r, g, b),
            h, s, l = (max + min) / 2;
        if (max === min) {
            h = s = 0; // achromatic
        } else {
            var d = max - min;
            s = l > 0.5
                ? d / (2 - max - min)
                : d / (max + min);
            switch( max ) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return {
            h: h,
            s: s,
            l: l
        };
    };

    var HUEtoRGB = function (v1, v2, vh) {
        if ( vh < 0 ) vh += 1;
        if ( vh > 1 ) vh -= 1;
        if ( (6 * vh) < 1 ) return ( v1 + (v2 - v1) * 6 * vh );
        if ( (2 * vh) < 1 ) return v2;
        if ( (3 * vh) < 2 ) return ( v1 + (v2 - v1) * ((2/3) - vh) * 6 );
        return v1;
    }

     var HSLtoRGB = function(h, s, l) {
        var r, g, b;

        if(s == 0){
            r = g = b = l; // achromatic
        } else {
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = HUEtoRGB(p, q, h + 1/3);
            g = HUEtoRGB(p, q, h);
            b = HUEtoRGB(p, q, h - 1/3);
        }

        return {
            r: r * 255,
            g: g * 255,
            b: b * 255
        };
    };

    Values.prototype.getTints = function( include_base_color ) {
        var h = this.settings.color.hsl.h,
            s = this.settings.color.hsl.s,
            l = this.settings.color.hsl.l,
            i = 100,
            tints = [];

        while ( i > parseInt(l, 10) ) {
            var rgb = HSLtoRGB( h / 360, s / 100, i / 100),
                obj = {};
            obj.rgb = {r: Math.round(rgb.r), g: Math.round(rgb.g), b: Math.round(rgb.b) };
            obj.hsl = {h: h, s: s, l: i};
            obj.hex = RGBtoHEX( obj.rgb.r, obj.rgb.g, obj.rgb.b );
            obj.hslText = 'hsl(' + h + ', ' + s + '%, ' + i + '%)';
            obj.rgbText = 'rgb(' + obj.rgb.r + ', ' + obj.rgb.g + ', ' + obj.rgb.b + ')';
            tints.push( obj );
            i -= this.settings.range;
        };

        if ( include_base_color ) {
            tints.push( this.getColor() );
        }

        return tints;
    };

    Values.prototype.getShades = function( include_base_color ) {
        var h = this.settings.color.hsl.h,
            s = this.settings.color.hsl.s,
            l = this.settings.color.hsl.l,
            i = 0,
            shades = [];

        while ( i < parseInt(l, 10) ) {
            var rgb = HSLtoRGB( h / 360, s / 100, i / 100),
                obj = {};
            obj.rgb = {r: Math.round(rgb.r), g: Math.round(rgb.g), b: Math.round(rgb.b) };
            obj.hsl = {h: h, s: s, l: i};
            obj.hex = RGBtoHEX( obj.rgb.r, obj.rgb.g, obj.rgb.b );
            obj.hslText = 'hsl(' + h + ', ' + s + '%, ' + i + '%)';
            obj.rgbText = 'rgb(' + obj.rgb.r + ', ' + obj.rgb.g + ', ' + obj.rgb.b + ')';
            shades.push( obj );
            i += this.settings.range;
        };

        if ( include_base_color ) {
            shades.push( this.getColor() );
        }

        return shades.reverse();
    };

    Values.prototype.getTintsAndShades = function() {
        var tints   = this.getTints(),
            shades  = this.getShades(),
            color   = this.settings.color,
            all     = [];

        for ( var i in tints ) {
            if ( tints.hasOwnProperty(i) ) {
                all.push( tints[i] );
            }
        }

        all.push( color );

        for ( var i in shades ) {
            if ( shades.hasOwnProperty(i) ) {
                all.push( shades[i] );
            }
        }

        return all;
    };

    Values.prototype.getColor = function() {
        return this.settings.color;
    };

    Values.prototype.getRange = function() {
        return this.settings.range;
    };

    Values.prototype.setRange = function( value ) {
        this.settings.range = value;
        return this;
    };

    Values.prototype.setColor = function( value ) {
        var rgb = HEXtoRGB( value ),
            hsl = RGBtoHSL( rgb.r, rgb.g, rgb.b ),
            h   = Math.round(hsl.h * 360),
            s   = Math.round(hsl.s * 100),
            l   = Math.round(hsl.l * 100);
        this.settings.color = {
            hex: value,
            rgb: rgb,
            hsl: {h: h, s: s, l: l},
            hslText: 'hsl(' + h + ', ' + s + '%, ' + l + '%)',
            rgbText: 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')'
        };
        return this;
    };

    Values.prototype.lightness = function( value, include_base_color ) {
        if ( typeof value === 'number') {
            var h = this.settings.color.hsl.h,
                s = this.settings.color.hsl.s,
                l = this.settings.color.hsl.l,
                lightness = (l + value);

            if (lightness < 0)   lightness = 0;
            if (lightness > 100) lightness = 100;

            var rgb = HSLtoRGB( h / 360, s / 100, lightness / 100),
                r = Math.round(rgb.r),
                g = Math.round(rgb.g),
                b = Math.round(rgb.b),
                obj = {};

            obj.rgb = {
                r: r,
                g: g,
                b: b
            };

            obj.hsl = {
                h: h,
                s: s,
                l: lightness
            };

            obj.hex = RGBtoHEX( obj.rgb.r, obj.rgb.g, obj.rgb.b );
            obj.hslText = 'hsl(' + h + ', ' + s + '%, ' + lightness + '%)';
            obj.rgbText ='rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')';

            return include_base_color ? [this.getColor(), obj] : [obj];
        }
        console.error('lightness expects a number');
    };

})();

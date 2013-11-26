(function (global) {

    "use strict";

    global.Values = function Values(options) {
        this.hex            = '#000000';
        this.rgb            = 'rgb(0, 0, 0)';
        this.rgba           = 'rgba(0, 0, 0, 0)';
        this.hsl            = 'hsl(0, 0%, 0%)';
        this.hsla           = 'hsla(0, 0%, 0%, 0)';
        this.brightness     = 0;
        this.step           = 1;
        this.tints          = [];
        this.shades         = [];
        this.all            = [];
        this._rgb           = {r: 0, g: 0, b: 0};
        this._rgba          = {r: 0, g: 0, b: 0, a: 0};
        this._hsl           = {h: 0, s: 0, l: 0};
        this._hsla          = {h: 0, s: 0, l: 0, a: 0};

        if ( typeof options === "string" ) {
            this.setColor( options );
        }
    };

    Values.Utils = {
        isHEX : function isHEX(value) {
            return /^(#)?([0-9a-fA-F]{3})([0-9a-fA-F]{3})?$/.test(value);
        },
        isRGB : function isRGB(value) {
            return /^\s*rgba?\s*\((\d+)\,\s*(\d+)\,\s*(\d+)(,\s*(\d+(\.\d+)?))?\)\s*$/.test(value);
        },
        RGBA : function RGBA(color, alpha) {
            var rgb = HEXtoRGB(color);
            return 'rgba('+rgb.r+', '+rgb.g+', '+rgb.b+', '+alpha+')';
        }
    };

    var HEXtoRGB = function (color) {
        var r, g, b;
        color = color.replace('#', '');
        if ( color.length === 6 ) {
            r = parseInt(color.slice(0,2), 16);
            g = parseInt(color.slice(2,4), 16);
            b = parseInt(color.slice(4,6), 16);
        } else {
            r = parseInt(color.slice(0,1) + color.slice(0,1), 16);
            g = parseInt(color.slice(1,2) + color.slice(1,2), 16);
            b = parseInt(color.slice(2,3) + color.slice(2,3), 16);
        }
        return {r: r, g: g, b: b};
    };

    var RGBtoHEX = function (r, g, b) {
        r = parseInt(r).toString(16);
        g = parseInt(g).toString(16);
        b = parseInt(b).toString(16);
        r = r.length === 1 ? "0" + r : r;
        g = g.length === 1 ? "0" + g : g;
        b = b.length === 1 ? "0" + b : b;
        return '#' + r + '' + g + '' + b;
    };

    var RGBtoHSL = function(r, g, b) {
        var r = r/255,
            g = g/255,
            b = b/255,
            max = Math.max(r, g, b),
            min = Math.min(r, g, b),
            h, s, l = (max + min) / 2;
        if (max === min) {
            h = s = 0;
        } else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return {h: h, s: s, l: l};
    };

    var HUEtoRGB = function (v1, v2, vh) {
        if (vh < 0) vh += 1;
        if (vh > 1) vh -= 1;
        if ((6 * vh) < 1) return (v1 + (v2 - v1) * 6 * vh);
        if ((2 * vh) < 1) return v2;
        if ((3 * vh) < 2) return (v1 + (v2 - v1) * ((2/3) - vh) * 6);
        return v1;
    }

     var HSLtoRGB = function(h, s, l) {
        var r, g, b;
        if (s == 0) {
            r = g = b = l;
        } else {
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = HUEtoRGB(p, q, h + 1/3);
            g = HUEtoRGB(p, q, h);
            b = HUEtoRGB(p, q, h - 1/3);
        }

        return {r: r * 255, g: g * 255, b: b * 255};
    };

    var getBrightness = function getBrightness(rgb) {
        var sum = rgb.r + rgb.g + rgb.b;
        return Math.round(sum / (255 * 3) * 100);
    };

    var __setValues = function __setValues(obj, rgb, h, s, l) {
        var r = Math.round(rgb.r),
            g = Math.round(rgb.g),
            b = Math.round(rgb.b);

        obj._rgb    = {r: r, g: g, b: b};
        obj._hsl    = {h: h, s: s, l: l};
        obj.hex     = RGBtoHEX(r, g, b);
        obj._rgba   = obj._rgb.a = 1;
        obj._hsla   = obj._hsl.a = 1;
        obj.rgb     = 'rgb('+r+', '+g+', '+b+')';
        obj.rgba    = 'rgba('+r+', '+g+', '+b+', 1)';
        obj.hsl     = 'hsl('+h+', '+s+'%, '+l+'%)';
        obj.hsla    = 'hsla('+h+', '+s+'%, '+l+'%, 1)';
        obj.brightness = getBrightness(obj._rgb);

        return obj;
    };

    Values.prototype.setColor = function setColor(value) {
        var $hex, $rgb, $hsl, $h, $s, $l;

        if (Values.Utils.isHEX(value)) {
            if (!/^#/.test(value)) value = '#' + value;
            $hex = value;
        }

        if (Values.Utils.isRGB(value)) {
            var _rgb = value.replace(/[^\d,]/g, '').split(',');
            $hex = RGBtoHEX( _rgb[0], _rgb[1], _rgb[2] );
        }

        $rgb    = HEXtoRGB($hex);
        $hsl    = RGBtoHSL($rgb.r, $rgb.g, $rgb.b);
        $h      = Math.round($hsl.h * 360);
        $s      = Math.round($hsl.s * 100);
        $l      = Math.round($hsl.l * 100);

        __setValues(this, $rgb, $h, $s, $l);

        this.step   = 1;
        this.__updateValues();

        return this;
    };

    Values.prototype.setStep = function setStep(value) {
        this.step = value;
        this.__updateValues();
        return this;
    };

    Values.prototype.getTints = function getTints(include_base) {
        var arr = this.tints;
        if (include_base) arr = arr.concat(this.__getCurrent());
        return arr;
    };

    Values.prototype.getShades = function getShades(include_base) {
        var arr = this.shades;
        if (include_base) arr = [this.__getCurrent()].concat(arr);
        return arr;
    };

    Values.prototype.getAll = function getAll() {
        return this.all;
    };

     Values.prototype.lightness = function lightness(value) {
        if ( typeof value === 'number') {
            var $h = this._hsl.h,
                $s = this._hsl.s,
                $l = this._hsl.l,
                $lightness = ($l + value);

            if ($lightness < 0)   lightness = 0;
            if ($lightness > 100) lightness = 100;

            var $rgb = HSLtoRGB($h/360, $s/100, $lightness/100);
            var $obj = __setValues({}, $rgb, $h, $s, $lightness);

            return $obj;
        }

        console.error('lightness expects a number');
    };

    Values.prototype.__updateValues = function __updateValues() {
        this.tints  = this.__getTints();
        this.shades = this.__getShades();
        this.all = this.tints.concat(this.__getCurrent(), this.shades);
    };

    Values.prototype.__getCurrent = function __getCurrent() {
        return __setValues({}, this._rgb, this._hsl.h, this._hsl.s, this._hsl.l);
    };

    Values.prototype.__getTints = function __getTints() {
        var $h = this._hsl.h,
            $s = this._hsl.s,
            $l = this._hsl.l,
            $i = 100,
            $tints  = [];

        while ($i > parseInt($l, 10)) {
            var $rgb = HSLtoRGB($h/360, $s/100, $i/100);
            $tints[$tints.length] = __setValues({}, $rgb, $h, $s, $i);
            $i -= this.step;
        };

        return $tints;
    };

    Values.prototype.__getShades = function __getShades() {
        var $h = this._hsl.h,
            $s = this._hsl.s,
            $l = this._hsl.l,
            $i = 0,
            $shades = [];

        while ($i < parseInt($l, 10)) {
            var $rgb = HSLtoRGB($h/360, $s/100, $i/100);
            $shades[$shades.length] = __setValues({}, $rgb, $h, $s, $i);
            $i += this.step;
        };

        return $shades.reverse();
    };

})(window);

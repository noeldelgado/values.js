"use strict"

var assert = require('assert')
var Values = require('./')
var color = new Values('0099cc')

describe('new instance setup', function() {
    it('should instantiate correctly', function() {
        var hex = color.hex
        var rgb = color.rgb
        var hsl = color.hsl

        assert.equal(color instanceof Values, true)
        assert.equal(color.hex, '0099cc')
        assert.equal(color.rgb.r, 0)
        assert.equal(color.rgb.g, 153)
        assert.equal(color.rgb.b, 204)
        assert.equal(color.hsl.h, 195)
        assert.equal(color.hsl.s, 100)
        assert.equal(color.hsl.l, 40)
    })
})

describe('values.methods', function() {
    describe('values.method.setColor', function() {
        it('should update instance with setColor', function() {
            color.setColor('rgb(0,255,255)')

            var hex = color.hex
            var rgb = color.rgb
            var hsl = color.hsl

            assert.equal(color.hex, '00ffff')
            assert.equal(color.rgb.r, 0)
            assert.equal(color.rgb.g, 255)
            assert.equal(color.rgb.b, 255)
            assert.equal(color.hsl.h, 180)
            assert.equal(color.hsl.s, 100)
            assert.equal(color.hsl.l, 50)
        })
    })

    describe('values.method.tint', function() {
        it('should calculate independent tints', function() {
            assert.equal(color.tint(10).hexString(), '#19ffff')
            assert.equal(color.tint(20).hexString(), '#33ffff')
            assert.equal(color.tint(30).hexString(), '#4dffff')
            assert.equal(color.tint(10).rgbString(), 'rgb(25, 255, 255)')
            assert.equal(color.tint(10).hslString(), 'hsl(180, 100%, 55%)')
        })
    })

    describe('values.method.shade', function() {
        it('should calculate independent shades', function() {
            assert.equal(color.shade(10).hexString(), '#00e6e6')
            assert.equal(color.shade(20).hexString(), '#00cccc')
            assert.equal(color.shade(30).hexString(), '#00b3b3')
            assert.equal(color.shade(10).rgbString(), 'rgb(0, 230, 230)')
            assert.equal(color.shade(10).hslString(), 'hsl(180, 100%, 45%)')
        })
    })

    describe('values.method.tints', function() {
        it('should calculate tints', function() {
            var tints = color.tints()
            assert.equal(tints.length, 10)
            assert.equal(tints[0].hex, '19ffff')
            assert.equal(tints[2].hex, '4dffff')
            assert.equal(tints[4].hex, '80ffff')
            assert.equal(tints[6].hex, 'b3ffff')
            assert.equal(tints[8].hex, 'e6ffff')
            assert.equal(tints[9].hex, 'ffffff')
        })
    })

    describe('values.method.shades', function() {
        it('should calculate shades', function() {
            var shades = color.shades()
            assert.equal(shades.length, 10)
            assert.equal(shades[0].hex, '00e6e6')
            assert.equal(shades[2].hex, '00b3b3')
            assert.equal(shades[4].hex, '008080')
            assert.equal(shades[6].hex, '004d4d')
            assert.equal(shades[8].hex, '001919')
            assert.equal(shades[9].hex, '000000')
        })
    })

    describe('values.method.all', function() {
        it('should calculate all', function() {
            var all = color.all()
            assert.equal(all.length, 21)
            assert.equal(all[0].hex, 'ffffff')
            assert.equal(all[10].hex, color.hex)
            assert.equal(all[20].hex, '000000')
        })
    })

    describe('values.method.getBrightness', function() {
        it('should return the brightness', function() {
            assert.equal(color.getBrightness(), 67)
        })
    })

    describe('values.method.hexString', function() {
        it('should return the color in hex string form', function() {
            assert.equal(new Values('0099cc').hexString(), '#0099cc')
        })
    })

    describe('values.method.rgbString', function() {
        it('should return the color in reg string form', function() {
            assert.equal(new Values('0099cc').rgbString(), 'rgb(0, 153, 204)')
        })
    })

    describe('values.method.hslString', function() {
        it('should return the color in hsl string form', function() {
            assert.equal(new Values('0099cc').hslString(), 'hsl(195, 100%, 40%)')
        })
    })
})

describe('values.utils', function() {
    describe('color format validation', function() {
        it('should support hex formats', function() {
            assert.equal(Values.Utils.isHEX('#09c'), true)
            assert.equal(Values.Utils.isHEX('09c'), true)
            assert.equal(Values.Utils.isHEX('#0099cc'), true)
            assert.equal(Values.Utils.isHEX('CCCCCC'), true)
            assert.equal(Values.Utils.isHEX('09cc'), false)
            assert.equal(Values.Utils.isHEX('#FFG'), false)
        })

        it('should support rgb color formats', function() {
            assert.equal(Values.Utils.isRGB('rgba(255,0,0,1)'), true)
            assert.equal(Values.Utils.isRGB('rgb(255,255,255)'), true)
            assert.equal(Values.Utils.isRGB('rgba(100,0,240,0.5)'), true)
            assert.equal(Values.Utils.isRGB('rgba(100,0,240,.5)'), true)
            assert.equal(Values.Utils.isRGB('255,0,0'), false)
            assert.equal(Values.Utils.isRGB('rgb(0,0,0)'), true)
            assert.equal(Values.Utils.isRGB('rgb(255,10,0.5)'), false)
            assert.equal(Values.Utils.isRGB('rgb(255,10.5, 0)'), false)
            assert.equal(Values.Utils.isRGB('rgb(256,0,0)'), false)
            assert.equal(Values.Utils.isRGB('rgb(0,256,0)'), false)
            assert.equal(Values.Utils.isRGB('rgb(0,0,256)'), false)
            assert.equal(Values.Utils.isRGB('RGB(0,0,255)'), true)
        })

        it('should support hsl color formats', function() {
            assert.equal(Values.Utils.isHSL('hsl(198, 58%, 1%)'), true)
            assert.equal(Values.Utils.isHSL('hsla(198, 58%, 1%, 1)'), true)
            assert.equal(Values.Utils.isHSL('hsla(198, 58%, 1%, 0.1)'), true)
            assert.equal(Values.Utils.isHSL('hsla(198, 58%, 1%, 1)'), true)
            assert.equal(Values.Utils.isHSL('hsl(198, 58, 1%)'), false)
            assert.equal(Values.Utils.isHSL('hsl(361, 58%, 1%)'), false)
            assert.equal(Values.Utils.isHSL('hsl(360, 101%, 50%)'), false)
            assert.equal(Values.Utils.isHSL('hsl(360, 100%, 100%)'), true)
            assert.equal(Values.Utils.isHSL('HSL(360, 100%, 100%)'), true)
        })
    })

    describe('color format convertions', function() {
        it('should convert from hex to rgb', function() {
            var rgb = Values.Utils.HEXtoRGB('09f')
            assert.equal(rgb.r, 0)
            assert.equal(rgb.g, 153)
            assert.equal(rgb.b, 255)
        })

        it('should convert from rgb to hex', function() {
            var hex = Values.Utils.RGBtoHEX(0, 153, 255)
            assert.equal(hex, '0099ff')
        })

        it('should convert from rgb to hsl', function() {
            var hsl = Values.Utils.RGBtoHSL(0, 153, 255)
            assert.equal(hsl.h, 204)
            assert.equal(hsl.s, 100)
            assert.equal(hsl.l, 50)
        })

        it('should convert from hsl to rgb', function() {
            var rgb = Values.Utils.HSLtoRGB(204, 100, 50)
            assert.equal(rgb.r, 0)
            assert.equal(rgb.g, 153)
            assert.equal(rgb.b, 255)
        })
    })
})

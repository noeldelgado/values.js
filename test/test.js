"use strict";

var assert = require('assert'),
    Values = require('../source/values.js');

describe('values', function() {
    var color = new Values('#09c');

    it('should set the color correclty', function() {
        assert.equal(color.hex, '#0099cc');
        assert.equal(color.rgb, 'rgb(0, 153, 204)');
        assert.equal(color.rgba, 'rgba(0, 153, 204, 1)');
        assert.equal(color.hsl, 'hsl(195, 100%, 40%)');
        assert.equal(color.hsla, 'hsla(195, 100%, 40%, 1)');
    });

    it('should set the default options correctly', function() {
        assert.equal(color.step, 1);
        assert.equal(color.getShades().concat(color.getTints()).length, 100 / color.step);
        assert.equal(color.getAll().length, 100 / color.step + 1);
    });

    it('should set custom options correctly', function() {
        color.setStep(10);

        assert.equal(color.step, 10);
        assert.equal(color.getShades().concat(color.getTints()).length, 100 / color.step);
        assert.equal(color.getAll().length, 100 / color.step + 1);
    });

});

describe('values.utils', function() {
    it('should support hex formats', function() {
        assert.equal(Values.Utils.isHEX('#09c'), true);
        assert.equal(Values.Utils.isHEX('09c'), true);
        assert.equal(Values.Utils.isHEX('#0099cc'), true);
        assert.equal(Values.Utils.isHEX('CCCCCC'), true);
        assert.equal(Values.Utils.isHEX('09cc'), false);
        assert.equal(Values.Utils.isHEX('#FFG'), false);
    });

    it('should support rgb color formats', function() {
        assert.equal(Values.Utils.isRGB('rgba(255,0,0,1)'), true);
        assert.equal(Values.Utils.isRGB('rgb(255,255,255)'), true);
        assert.equal(Values.Utils.isRGB('rgba(100,0,240,0.5)'), true);
        assert.equal(Values.Utils.isRGB('255,0,0'), false);
        assert.equal(Values.Utils.isRGB('rgb(0,0,0)'), true);
        assert.equal(Values.Utils.isRGB('rgb(255,10,0.5)'), false);
        assert.equal(Values.Utils.isRGB('rgb(255,10.5, 0)'), false);
        assert.equal(Values.Utils.isRGB('rgb(256,0,0)'), false);
        assert.equal(Values.Utils.isRGB('rgb(0,256,0)'), false);
        assert.equal(Values.Utils.isRGB('rgb(0,0,256)'), false);
    });

    it('should support hsl color formats', function() {
        assert.equal(Values.Utils.isHSL('hsl(198, 58%, 1%)'), true);
        assert.equal(Values.Utils.isHSL('hsla(198, 58%, 1%, 1)'), true);
        assert.equal(Values.Utils.isHSL('hsl(198, 58, 1%)'), false);
        assert.equal(Values.Utils.isHSL('hsl(361, 58%, 1%)'), false);
        assert.equal(Values.Utils.isHSL('hsl(360, 101%, 50%)'), false);
        assert.equal(Values.Utils.isHSL('hsl(360, 100%, 100%)'), true);
    });
});

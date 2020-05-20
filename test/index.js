const { clear } = console;
const { round } = Math;
clear();

const assert = require('assert').strict;

const Values = require('..');
const pkg = require('../package.json');

const { equal, deepEqual, ok, throws } = assert;

const setDefaultValue = (input) => {
  const color = new Values(input);
  const { rgb, alpha } = color;
  it('should set default value #000', () => {
    ok(color instanceof Values);
    deepEqual(rgb, [0, 0, 0]);
    equal(alpha, 1);
    equal(color.hexString(), '#000000');
  });
};

describe('version', () => {
  it('should include static prop VERSION', () => ok(Values.VERSION));
  it('version should be equal to pkg.version', () => equal(Values.VERSION, `v${pkg.version}`));
});

// ----------------------------------------------------------------
// USE DEFAULT
// ----------------------------------------------------------------
describe('input validation / use default', () => {
  describe('new Values(<empty>)', () => setDefaultValue());
  describe('new Values(<null>)', () => setDefaultValue(null));
  describe('new Values(<undefined>)', () => setDefaultValue(undefined)); // eslint-disable-line
});

// ----------------------------------------------------------------
// EXCEPTIONS
// ----------------------------------------------------------------
const ERROR_STRING_MSG = 'Error: Unable to parse color from string:';
const ERROR_NON_STRING_MSG = 'TypeError: Input should be a string:';

const handleStringError = (input) => {
  it(`should throw error: ${ERROR_STRING_MSG} ${input}`, () =>
    throws(() => new Values(input), new RegExp(`^${ERROR_STRING_MSG} ${input}$`)));
};
const handleNonStringError = (input) => {
  it(`should throw error: ${ERROR_NON_STRING_MSG} ${input}`, () =>
    throws(() => new Values(input), new RegExp(`^${ERROR_NON_STRING_MSG} ${input}$`)));
};

describe('input validation / exceptions', () => {
  describe('new Values(<"undefined">)', () => handleStringError('undefined'));
  describe('new Values(<"currentColor">)', () => handleStringError('currentColor'));
  describe('new Values(<"inherit">)', () => handleStringError('inherit'));
  describe('new Values(<"f000">)', () => handleStringError('f000'));
  describe('new Values(<0>)', () => handleNonStringError(0));
  describe('new Values(<1>)', () => handleNonStringError(1));
  describe('new Values(<1234>)', () => handleNonStringError(1234));
  describe('new Values(<true>)', () => handleNonStringError(true));
  describe('new Values(<false>)', () => handleNonStringError(false));
  // describe('new Values(<0xFFF>)', () => handleStringError(0xFFFFFF));
});

describe('input special cases: transparent', () => {
  it('new Values(<"transparent">)', () => {
    const { rgb, alpha } = new Values('transparent');
    deepEqual(rgb, [0, 0, 0]);
    equal(alpha, 0);
  });
});

// ----------------------------------------------------------------
// HEX
// ----------------------------------------------------------------
describe('input HEX', () => {
  // it('new Values(0xFF0000)', () => {
  //   const color = new Values(0xFF0000)
  //   equal(color.hex, 'f00')
  //   deepEqual(color.rgb, { r: 255, g: 0, b: 0 })
  //   deepEqual(color.hsl, { h: 0, s: 100, l: 50 })
  // })

  it('new Values("#00f")', () => {
    const color = new Values('#00f');
    deepEqual(color.rgb, [0, 0, 255]);
    equal(color.alpha, 1);
    equal(color.hexString(), '#0000ff');
  });

  it('new Values("#00ff")', () => {
    const color = new Values('#00ff');
    deepEqual(color.rgb, [0, 0, 255]);
    equal(color.alpha, 1);
    equal(color.hexString(), '#0000ff');
  });

  it('new Values("#00f8")', () => {
    const color = new Values('#00f8');
    deepEqual(color.rgb, [0, 0, 255]);
    equal(color.alpha, 0.5333333333333333);
    equal(color.hexString(), '#0000ff88');
  });

  it('new Values("#0000ff")', () => {
    const color = new Values('#0000ff');
    deepEqual(color.rgb, [0, 0, 255]);
    equal(color.alpha, 1);
    equal(color.hexString(), '#0000ff');
  });

  it('new Values("#0000ffff")', () => {
    const color = new Values('#0000ffff');
    deepEqual(color.rgb, [0, 0, 255]);
    equal(color.alpha, 1);
    equal(color.hexString(), '#0000ff');
  });

  it('new Values("#0000ff80")', () => {
    const color = new Values('#0000ff80');
    deepEqual(color.rgb, [0, 0, 255]);
    equal(color.alpha, 0.5019607843137255);
    equal(color.hexString(), '#0000ff80');
  });

  it('new Values("#0000ff00")', () => {
    const { rgb, alpha } = new Values('#0000ff00');
    // equal(hex, '0000ff');
    // deepEqual(rgb, { r: 0, g: 0, b: 255 });
    deepEqual(rgb, [0, 0, 255]);
    // deepEqual(hsl, { h: 240, s: 100, l: 50 });
    equal(alpha, 0);
  });
});

// ----------------------------------------------------------------
// HSL
// ----------------------------------------------------------------
describe('input HSL', () => {
  it('new Values("hsl(0, 100%, 50%)")', () => {
    const { rgb, alpha } = new Values('hsl(0, 100%, 50%)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 1);
  });

  it('new Values("hsl(-240, 100%, 50%)")', () => {
    const { rgb, alpha } = new Values('hsl(-240, 100%, 50%)');
    // equal(hex, '00ff00');
    // deepEqual(rgb, { r: 0, g: 255, b: 0 });
    deepEqual(rgb, [0, 255, 0]);
    // deepEqual(hsl, { h: -240, s: 100, l: 50 });
    equal(alpha, 1);
  });

  it('new Values("hsl(120, -100%, 50%)")', () => {
    const { rgb, alpha } = new Values('hsl(120, -100%, 50%)');
    // equal(hex, '808080');
    // deepEqual(rgb, { r: 128, g: 128, b: 128 });
    deepEqual(rgb, [128, 128, 128]);
    // deepEqual(hsl, { h: 120, s: 0, l: 50 });
    equal(alpha, 1);
  });

  it('new Values("hsl(120, 100%, -50%)")', () => {
    const { rgb, alpha } = new Values('hsl(120, 100%, -50%)');
    // equal(hex, '000000');
    // deepEqual(rgb, { r: 0, g: 0, b: 0 });
    deepEqual(rgb, [0, 0, 0]);
    // deepEqual(hsl, { h: 120, s: 100, l: 0 });
    equal(alpha, 1);
  });

  it('new Values("hsl(120, 200%, 50%)")', () => {
    const { rgb, alpha } = new Values('hsl(120, 200%, 50%)');
    // equal(hex, '00ff00');
    // deepEqual(rgb, { r: 0, g: 255, b: 0 });
    deepEqual(rgb, [0, 255, 0]);
    // equal(hslString, `hsl(120, 100%, 50%)`);
    // deepEqual(hsl, { h: 120, s: 100, l: 50 });
    equal(alpha, 1);
  });

  it('new Values("hsl(120, 100%, 200%)")', () => {
    const { rgb, alpha } = new Values('hsl(120, 100%, 200%)');
    // equal(hex, 'ffffff');
    // deepEqual(rgb, { r: 255, g: 255, b: 255 });
    deepEqual(rgb, [255, 255, 255]);
    // deepEqual(hsl, { h: 120, s: 100, l: 100 });
    equal(alpha, 1);
  });

  // hsla --------------------------------------------
  it('new Values("hsla(0, 100%, 50%, 0.5)")', () => {
    const { rgb, alpha } = new Values('hsla(0, 100%, 50%, 0.5)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 0.5);
  });

  it('new Values("hsla(0, 100%, 50%, 50%)")', () => {
    const { rgb, alpha } = new Values('hsla(0, 100%, 50%, 50%)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 0.5);
  });

  it('new Values("hsla(0, 100%, 50%, 0)")', () => {
    const { rgb, alpha } = new Values('hsla(0, 100%, 50%, 0)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 0);
  });

  it('new Values("hsla(0, 100%, 50%, 50)")', () => {
    const { rgb, alpha } = new Values('hsla(0, 100%, 50%, 50)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 1);
  });

  it('new Values("hsla(0, -100%, 50%, 1)")', () => {
    const { rgb, alpha } = new Values('hsla(0, -100%, 50%, 1)');
    // equal(hex, '808080');
    // deepEqual(rgb, { r: 128, g: 128, b: 128 });
    deepEqual(rgb, [128, 128, 128]);
    // deepEqual(hsl, { h: 0, s: 0, l: 50 });
    equal(alpha, 1);
  });

  it('new Values("hsla(0, 100%, -50%, 1)")', () => {
    const { rgb, alpha } = new Values('hsla(0, 100%, -50%, 1)');
    // equal(hex, '000000');
    // deepEqual(rgb, { r: 0, g: 0, b: 0 });
    deepEqual(rgb, [0, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 0 });
    equal(alpha, 1);
  });

  it('new Values("hsla(0, 100%, 50%, 200%)")', () => {
    const { rgb, alpha } = new Values('hsla(0, 100%, 50%, 200%)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 1);
  });

  it('new Values("hsla(0, 100%, 50%, -200%)")', () => {
    const { rgb, alpha } = new Values('hsla(0, 100%, 50%, -200%)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 0);
  });

  // hsl level 4 ----------------------------------------
  it('new Values("hsl(0deg 100% 50%)")', () => {
    const { rgb, alpha } = new Values('hsl(0deg 100% 50%)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 1);
  });

  it('new Values("hsla(0deg 100% 50%)")', () => {
    const { rgb, alpha } = new Values('hsla(0deg 100% 50%)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 1);
  });

  it('new Values("hsl(0deg -100% 50%)")', () => {
    const { rgb, alpha } = new Values('hsl(0deg -100% 50%)');
    // equal(hex, '808080');
    // deepEqual(rgb, { r: 128, g: 128, b: 128 });
    deepEqual(rgb, [128, 128, 128]);
    // deepEqual(hsl, { h: 0, s: 0, l: 50 });
    equal(alpha, 1);
  });

  it('new Values("hsl(0deg 100% -50%)")', () => {
    const { rgb, alpha } = new Values('hsl(0deg 100% -50%)');
    // equal(hex, '000000');
    // deepEqual(rgb, { r: 0, g: 0, b: 0 });
    deepEqual(rgb, [0, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 0 });
    equal(alpha, 1);
  });

  it('new Values("hsl(0deg 100% 200%)")', () => {
    const { rgb, alpha } = new Values('hsl(0deg 100% 200%)');
    // equal(hex, 'ffffff');
    // deepEqual(rgb, { r: 255, g: 255, b: 255 });
    deepEqual(rgb, [255, 255, 255]);
    // deepEqual(hsl, { h: 0, s: 100, l: 100 });
    equal(alpha, 1);
  });

  it('new Values("hsl(0deg 100% 50% / 100%)")', () => {
    const { rgb, alpha } = new Values('hsl(0deg 100% 50% / 100%)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 1);
  });

  it('new Values("hsl(0deg 100% 50% / 1)")', () => {
    const { rgb, alpha } = new Values('hsl(0deg 100% 50% / 1)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 1);
  });

  it('new Values("hsl(0deg 100% 50% / 50%)")', () => {
    const { rgb, alpha } = new Values('hsl(0deg 100% 50% / 50%)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 0.5);
  });

  it('new Values("hsl(0deg 100% 50% / 0.5)")', () => {
    const { rgb, alpha } = new Values('hsl(0deg 100% 50% / 0.5)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 0.5);
  });

  it('new Values("hsla(0deg 100% 50% / 50)")', () => {
    const { rgb, alpha } = new Values('hsla(0deg 100% 50% / 50)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 1);
  });

  it('new Values("hsla(0deg 100% 50% / 200%)")', () => {
    const { rgb, alpha } = new Values('hsla(0deg 100% 50% / 200%)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 1);
  });

  it('new Values("hsla(0deg 100% 50% / -200)")', () => {
    const { rgb, alpha } = new Values('hsla(0deg 100% 50% / -200)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 0);
  });
});

// ----------------------------------------------------------------
// RGB
// ----------------------------------------------------------------
describe('input RGB', () => {
  it('new Values("rgb(255, 0, 0)")', () => {
    const color = new Values('rgb(255, 0, 0)');
    deepEqual(color.rgb, [255, 0, 0]);
    equal(color.alpha, 1);
    equal(color.hexString(), '#ff0000');
  });

  it('new Values("rgb(100%, 0%, 0%)")', () => {
    const { rgb, alpha } = new Values('rgb(100%, 0%, 0%)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 1);
  });

  it('new Values("rgb(200%, 0%, 0%)")', () => {
    const { rgb, alpha } = new Values('rgb(200%, 0%, 0%)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 1);
  });

  it('new Values("rgb(100%, -10%, 0%)")', () => {
    const { rgb, alpha } = new Values('rgb(100%, -10%, 0%)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 1);
  });

  it('new Values("rgb(100%, 0%, -10%)")', () => {
    const { rgb, alpha } = new Values('rgb(100%, 0%, -10%)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 1);
  });

  it('new Values("rgb(100%, 101%, 0%)")', () => {
    const { rgb, alpha } = new Values('rgb(100%, 101%, 0%)');
    // equal(hex, 'ffff00');
    // deepEqual(rgb, { r: 255, g: 255, b: 0 });
    deepEqual(rgb, [255, 255, 0]);
    // deepEqual(hsl, { h: 60, s: 100, l: 50 });
    equal(alpha, 1);
  });

  it('new Values("rgb(100%, 0%, 200%)")', () => {
    const { rgb, alpha } = new Values('rgb(100%, 0%, 200%)');
    // equal(hex, 'ff00ff');
    // deepEqual(rgb, { r: 255, g: 0, b: 255 });
    deepEqual(rgb, [255, 0, 255]);
    // deepEqual(hsl, { h: 300, s: 100, l: 50 });
    equal(alpha, 1);
  });

  it('new Values("rgb(500, 0, 0)")', () => {
    const { rgb, alpha } = new Values('rgb(500, 0, 0)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 1);
  });

  it('new Values("rgb(255, 500, 0)")', () => {
    const { rgb, alpha } = new Values('rgb(255, 500, 0)');
    // equal(hex, 'ffff00');
    // deepEqual(rgb, { r: 255, g: 255, b: 0 });
    deepEqual(rgb, [255, 255, 0]);
    // deepEqual(hsl, { h: 60, s: 100, l: 50 });
    equal(alpha, 1);
  });

  it('new Values("rgb(255, 0, 500)")', () => {
    const { rgb, alpha } = new Values('rgb(255, 0, 500)');
    // equal(hex, 'ff00ff');
    // deepEqual(rgb, { r: 255, g: 0, b: 255 });
    deepEqual(rgb, [255, 0, 255]);
    // deepEqual(hsl, { h: 300, s: 100, l: 50 });
    equal(alpha, 1);
  });

  it('new Values("rgb(-255, 0, 500)")', () => {
    const { rgb, alpha } = new Values('rgb(-255, 0, 500)');
    // equal(hex, '0000ff');
    // deepEqual(rgb, { r: 0, g: 0, b: 255 });
    deepEqual(rgb, [0, 0, 255]);
    // deepEqual(hsl, { h: 240, s: 100, l: 50 });
    equal(alpha, 1);
  });

  it('new Values("rgb(0, -2, 500)")', () => {
    const { rgb, alpha } = new Values('rgb(0, -2, 500)');
    // equal(hex, '0000ff');
    // deepEqual(rgb, { r: 0, g: 0, b: 255 });
    deepEqual(rgb, [0, 0, 255]);
    // deepEqual(hsl, { h: 240, s: 100, l: 50 });
    equal(alpha, 1);
  });

  it('new Values("rgb(255, 0, -500)")', () => {
    const { rgb, alpha } = new Values('rgb(255, 0, -500)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 1);
  });

  it('new Values("rgba(255, 0, 0, 0.5)")', () => {
    const { rgb, alpha } = new Values('rgba(255, 0, 0, 0.5)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 0.5);
  });

  it('new Values("rgba(255, 0, 0, 50%)")', () => {
    const { rgb, alpha } = new Values('rgba(255, 0, 0, 50%)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 0.5);
  });

  it('new Values("rgba(100%, 0%, 0%, 50%)")', () => {
    const { rgb, alpha } = new Values('rgba(100%, 0%, 0%, 50%)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 0.5);
  });

  it('new Values("rgba(100%, 0%, 0%, 0.5)")', () => {
    const { rgb, alpha } = new Values('rgba(100%, 0%, 0%, 0.5)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 0.5);
  });

  it('new Values("rgb(255 0 0)")', () => {
    const { rgb, alpha } = new Values('rgb(255 0 0)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 1);
  });

  it('new Values("rgb(255 0 0 / 100%)")', () => {
    const { rgb, alpha } = new Values('rgb(255 0 0 / 100%)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 1);
  });

  it('new Values("rgb(255 0 0 / 50%)")', () => {
    const { rgb, alpha } = new Values('rgb(255 0 0 / 50%)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 0.5);
  });

  it('new Values("rgb(255 0 0 / 0%)")', () => {
    const { rgb, alpha } = new Values('rgb(255 0 0 / 0%)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 0);
  });

  it('new Values("rgb(255 0 0 / 0)")', () => {
    const { rgb, alpha } = new Values('rgb(255 0 0 / 0)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 0);
  });

  it('new Values("rgb(255 0 0 / 0.5)")', () => {
    const { rgb, alpha } = new Values('rgb(255 0 0 / 0.5)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 0.5);
  });

  it('new Values("rgb(255 0 0 / 1)")', () => {
    const { rgb, alpha } = new Values('rgb(255 0 0 / 1)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 1);
  });

  it('new Values("rgb(100% 0% 0% / 100%)")', () => {
    const { rgb, alpha } = new Values('rgb(100% 0% 0% / 100%)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 1);
  });

  it('new Values("rgb(100% 0% 0% / 50%)")', () => {
    const { rgb, alpha } = new Values('rgb(100% 0% 0% / 50%)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 0.5);
  });

  it('new Values("rgb(100% 0% 0% / 1)")', () => {
    const { rgb, alpha } = new Values('rgb(100% 0% 0% / 1)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 1);
  });

  it('new Values("rgb(100% 0% 0% / 0.5)")', () => {
    const { rgb, alpha } = new Values('rgb(100% 0% 0% / 0.5)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 0.5);
  });

  it('new Values("rgb(100% 0% 0% / 0)")', () => {
    const { rgb, alpha } = new Values('rgb(100% 0% 0% / 0)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 0);
  });

  it('new Values("rgb(200% 0% 0% / 0)")', () => {
    const { rgb, alpha } = new Values('rgb(200% 0% 0% / 0)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 0);
  });

  it('new Values("rgb(200% 200% 0% / 0.5)")', () => {
    const { rgb, alpha } = new Values('rgb(200% 200% 0% / 0.5)');
    // equal(hex, 'ffff00');
    // deepEqual(rgb, { r: 255, g: 255, b: 0 });
    deepEqual(rgb, [255, 255, 0]);
    // deepEqual(hsl, { h: 60, s: 100, l: 50 });
    equal(alpha, 0.5);
  });

  it('new Values("rgb(100% 0% 101% / 1)")', () => {
    const { rgb, alpha } = new Values('rgb(100% 0% 101% / 1)');
    // equal(hex, 'ff00ff');
    // deepEqual(rgb, { r: 255, g: 0, b: 255 });
    deepEqual(rgb, [255, 0, 255]);
    // deepEqual(hsl, { h: 300, s: 100, l: 50 });
    equal(alpha, 1);
  });

  it('new Values("rgba(255 0 0 / 50%)")', () => {
    const { rgb, alpha } = new Values('rgba(255 0 0  / 50%)');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 0.5);
  });

  it('new Values("rgba(255 500 0 / 25%)")', () => {
    const { rgb, alpha } = new Values('rgba(255 500 0  / 25%)');
    // equal(hex, 'ffff00');
    // deepEqual(rgb, { r: 255, g: 255, b: 0 });
    deepEqual(rgb, [255, 255, 0]);
    // deepEqual(hsl, { h: 60, s: 100, l: 50 });
    equal(alpha, 0.25);
  });
});

describe('keywords', () => {
  it('red', () => {
    const { rgb, alpha } = new Values('red');
    // equal(hex, 'ff0000');
    // deepEqual(rgb, { r: 255, g: 0, b: 0 });
    deepEqual(rgb, [255, 0, 0]);
    // deepEqual(hsl, { h: 0, s: 100, l: 50 });
    equal(alpha, 1);
  });

  it('tomato', () => {
    const { rgb, alpha } = new Values('tomato');
    // equal(hex, 'ff6347');
    // deepEqual(rgb, { r: 255, g: 99, b: 71 });
    deepEqual(rgb, [255, 99, 71]);
    // deepEqual(hsl, { h: 9, s: 100, l: 64 });
    equal(alpha, 1);
  });
});

// ----------------------------------------------------------------
// method::setColor
// ----------------------------------------------------------------
describe('method:setColor', () => {
  describe('instance.setColor("#f00")', () => {
    it('should update instance as #f00', () => {
      const color = new Values('#000');
      color.setColor('#f00');
      equal(color.hexString(), '#ff0000');
      deepEqual(color.rgb, [255, 0, 0]);
    });
  });

  describe('instance.setColor("red")', () => {
    it('should update instance as red', () => {
      const color = new Values('#000').setColor('red');
      deepEqual(color.rgb, [255, 0, 0]);
      equal(color.alpha, 1);
      equal(color.hexString(), '#ff0000');
    });
  });

  // describe('instance.setColor("red")', () => {
  //   const input = 'red';
  //   it(`should throw error: “${ERROR_STRING_MSG} ${input}” AND color should not be changed`, () => {
  //     const color = new Values('#000');
  //     throws(() => color.setColor(input), new RegExp(`^${ERROR_STRING_MSG} ${input}$`));
  //     equal(color.hex, '000');
  //     deepEqual(color.rgb, { r: 0, g: 0, b: 0 });
  //     deepEqual(color.hsl, { h: 0, s: 0, l: 0 });
  //   });
  // });
});

// ----------------------------------------------------------------
// method::tint
// ----------------------------------------------------------------
describe('method:tint', () => {
  const color = new Values('#00ffff');

  it('should default to 50% tint', () => {
    equal(color.tint().hexString(), '#80ffff');
  });

  it('should return original value', () => {
    equal(color.tint(0).hexString(), '#00ffff');
  });

  it('should mix with opacity', () => {
    // equal(new Values('rgba(0, 0, 255, 0.5)').tint().rgbaString, 'rgba(191, 191, 255, 0.75)');
    equal(new Values('rgba(0 0 255 / 0.5)').tint().hexString(), '#bfbfffbf');
    equal(new Values('rgba(255, 0, 0, 0.22)').tint().rgbaString(), 'rgba(255, 227, 227, 0.61)');
    equal(new Values('rgba(255, 0, 0, 0.22)').tint(10).rgbaString(), 'rgba(255, 121, 121, 0.298)');
    equal(new Values('rgba(255, 0, 0, 0.22)').tint(25).rgbaString(), 'rgba(255, 186, 186, 0.415)');
    equal(new Values('rgba(255, 0, 0, 0.22)').tint(100).hexString(), '#ffffff');
    equal(new Values('rgba(255 0 255 / 0.16)').tint().rgbaString(), 'rgba(255, 235, 255, 0.58)');
    // equal(new Values('rgb(255, 255, 255)', '#ff8080'));
    // equal(new Values('rgba(0, 0, 255, 0.5)').tint().hexString, '#bfbfffbf');
  });

  it('should calculate independent tints', () => {
    equal(color.tint(10).hexString(), '#19ffff');
    equal(color.tint(20).hexString(), '#33ffff');
    equal(color.tint(30).hexString(), '#4dffff');
    equal(color.tint(40).hexString(), '#66ffff');
    equal(color.tint(50).hexString(), '#80ffff');
    // equal(color.tint(10).rgbString, 'rgb(25, 255, 255)');
    // equal(color.tint(10).hslString, 'hsl(180, 100%, 55%)');
  });

  it('should include tint weight', () => {
    equal(color.tint(10).weight, 10);
    equal(color.tint(24).weight, 24);
    equal(color.tint(47).weight, 47);
    equal(color.tint(52).weight, 52);
    equal(color.tint(89).weight, 89);
    equal(color.tint(100).weight, 100);
  });
});

// ----------------------------------------------------------------
// method::shade
// ----------------------------------------------------------------
describe('method:shade', () => {
  const color = new Values('#00ffff');

  it('should default to 50% shade', () => {
    equal(color.shade().hexString(), '#008080');
  });

  it('should return original value', () => {
    equal(color.shade(0).hexString(), '#00ffff');
  });

  it('should mix with opacity', () => {
    equal(new Values('rgba(0 0 255 / 0.5)').shade().hexString(), '#000040bf');
    equal(new Values('rgba(255, 0, 0, 0.22)').shade().rgbaString(), 'rgba(28, 0, 0, 0.61)');
    equal(new Values('rgba(255, 0, 0, 0.22)').shade(10).rgbaString(), 'rgba(134, 0, 0, 0.298)');
    equal(new Values('rgba(255, 0, 0, 0.22)').shade(22).rgbaString(), 'rgba(78, 0, 0, 0.3916)');
    equal(new Values('rgba(255, 0, 0, 0.22)').shade(100).rgbaString(), 'rgba(0, 0, 0, 1)');
    equal(new Values('rgba(255 0 255 / 0.16)').shade().rgbaString(), 'rgba(20, 0, 20, 0.58)');
  });

  it('should calculate independent shades', () => {
    equal(color.shade(10).hexString(), '#00e6e6');
    equal(color.shade(20).hexString(), '#00cccc');
    equal(color.shade(30).hexString(), '#00b3b3');
    equal(color.shade(40).hexString(), '#009999');
    equal(color.shade(50).hexString(), '#008080');
    // equal(color.shade(10).rgbString, 'rgb(0, 230, 230)');
    // equal(color.shade(10).hslString, 'hsl(180, 100%, 45%)');
  });

  it('should include shade weight', () => {
    equal(color.shade(10).weight, 10);
    equal(color.shade(24).weight, 24);
    equal(color.shade(47).weight, 47);
    equal(color.shade(52).weight, 52);
    equal(color.shade(89).weight, 89);
    equal(color.shade(100).weight, 100);
  });
});

// ----------------------------------------------------------------
// method::tints
// ----------------------------------------------------------------
describe('values.method.tints', () => {
  const color = new Values('#00ffff');

  it('should calculate tints', () => {
    const tints = color.tints();
    equal(tints.length, 10);
    equal(tints[0].hexString(), '#19ffff');
    equal(tints[2].hexString(), '#4dffff');
    equal(tints[4].hexString(), '#80ffff');
    equal(tints[6].hexString(), '#b3ffff');
    equal(tints[8].hexString(), '#e6ffff');
    equal(tints[9].hexString(), '#ffffff');
  });

  it('should include tints weight', () => {
    const tints = color.tints();
    equal(tints[0].weight, 10);
    equal(tints[2].weight, 30);
    equal(tints[4].weight, 50);
    equal(tints[6].weight, 70);
    equal(tints[8].weight, 90);
    equal(tints[9].weight, 100);
  });
});

// ----------------------------------------------------------------
// method::shades
// ----------------------------------------------------------------
describe('method:shades', () => {
  const color = new Values('#00ffff');

  it('should calculate shades', () => {
    const shades = color.shades();
    equal(shades.length, 10);
    equal(shades[0].hexString(), '#00e6e6');
    equal(shades[2].hexString(), '#00b3b3');
    equal(shades[4].hexString(), '#008080');
    equal(shades[6].hexString(), '#004d4d');
    equal(shades[8].hexString(), '#001919');
    equal(shades[9].hexString(), '#000000');
  });

  it('should include shades weight', () => {
    const shades = color.shades();
    assert.equal(shades[0].weight, 10);
    assert.equal(shades[2].weight, 30);
    assert.equal(shades[4].weight, 50);
    assert.equal(shades[6].weight, 70);
    assert.equal(shades[8].weight, 90);
    assert.equal(shades[9].weight, 100);
  });
});

// ----------------------------------------------------------------
// method::all
// ----------------------------------------------------------------
describe('values.method.all', () => {
  const color = new Values('#00ffff');

  it('should calculate all', () => {
    const all = color.all();
    equal(all.length, 21);
    equal(all[0].hexString(), '#ffffff');
    equal(all[10].hexString(), color.hexString());
    equal(all[20].hexString(), '#000000');
  });

  it('tits should be of type "tint"', () => {
    const all = color.all();
    const start = 0;
    const end = round(all.length / 2 - 1);
    equal(all.length, 21);
    for (let i = start; i < end; i++) {
      equal(all[i].type, 'tint');
    }
  });

  it('shades should be of type "shade"', () => {
    const all = color.all();
    const start = round(all.length / 2);
    const end = all.length;
    equal(all.length, 21);
    for (let i = start; i < end; i++) {
      equal(all[i].type, 'shade');
    }
  });

  it('base color should be of type "base"', () => {
    const all = color.all();
    // get the base color, located in the middle of the array
    const index = round(all.length / 2 - 1);
    equal(all[index].type, 'base');
  });
});

// ----------------------------------------------------------------
// method::getBrightness
// ----------------------------------------------------------------
describe('values brightness getter', () => {
  const color = new Values('#00ffff');

  it('should return the brightness', () => {
    equal(color.getBrightness(), 67);
  });
});

// ----------------------------------------------------------------
// method::hexString
// ----------------------------------------------------------------
describe('values hexString()', () => {
  // const color = new Values('#00ffff')

  it('should return the color in hex string form', () => {
    equal(new Values('#0099cc').hexString(), '#0099cc');
  });
});

// ----------------------------------------------------------------
// method::rgbaString
// ----------------------------------------------------------------
describe('values rgbaString', () => {
  // const color = new Values('#00ffff')

  it('should return the color in rgb string form', () => {
    equal(new Values('#0099cc80').rgbaString(), 'rgba(0, 153, 204, 0.5019607843137255)');
  });

  it('should return the color in rgb string form', () => {
    equal(new Values('hsla(240, 100% , 50%, 50%)').rgbaString(), 'rgba(0, 0, 255, 0.5)');
  });

  it('should return the color in rgb string form', () => {
    equal(new Values('hsla(240, 100% , 50%, 0.5)').rgbaString(), 'rgba(0, 0, 255, 0.5)');
  });

  it('should return the color in rgb string form', () => {
    equal(new Values('hsl(240deg 100% 50% / 50%)').rgbaString(), 'rgba(0, 0, 255, 0.5)');
  });

  it('should return the color in rgb string form', () => {
    equal(new Values('hsl(240deg 100% 50% / 0.5)').rgbaString(), 'rgba(0, 0, 255, 0.5)');
  });
});

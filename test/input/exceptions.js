const assert = require('assert').strict;

const Values = require('../..');

const { throws } = assert;

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

describe('input / exceptions', () => {
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

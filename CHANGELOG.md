# Changelog

## [Unreleased]

## [2.0.0] - [#7](https://github.com/noeldelgado/values.js/pull/7) - 2020-05-23
### Added
- alpha support
  - #RRGGBBAA
  - RGB CSS Color Module Level 4
  - HSL CSS Color Module Level 4 (number, deg, rad & turn)
  - `alpha` property to hold a value within `0` and `1`
- [pre-defined color keywords](https://www.w3.org/wiki/CSS/Properties/color/keywords) support
- transparent - Shorthand for transparent black, rgba(0,0,0,0)
- default value `#000` for when `undefined`, `null`  or `<empty>` is passed to the constructor
- editorconfig
- .eslintrc
- `lighthouse-ci` action for `gh-pages`

### Changed
- refactor code
  - move validations to [parse-css-color](https://github.com/noeldelgado/parse-css-color)
  - move mix color functionality to [mix-css-color](https://github.com/noeldelgado/mix-css-color)
  - add [pure-color](https://github.com/WickyNilliams/pure-color) for color format conversion
- `throw` error if input is not a CSS string recognized by `parse-css-color`
- `rgb` property now returns an array in the form of `[r, g, b]` instead of `{ r: number, g: number, b: number }`
- `hex` is now a getter (access backward-compatible)
  - if alpha is less than `1` it returns 8 digits now `#RRGGBBAA` otherwise 6 `#RRGGBB`
- `hexString` method return value could include alpha
  - if alpha is less than `1` it returns 8 digits now `#RRGGBBAA` otherwise 6 `#RRGGBB`
- `isTint`, `isShade` and `isBaseColor` properties replaced by new `type` field
  - `type="tint"`
  - `type="shade"`
  - `type="base"`
- `percentage` property is now `weight` and, it is included on every instance instead of just for tints and shades
- `setColor` return null if color is not accepted

### Removed
- bower distribution
- properties
  - `hsl`
  - `isTint`, `isShade`, `isBaseColor`
- methods
  - `hslString`
- static utils functions
  - `isHex`, `isRGB` and `isHSL` logic moved to [parse-css-color](https://github.com/noeldelgado/parse-css-color)
  - `mix` (moved to [mix-css-color](https://github.com/noeldelgado/mix-css-color))

## [1.1.1] - [#6](https://github.com/noeldelgado/values.js/pull/6) - 2020-04-16
### Fixed
- shade is not defined

## [1.1.0] - [#5](https://github.com/noeldelgado/values.js/pull/5) - 2020-03-10
### Added
- ✨ new properties to the Array result of `vallues.all()` [`5f204a2`](https://github.com/noeldelgado/values.js/commit/5f204a2b4757bf0e2e77910ae50f44bbb19af56f)
  - `isTint: true` for tints
  - `isShade: true` for shades
  - `isBaseColor: true` for the original input color
- Added Changelog (this)

### Changed
- updated README [`f226453`](https://github.com/noeldelgado/values.js/commit/5f204a2b4757bf0e2e77910ae50f44bbb19af56f)
  - added params signature for methods
  - added `hexString`, `rgbString` and `hslString` missing methods
- updated tests for new properties

## [1.0.3] - 2015-10-20
### Added
- npm and bower version badges [`a7f04f5`](https://github.com/noeldelgado/values.js/commit/a7f04f5f1b55580a8d5c3583648bfdb398c0b5bd)

### Fixed
- #3, {tint,shade} === 0 returning default of 50% [`8d83fa0`](https://github.com/noeldelgado/values.js/commit/8d83fa003a6011352034e6d858afcc55e6009e2d)
- jshint errors [`3f54dc6`](https://github.com/noeldelgado/values.js/commit/3f54dc697814582514063e1feda9053d97b76eae)

## [1.0.2] - 2015-03-12
### Fixed
- CommonJS on linux: Require() is case sensitive on linux, so the example only worked on OSX. [#1](https://github.com/noeldelgado/values.js/pull/1)

## [1.0.1] - 2015-03-08
### Changed
- white list distributed files on NPM [`fc2ece8`](https://github.com/noeldelgado/values.js/commit/fc2ece8da029a3d8b27e910371342400542a1bc8)

### Fixed
- revert / return duplicated tints and shades, using an object to filter was messing the results ordering [`79294f8`](https://github.com/noeldelgado/values.js/commit/79294f81dba7fbe1358a7ba41bfa2b91a78c6eb1)

## [1.0.0] - 2015-03-08
### Changed
- refactor [`55bc6e6`](https://github.com/noeldelgado/values.js/commit/55bc6e69d5dccfcd73178f990a2b87636f8d34fc)
  - fixed tints and shades output actually mixing with white and black
- renamed methods
  - getTints => tints
  - getShades => shades
  - getAll => all

### Added
- methods
  - tint
  - shade
  - getBrightness
  - hexString
  - rgbString
  - hslString

### Removed
- methods
  - setStep
  - lighteness
- minified dist version

## [0.1.5] - 2014-09-16
### Fixed
- ignore case to isRGB and isHSL Util methods [`17cf7d5`](https://github.com/noeldelgado/values.js/commit/17cf7d55b105db314a623eb18c7d3349ab939f68)

## [0.1.4] - 2014-09-16
- 0.1.4 [`287ba66`](https://github.com/noeldelgado/values.js/commit/287ba6654c327d84debac31f30b77e73cb4aaaed)
  - add / hsl validaton support
  - update / rgb validation
  - add / tests

## [0.1.3] - 2014-09-06
## [0.1.2] - 2014-07-12
### Added
- bower support

### Fixed
- NPM main file

## [0.1.1] - 2014-07-02
- initial release

[Unreleased]: https://github.com/noeldelgado/values.js/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/noeldelgado/values.js/compare/v1.1.1...v2.0.0
[1.1.1]: https://github.com/noeldelgado/values.js/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/noeldelgado/values.js/compare/v1.0.3...v1.1.0
[1.0.3]: https://github.com/noeldelgado/values.js/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/noeldelgado/values.js/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/noeldelgado/values.js/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/noeldelgado/values.js/compare/v0.1.5...v1.0.0
[0.1.5]: https://github.com/noeldelgado/values.js/compare/v0.1.4...v0.1.5
[0.1.4]: https://github.com/noeldelgado/values.js/compare/v0.1.3...v0.1.4
[0.1.3]: https://github.com/noeldelgado/values.js/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/noeldelgado/values.js/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/noeldelgado/values.js/releases/tag/v0.1.1

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import buble from '@rollup/plugin-buble';
import replace from '@rollup/plugin-replace';
import cleanup from 'rollup-plugin-cleanup';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

export default [
  {
    input: 'src/index.js',
    output: {
      file: pkg.browser,
      format: 'umd',
      name: 'Values'
    },
    plugins: [
      resolve({ dedupe: ['parse-css-color'] }),
      commonjs(),
      buble(),
      cleanup(),
      replace({ __VERSION__: `v${pkg.version}` }),
      terser()
    ]
  },
  {
    input: 'src/index.js',
    external: [
      'mix-css-color',
      'parse-css-color',
      'pure-color/convert/hsl2rgb',
      'pure-color/convert/rgb2hex'
    ],
    plugins: [resolve(), commonjs(), cleanup(), replace({ __VERSION__: `v${pkg.version}` })],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ]
  }
];

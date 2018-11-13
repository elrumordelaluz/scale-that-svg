import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import pkg from './package.json'

export default [
  {
    input: 'index-umd.js',
    output: {
      file: pkg.browser,
      format: 'umd',
      name: 'scaleThatSvg',
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: ['node_modules/**'],
      }),
    ],
  },
  {
    input: 'index-es.js',
    external: ['svg-path-tools', 'svgson', 'element-to-path'],
    plugins: [
      babel({
        exclude: ['node_modules/**'],
      }),
    ],
    output: [
      { file: pkg.main, format: 'cjs', exports: 'named' },
      { file: pkg.module, format: 'es', exports: 'named' },
    ],
  },
]

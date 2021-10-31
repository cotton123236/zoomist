import resolve from 'rollup-plugin-node-resolve'
import createBanner from 'create-banner'
import babel from 'rollup-plugin-babel'
import scss from 'rollup-plugin-scss'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import { terser } from 'rollup-plugin-terser'
import { name } from './package.json'

const globalName = 'Zoomist'
const outputDocsFolder = 'docs/';
const outputDistFolder = 'dist/';
const inputFolder = 'src/';
const banner = createBanner({
  data: {
    name: `${name}.js`,
    year: '2021-present',
  },
})
const input = `${inputFolder}index.js`

export default [
  {
    input,
    output: {
      file: `${outputDocsFolder}js/${name}.js`,
      format: 'umd',
      banner,
      name: globalName
    },
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**'
      }),
      scss({
        output: `${outputDocsFolder}css/${name}.css`,
        sass: require('node-sass'),
        processor: () => postcss([autoprefixer()])
      })
    ]
  },
  {
    input,
    output: {
      file: `${outputDistFolder}${name}.min.js`,
      format: 'umd',
      banner,
      name: globalName
    },
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**'
      }),
      terser(),
      scss({
        output: `${outputDistFolder}${name}.min.css`,
        outputStyle: "compressed",
        sass: require('node-sass'),
        processor: () => postcss([autoprefixer()])
      })
    ]
  },
  {
    input,
    output: {
      file: `${outputDistFolder}${name}.js`,
      format: 'umd',
      banner,
      name: globalName
    },
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**'
      }),
      scss({
        output: `${outputDistFolder}${name}.css`,
        sass: require('node-sass'),
        processor: () => postcss([autoprefixer()])
      })
    ]
  }
]
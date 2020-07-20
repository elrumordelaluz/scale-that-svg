import fs from 'fs'
import { promisify } from 'util'
import test from 'ava'
import svgson from 'svgson'
const readFileAsync = promisify(fs.readFile)
import scaleThatSvg from './dist/scale-that-svg.cjs'

test('Scale that SVG!', async (t) => {
  const scale = 0.5
  const input = await readFileAsync('./test.svg')
  const expected = await readFileAsync('./scaled.svg')
  const scaled = await scaleThatSvg(input, { scale })
  const _input = await svgson(input.toString())
  const _scaled = await svgson(scaled)
  t.is(
    Number(_scaled.attributes.viewBox.split(' ')[2]),
    _input.attributes.viewBox.split(' ')[2] * scale
  )
  t.is(
    Number(_scaled.attributes.viewBox.split(' ')[3]),
    _input.attributes.viewBox.split(' ')[3] * scale
  )
  t.is(scaled, expected.toString())
})

test('works when no viewBox present', async (t) => {
  const scale = 0.5
  const input = await readFileAsync('./test-novb.svg')
  const expected = await readFileAsync('./scaled.svg')
  const scaled = await scaleThatSvg(input, { scale })
  const _scaled = await svgson(scaled)
  const _expected = await svgson(expected.toString())
  delete _expected.attributes.viewBox
  t.deepEqual(_scaled, _expected)
})

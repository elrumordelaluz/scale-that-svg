import fs from 'fs'
import { promisify } from 'util'
import test from 'ava'
import svgson from 'svgson-next'
const readFileAsync = promisify(fs.readFile)
import scaleThatSvg from './dist/scale-that-svg.cjs'

test('Scale that SVG!', async t => {
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
  t.not(scaled, expected.toString())
})

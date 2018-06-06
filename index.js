import svgson, { stringify } from 'svgson-next'
import copy from 'fast-copy'
import { parse, stringify as pathStringify, scale } from 'svg-path-tools'
import toPath from 'element-to-path'

const scalePath = (node, scaleOptions) => {
  let o = copy(node)
  const { scale: s } = scaleOptions || { scale: 1 }

  if (o.name === 'svg') {
    o.attributes = Object.assign({}, o.attributes, {
      viewBox: o.attributes.viewBox
        .split(' ')
        .map((v, i) => (i > 1 ? v * s : v))
        .join(' '),
    })
  }

  if (/(rect|circle|ellipse|polygon|polyline|line|path)/.test(o.name)) {
    const path = toPath(o)
    const parseD = parse(path)
    const scaleD = scale(parseD, scaleOptions)
    const d = pathStringify(scaleD)
    o.attributes = Object.assign({}, o.attributes, {
      d,
    })
    for (const attr in o.attributes) {
      if (attr === 'stroke-width' || attr === 'strokeWidth') {
        o.attributes[attr] = +o.attributes[attr] * s
      }
      if (!/fill|stroke|opacity|d/.test(attr)) {
        delete o.attributes[attr]
      }
    }
    o.name = 'path'
  } else if (o.children && Array.isArray(o.children)) {
    const _scale = c => scalePath(c, scaleOptions)
    o.children = o.children.map(_scale)
  }

  return o
}

export default async (svg, scaleOptions) => {
  const input = Buffer.isBuffer(svg) ? svg.toString() : svg
  const parsed = await svgson(input)
  const scaled = scalePath(parsed, scaleOptions)
  return stringify(scaled)
}

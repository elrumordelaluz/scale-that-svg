import svgson, { stringify } from 'svgson'
import { parse, stringify as pathStringify, scale } from 'svg-path-tools'
import toPath from 'element-to-path'

const scalePath = (node, scaleOptions) => {
  let o = Object.assign({}, node)
  const { scale: s } = scaleOptions || { scale: 1 }

  const sY = scaleOptions.scaleY || s;

  if (o.name === 'svg' && o.attributes.viewBox) {
    o.attributes = Object.assign({}, o.attributes, {
      viewBox: o.attributes.viewBox
          .split(' ')
          .map((v, i) => (i === 2 ? v * s : i === 3 ? v * sY : v))
          .join(' '),
      ...(o.attributes.width ? { width: o.attributes.width * s } : {}),
      ...(o.attributes.height ? { height: o.attributes.height * sY } : {}),
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
    const _scale = (c) => scalePath(c, scaleOptions)
    o.children = o.children.map(_scale)
  }

  return o
}

export default async (svg, scaleOptions) => {
  const parsed = await svgson(svg)
  const scaled = scalePath(parsed, scaleOptions)
  return stringify(scaled)
}

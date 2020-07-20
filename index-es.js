import scaleThatSvg from './index'

async function scale(input, scaleOptions) {
  const svg = Buffer.isBuffer(input) ? input.toString() : input
  return await scaleThatSvg(svg, scaleOptions)
}

export default scale
export { scale }

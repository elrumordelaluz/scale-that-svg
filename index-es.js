import scaleThatSvg from './index'

export default async (input, scaleOptions) => {
  const svg = Buffer.isBuffer(input) ? input.toString() : input
  return await scaleThatSvg(svg, scaleOptions)
}

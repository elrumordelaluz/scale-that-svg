<p align="center">
  <img alt="Scale that SVG!" title="Scale that SVG!" src="https://cdn.rawgit.com/elrumordelaluz/scale-that-svg/880c705b/logo.svg" width="450">
</p>

<p align="center">
  Scale that <code>svg</code>, period.
</p>

## Install

```zsh
yarn add scale-that-svg
```

## Usage

```js
const scale = require('scale-that-svg')

fs.readFile('./test.svg', (err, input) => {
  scale(input, { scale: 0.5 }).then(scaled => {
    console.log({ scaled })
  })
})

scale(`<svg viewBox="0 0 500 200">
  <rect 
    x="200" 
    y="50" 
    fill="#F16362" 
    stroke="#30456B" 
    stroke-width="5" 
    stroke-linecap="round" 
    stroke-linejoin="round" 
    width="100" height="100"/>
</svg>`).then(scaledFromString => console.log({ scaledFromString }))
```

## API

### scale(input,[options])

#### input

Type: `string|buffer`
SVG to scale

#### options

Type: `Object`
Based on [svg-path-tool scale](https://github.com/elrumordelaluz/path-utils/blob/master/src/scale.js)

##### scale

Type: `number`<br>
Default: 1 (no scale)

##### scaleY

Type: `number`<br>
If no specified, same as `scale`

##### round

Type: `number`<br>
Default: 3

## Related

[element-to-path](https://github.com/elrumordelaluz/element-to-path) Convert SVG element into `path`

[path-that-svg](https://github.com/elrumordelaluz/path-that-svg) Convert entire SVG with `path`

[svg-path-tools](https://github.com/elrumordelaluz/svg-path-tools) Tools to manipulate SVG `path` (d)

[svgson](https://github.com/elrumordelaluz/svgson) Transform SVG into `Object`

## License

MIT © [Lionel Tzatzkin](https://lionel.tzatzk.in)

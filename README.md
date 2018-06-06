<p align="center">
  <img alt="Scale that SVG!" title="Scale that SVG!" src="logo.svg" width="450">
</p>

<p align="center">
  Scale that <code>svg</code>, period.
</p>

## Install

```zsh
yarn add scale-that-svg
```

## Usage

`String|Buffer` svg

```js
const scale = require('sclae-that-svg')

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

## Related

[element-to-path](https://github.com/elrumordelaluz/element-to-path) Convert SVG element into `path`

[path-that-svg](https://github.com/elrumordelaluz/path-that-svg) Convert entire SVG with `path`

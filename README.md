<p align="center">
<a href="https://cotton123236.github.io/zoomist/index.html">
  <img src="https://i.imgur.com/VfD4y0r.png" />
</a>
</p>
<p align="center">Zoomist is a JavaScript library that allows you to make a mouse interaction animation easily.</p>
<br>
<p align="center"><strong>❗❗❗ Next version of Zoomist is out! Let's checkout <a href="https://github.com/cotton123236/zoomist">zoomist@next</a> ❗❗❗</strong></p>
<hr/>
<p align="center">
<a href="https://cotton123236.github.io/zoomist/index.html#demo">
  <img src="https://i.imgur.com/WkskZIG.png" width="140" />
</a>
<a href="https://cotton123236.github.io/zoomist/index.html#documentation">
  <img src="https://i.imgur.com/07nAha8.png" width="140" />
</a>
</p>

<br>

## Getting Started

### Download

```
npm install zoomist
```
#### Manual download
[Download ZIP](https://github.com/cotton123236/zoomist/archive/refs/heads/main.zip)

<br>

### Installation

#### ES modules
If you download the files via npm, you just need to import import Zoomist in your own project :
```js
import Zoomist from 'zoomist'
```
#### Script tag include
If you include zoomist with tag, you need to add CSS as well.
```html
<link rel="stylesheet" href="zoomist.min.css"/>
<script src="zoomist.min.js"></script>
```
or using CDN :
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/zoomist@1/dist/zoomist.min.css"/>
<script src="https://cdn.jsdelivr.net/npm/zoomist@1/dist/zoomist.min.js"></script>
```

<br>

### Basic Usage

#### HTML
Create an container and set [data-zoomist-src] attribute with image URL for Zoomist.
```html
<div id="my-zoomist" data-zoomist-src="./image.png"></div>
```
#### JavaScript
Initialize Zoomist in JavaScript.
```js
// syntax
new Zoomist(element[, options])

// for example
new Zoomist('#my-zoomist')

// advanced usage
const zoomistElement = document.querySelector('#my-zoomist')
new Zoomist(zoomistElement, {
  // optional parameters
  maxRatio: 4,
  height: '60%',
  // if you need silder
  slider: true,
  // if you need zoomer
  zoomer: true,
  // event
  on: {
    ready() {
      console.log('Zoomist ready!')
    }
  }
})
```
>See some [demo](https://cotton123236.github.io/zoomist/index.html#demo).

<br>

## Documentation

### Parameters
>Knowing more [details](https://cotton123236.github.io/zoomist/index.html#parameters) about zoomist parameters.

All available parameters :
```js
new Zoomist('#my-zoomist', {
    src: 'data-zoomist-src',
    fill: 'cover',
    draggable: true,
    wheelable: true,
    pinchable: true,
    bounds: true,
    zoomRatio: 0.1,
    maxRatio: false,
    height: 'auto',
    slider: {
      el: null,
      direction: 'horizontal',
      maxRatio: 2
    },
    zoomer: {
      inEl: null,
      outEl: null,
      disableOnBounds: true
    }
})
```

<br>

### Methods
>Knowing more [details](https://cotton123236.github.io/zoomist/index.html#methods) about zoomist methods.

All available methods :
```js
const myZoomist = new Zoomist('#my-zoomist')

// call the method after initialization.
myZoomist.getContainerData()
myZoomist.getImageData()
myZoomist.getSliderValue()
myZoomist.getZoomRatio()
myZoomist.zoom(ratio)
myZoomist.zoomTo(ratio)
myZoomist.move(x, y)
myZoomist.moveTo(x, y)
myZoomist.slideTo(value, isOnlySlide)
zoomist.on(event, handler)
zoomist.reset()
zoomist.update()
zoomist.destroy()
```

<br>

### Events
>Knowing more [details](https://cotton123236.github.io/zoomist/index.html#events) about zoomist events.

All available events :
```js
// Using on parameter before initialization.
const myZoomist = new Zoomist('#my-zoomist', {
    on: {
        ready() {},
        zoom(ratio) {},
        wheel(event) {},
        dragStart(transform, event) {},
        drag(transform, event) {},
        dragEnd(transform, event) {},
        slideStart(value, event) {},
        slide(value, event) {},
        slideEnd(value, event) {},
        pinchStart(event) {},
        pinch(event) {},
        pinchEnd(event) {},
        resize() {},
        reset() {},
        destroy() {},
        update() {}
    }
})

// Using on method after initialization.
myZoomist.on('ready', function() {})
myZoomist.on('zoom', function(ratio) {})
myZoomist.on('wheel', function(event) {})
myZoomist.on('dragStart', function(transform, event) {})
myZoomist.on('drag', function(transform, event) {})
myZoomist.on('dragEnd', function(transform, event) {})
myZoomist.on('slideStart', function(value, event) {})
myZoomist.on('slide', function(value, event) {})
myZoomist.on('slideEnd', function(value, event) {})
myZoomist.on('pinchStart', function(event) {})
myZoomist.on('pinch', function(event) {})
myZoomist.on('pinchEnd', function(event) {})
myZoomist.on('resize', function() {})
myZoomist.on('reset', function() {})
myZoomist.on('destroy', function() {})
myZoomist.on('update', function() {})
```

<br>

## Others

* Visit the [website](https://cotton123236.github.io/zoomist/index.html)
* Released under the [MIT License](https://github.com/cotton123236/CottonJS/blob/main/LICENSE).
* ©2021 [cotton123236](https://github.com/cotton123236)

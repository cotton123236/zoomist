<div align="center">
  <img src="https://i.imgur.com/fHxO8Fl.png" width="100px" height="100px" alt="logo" />
  <h1>
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://i.imgur.com/jRsv3If.png"/>
      <img src="https://i.imgur.com/QEk2wic.png" width="160"/>
    </picture>
  </h1>
  <p>Zoomist is TypeScript library for zooming any element. Also supports mobile devices.</p>
</div>

<p align="center">
  <a href="https://zoomist.vercel.app/" target="_blank">Documentation</a> | 
  <a href="https://codesandbox.io/s/intelligent-zeh-lgtttg?file=/src/index.ts" target="_blank">Demo</a>
</p>

<div align="center">
  <a aria-label="NPM version" href="https://github.com/cotton123236/zoomist">
    <img alt="NPM version" src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fcotton123236%2Fzoomist%2Fmain%2Fpackage.json&query=%24.version&style=for-the-badge&label=NPM&color=black" />
  </a>
</div>

## 🚀 Installation
There are few ways to import Zoomist into your project:

### Install from NPM
You can easily install Zoomist from NPM.
```
npm i zoomist
```

```js
// import Zoomist styles
import 'zoomist/css'
// import Zoomist
import Zoomist from 'zoomist'

// initialize
const zoomist = new Zoomist(...)
```

### Using CDN
There are two ways to include Zoomist by using CDN.

UMD:
```html
<!-- styles -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/zoomist@2/zoomist.css" />

<!-- scripts -->
<script src="https://cdn.jsdelivr.net/npm/zoomist@2/zoomist.umd.js"></script>
<script>
  const zoomist = new Zoomist(...)
</script>
```
ES modules in browser:
```html
<!-- styles -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/zoomist@2/zoomist.css" />

<!-- scripts -->
<script type="module">
  import Zoomist from 'https://cdn.jsdelivr.net/npm/zoomist@2/zoomist.js'

  const zoomist = new Zoomist(...)
</script>
```

### Download assets
Or you can use Zoomist locally by [DOWNLOAD](https://github.com/cotton123236/zoomist/archive/refs/heads/next.zip) assets.

---

## 📝 Basic usage
After downloading Zoomist, there are a few steps to create a Zoomist:

### Add Zoomist HTML layout
You need to add Zoomist layout in your HTML:
```html
<!-- zoomist-container -->
<div class="zoomist-container">
  <!-- zoomist-wrapper is required -->
  <div class="zoomist-wrapper">
    <!-- zoomist-image is required -->
    <div class="zoomist-image">
      <!-- you can add anything you want to zoom here. -->
      <img src="..." />
    </div>
  </div>
</div>
```
### Custom Zoomist styles
You may want to add some custom styles:
```css
.zoomist-container {
  width: 100%;
  max-width: 600px;
}

.zoomist-image {
  width: 100%;
  aspect-ratio: 1;
}

.zoomist-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
```

### Initialize Zoomist
Finally, initialize Zoomist in your js file:
```js
const zoomist = new Zoomist('.zoomist-container', {
  // Optional parameters
  maxScale: 4,
  bounds: true,
  // if you need slider
  slider: true,
  // if you need zoomer
  zoomer: true
})
```
---

## 📖 Documentation

### Parameters
All available parameters and initial value:
```js
new Zoomist('.zoomist-container', {
  // set is draggable or not
  draggable: true,
  // set is wheelable or not
  wheelable: true,
  // set is pinchable or not
  pinchable: true,
  // set image stuck on bounds
  bounds: true,
  // the ratio of zooming at one time
  zoomRatio: 0.1,
  // the max scale of zoomist-image (must be number larger then initScale)
  maxScale: 10,
  // the min scale of zoomist-image (must be number smaller then initScale)
  minScale: 1,
  // set initial scale of zoomist-image
  initScale: null,
  // zoomist slider module
  slider: {
    // the css selector string or a element of the slider
    el: null,
    // the direction of the slider 'horizontal' or 'vertical'
    direction: 'horizontal'
  },
  //
  zoomer: {
    // the wrapper of all zoomer buttons
    el: null,
    // the css selector string or a element for in-zoomer
    inEl: null,
    // the css selector string or a element for out-zoomer
    outEl: null,
    // the css selector string or a element for reset-zoomer
    resetEl: null,
    // in zoomer and out zoomer will be disabled when image comes to maximin or minimum
    disabledClass: 'zoomist-zoomer-disabled'
  }
})
```

### Methods
All available methods:
```js
const zoomist = new Zoomist(...)

zoomist.zoom(ratio)
zoomist.zoomTo(ratio)
zoomist.move({ x, y })
zoomist.moveTo({ x, y })
zoomist.slideTo(value)
zoomist.reset()
zoomist.update(options)
zoomist.destroy(cleanStyle)
zoomist.destroySlider()
zoomist.destroyZoomer()
zoomist.destroyModules()

zoomist.on(event, handler)

zoomist.getImageData()
zoomist.getContainerData()
zoomist.getSliderValue()
```

### Events
```js
// Using on parameter before initialization.
const zoomist = new Zoomist('.zoomist-container', {
  on: {
    // invoked when zoomist instance ready
    ready(zoomist) {...},
    // invoked when reset methods be used
    reset(zoomist) {...},
    // invoked when image changes it's size
    resize(zoomist) {...},
    // invoked before destroy methods be used
    beforeDestroy(zoomist) {...},
    // invoked after destroy methods be used
    destroy(zoomist) {...},
    // invoked before update methods be used
    beforeUpdate(zoomist) {...},
    // invoked when update methods be used
    update(zoomist) {...},
    // invoked when image is zooming
    zoom(zoomist, scale) {...},
    // invoked when wheeling
    wheel(zoomist, scale, event) {...},
    // invoked when mousedown on wrapper
    dragStart(zoomist, transform, event) {...},
    // invoked when dragging the image
    drag(zoomist, transform, event) {...},
    // invoked when mouseup on wrapper
    dragEnd(zoomist, transform, event) {...},
    // invoked when mousedown on wrapper
    pinchStart(zoomist, scale, event) {...},
    // invoked when pinching the image
    pinch(zoomist, scale, event) {...},
    // invoked when mouseup on wrapper
    pinchEnd(zoomist, scale, event) {...},
    // invoked when mousedown on slider
    slideStart(zoomist, value, event) {...},
    // invoked when sliding the slider
    slide(zoomist, value, event) {...},
    // invoked when mouseup on slider
    slideEnd(zoomist, value, event) {...}
  }
})

// Using on method after initialization.
// For example:
zoomist.on('zoom', (zoomist, scale) => {...})
```

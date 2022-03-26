const zoomist = new Zoomist('[data-zoomist]', {
  fill: 'cover',
  // src: image,
  draggable: true,
  wheelable: true,
  pinchable: true,
  bounds: true,
  zoomRatio: 0.1,
  maxRatio: 3,
  // height: false,
  slider: {
    // el: '.custom-slider',
    direction: 'vertical',
    // maxRatio: 3
  },
  zoomer: {
    // inEl: '.custom-in-zoomer',
    // outEl: '.custom-out-zoomer',
    // disableOnBounds: true
  },
  on: {
    ready() {
      // console.log('ready')
      this.zoomTo(1.8)
      this.moveTo(0, 0)
    },
    zoom(ratio) {
      // console.log(this.getZoomRatio(), ratio)
    },
    wheel(event) {
      // console.log(this, event)
    },
    dragStart(transform, event) {
      // console.log('start', transform)
    },
    drag(transform, event) {
      // console.log('drag', transform)
    },
    dragEnd(transform, event) {
      // console.log('end', transform)
    },
    slideStart(value, event) {
      // console.log(value)
    },
    slide(value, event) {
      // console.log(value)
    },
    slideEnd(value, event) {
      // console.log(value)
    },
    pinchStart(event) {
      // console.log(value)
    },
    pinch(event) {
      // console.log(value)
    },
    pinchEnd(event) {
      // console.log(value)
    },
    resize() {
      // console.log('resize')
    },
    reset() {
      // console.log('reset')
    },
    destroy() {
      // console.log('destroy')
    },
    update() {
      // console.log('update')
    }
  }
})

console.log(zoomist)

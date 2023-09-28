import './../src/zoomist.scss'

import Zoomist from './../dist/zoomist.js'

const zoomist = new Zoomist('.cat-zoomist', {
  // initScale: 2.5,
  // minScale: 0.5,
  // maxScale: 100,
  // pinchable: false,
  bounds: true,
  slider: true,
  zoomer: true,
  // zoomer: {
  //   inEl: '.in-zoomer'
  // },
  on: {
    // ready(zoomist) {
    //   console.log(zoomist)
    // },
    // reset(zoomist) {
    //   console.log('reset', zoomist)
    // },
    // resize(zoomist) {
    //   console.log(zoomist)
    // },
    // zoom(ratio) {
    //   console.log('zoom', ratio)
    // },
    // wheel(zoomist) {
    //   console.log(zoomist)
    // },
    // resize() {
    //   console.log('resize')
    // },
    // slideStart(val) {
    //   console.log(val)
    // },
    // slide(val) {
    //   console.log(val)
    // },
    // slideEnd(val) {
    //   console.log(val)
    // },
    // dragStart(e) {
    //   console.log('dragStart', e)
    // },
    // drag(e) {
    //   console.log('drag', e)
    // },
    // dragEnd(e) {
    //   console.log('dragEnd', e)
    // },
    // pinchStart(e) {
    //   console.log('pinchStart', e)
    // },
    // pinch(e) {
    //   console.log('pinch', e)
    // },
    // pinchEnd(e) {
    //   console.log('pinchEnd', e)
    // },
    // beforeDestroy(zoomist) {
    //   const { mounted } = zoomist
    //   console.log(mounted, zoomist)
    // },
    // destroy(zoomist) {
    //   const { mounted } = zoomist
    //   console.log(mounted, zoomist)
    // },
  }
})

// console.log('%cindex.js line:8 zoomist', 'color: #007acc;', zoomist);

// zoomist.on('resize', (zoomist) => {
//   console.log(zoomist)
// })
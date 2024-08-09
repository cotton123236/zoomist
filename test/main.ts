import './../src/zoomist.scss'

import Zoomist from './../src/zoomist'
import { ZoomistOptions } from './../src/types'

// import Zoomist from './../dist/zoomist.js'
// import { ZoomistOptions } from './../dist/types'

const options: ZoomistOptions = {
  // initScale: 2.5,
  // minScale: 0.5,
  // maxScale: 100,
  // draggable: false,
  // wheelable: false,
  // pinchable: false,
  // bounds: false,
  // wheelReleaseOnMinMax: true,
  // dragReleaseOnBounds: true,
  slider: true,
  zoomer: true,
  dblClickable: true,
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
    // dragStart(_, transform, e) {
    //   console.log('dragStart', transform, e)
    // },
    // drag(_, transform, e) {
    //   console.log('drag', transform, e)
    // },
    // dragEnd(_, transform, e) {
    //   console.log('dragEnd', transform, e)
    // },
    // pinchStart(_, scale, e) {
    //   console.log('pinchStart', scale, e)
    // },
    // pinch(_, scale, e) {
    //   console.log('pinch', scale, e)
    // },
    // pinchEnd(_, scale, e) {
    //   console.log('pinchEnd', scale, e)
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
}

const zoomist = new Zoomist('.cat-zoomist', options)

console.log('%cindex.js line:8 zoomist', 'color: #007acc;', zoomist);

// zoomist.on('resize', (zoomist) => {
//   console.log(zoomist)
// })
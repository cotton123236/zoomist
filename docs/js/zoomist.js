/*!
 * zoomist.js v1.0.0
 * https://github.com/cotton123236/zoomist#readme
 *
 * Copyright 2021-present Wilson Wu
 * Released under the MIT license
 *
 * Date: 2021-11-03T15:35:23.529Z
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Zoomist = factory());
})(this, (function () { 'use strict';

  var DEFAULT_OPTIONS = {
    fill: 'cover',
    src: 'data-zoomist-src',
    wheelable: true,
    draggable: true,
    bounds: true
  };

  const NAME = 'zoomist';
  const CLASS_CONTAINER = `${NAME}-container`;
  const CLASS_IMAGE = `${NAME}-image`;
  const IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined';
  const IS_TOUCH = IS_BROWSER && window.document.documentElement ? 'ontouchstart' in window.document.documentElement : false;
  const EVENT_TOUCH_START = IS_TOUCH ? 'touchstart' : 'mousedown';
  const EVENT_TOUCH_MOVE = IS_TOUCH ? 'touchmove' : 'mousemove';
  const EVENT_TOUCH_END = IS_TOUCH ? 'touchend touchcancel' : 'mouseup';

  const isObject = value => {
    return typeof value === 'object' && value !== null;
  }; // check value is a plain object

  const isPlainObject = value => {
    if (!isObject(value)) return false;

    try {
      const {
        constructor
      } = value;
      const {
        prototype
      } = constructor;
      const {
        hasOwnProperty
      } = Object.prototype;
      return constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
    } catch (error) {
      return false;
    }
  }; // make a new object from old object

  const getNewObject = value => {
    const obj = {};

    for (const [k, v] of Object.entries(value)) {
      obj[k] = v;
    }

    return obj;
  }; // check value is string and not empty

  const isString = value => {
    return typeof value === 'string' && value !== '';
  }; // check value is number and not NaN

  const isNumber = value => {
    return typeof value === 'number' && !isNaN(value);
  }; // check element is exist

  const isElementExist = value => {
    return getElement(value) !== null;
  }; // if value is an element then return value, if not then query value

  const getElement = value => {
    return value instanceof HTMLElement ? value : document.querySelector(value);
  }; // check value is img tag or not

  const setStyle = (element, obj) => {
    for (const [k, v] of Object.entries(obj)) {
      element.style[k] = isNumber(v) ? `${v}px` : v;
    }
  }; // get mouse pageX and pageY

  const getPointer = event => {
    return {
      x: !IS_TOUCH ? event.pageX : event.touches[0].pageX,
      y: !IS_TOUCH ? event.pageY : event.touches[0].pageY,
      clientX: !IS_TOUCH ? event.clientX : event.touches[0].clientX,
      clientY: !IS_TOUCH ? event.clientY : event.touches[0].clientY
    };
  }; // get transformX

  const getTransformX = target => {
    const transform = getComputedStyle(target).transform;
    let mat = transform.match(/^matrix3d\((.+)\)$/);
    if (mat) return parseFloat(mat[1].split(', ')[12]);
    mat = transform.match(/^matrix\((.+)\)$/);
    return mat ? parseFloat(mat[1].split(', ')[4]) : 0;
  }; // get transformY

  const getTransformY = target => {
    const transform = getComputedStyle(target).transform;
    let mat = transform.match(/^matrix3d\((.+)\)$/);
    if (mat) return parseFloat(mat[1].split(', ')[13]);
    mat = transform.match(/^matrix\((.+)\)$/);
    return mat ? parseFloat(mat[1].split(', ')[5]) : 0;
  };

  var methods = {
    /**
     * get container (element) data
     * @returns {Object}
     */
    getContainerData() {
      return getNewObject(this.data.containerData);
    },

    /**
     * get image data
     * @returns {Object}
     */
    getImageData() {
      return getNewObject(this.data.imageData);
    },

    /**
     * zoom
     * @param {Number} 
     */
    zoom(ratio, pointer) {
      const {
        image,
        data
      } = this;
      const imageData = this.getImageData();
      const imageRect = image.getBoundingClientRect();
      const newWidth = imageData.width * (ratio + 1);
      const newHeight = imageData.height * (ratio + 1);
      const distX = pointer ? (pointer.clientX - imageRect.left) / imageData.width : 0.5;
      const distY = pointer ? (pointer.clientY - imageRect.top) / imageData.height : 0.5;
      const newLeft = (imageData.width - newWidth) * distX + imageData.left;
      const newTop = (imageData.height - newHeight) * distY + imageData.top;
      data.imageData.width = newWidth;
      data.imageData.height = newHeight;
      data.imageData.left = newLeft;
      data.imageData.top = newTop;
      setStyle(image, {
        width: newWidth,
        height: newHeight,
        left: newLeft,
        top: newTop
      }); // console.log(this.getImageData())
    }

  };

  var bindEvents = (zoomist => {
    const {
      element,
      image,
      options,
      data
    } = zoomist;
    const {
      containerData,
      imageData
    } = data; // set image size on window resize

    window.addEventListener('resize', function () {
      const containerWidthRatio = element.offsetWidth / containerData.width;
      const containerHeightRatio = element.offsetHeight / containerData.height;
      const imageWidth = imageData.width * containerWidthRatio;
      const imageHeight = imageData.height * containerHeightRatio;
      const imageLeft = imageData.left * containerWidthRatio;
      const imageTop = imageData.top * containerHeightRatio;
      containerData.width = element.offsetWidth;
      containerData.height = element.offsetHeight;
      imageData.width = imageWidth;
      imageData.height = imageHeight;
      imageData.left = imageLeft;
      imageData.top = imageTop;
      setStyle(zoomist.image, {
        width: imageWidth,
        height: imageHeight,
        left: imageLeft,
        top: imageTop
      });
    }); // set image move event

    zoomist.isDrag = false;
    zoomist.data.dragData = {
      startX: 0,
      startY: 0,
      transX: 0,
      transY: 0
    };
    if (options.fill === 'contain' && options.bounds) options.bounds = false;
    const {
      dragData
    } = data;

    const dragging = e => {
      if (!zoomist.isDrag) return;
      const pageX = getPointer(e).x;
      const pageY = getPointer(e).y;
      const distanceX = pageX - dragData.startX + dragData.transX;
      const distanceY = pageY - dragData.startY + dragData.transY;
      const transformX = options.bounds ? Math.min(Math.max(distanceX, imageData.left), -imageData.left) : distanceX;
      const transformY = options.bounds ? Math.min(Math.max(distanceY, imageData.top), -imageData.top) : distanceY;
      image.style.transform = `translate(${transformX}px, ${transformY}px)`;
    };

    const dragend = () => {
      zoomist.isDrag = false;
      document.removeEventListener(EVENT_TOUCH_MOVE, dragging);
      document.removeEventListener(EVENT_TOUCH_END, dragend);
    };

    element.addEventListener(EVENT_TOUCH_START, function (e) {
      if (!options.draggable) return;
      dragData.startX = getPointer(e).x;
      dragData.startY = getPointer(e).y;
      dragData.transX = getTransformX(zoomist.image);
      dragData.transY = getTransformY(zoomist.image);
      zoomist.isDrag = true;
      document.addEventListener(EVENT_TOUCH_MOVE, dragging);
      document.addEventListener(EVENT_TOUCH_END, dragend);
    });
  });

  class Zoomist {
    /**
     * 
     * @param {Element} element - target element 
     * @param {Object} options - the configuration options
     */
    constructor(element, options = {}) {
      if (!element) throw new Error('The first argument is required.');
      if (!isElementExist(element)) throw new Error('This element is not exist.');
      this.element = getElement(element);
      this.options = Object.assign({}, DEFAULT_OPTIONS, isPlainObject(options) && options);
      this.init();
    }

    init() {
      const {
        element,
        options
      } = this;
      if (element[NAME]) return;
      element[NAME] = this;
      const src = options.src = isString(options.src) ? options.src : DEFAULT_OPTIONS.src;
      const url = element.getAttribute(src);
      this.create(url);
    }

    create(url) {
      if (!url) return;
      const {
        element
      } = this;
      const {
        offsetWidth,
        offsetHeight
      } = element;
      this.url = url;
      this.data = {};
      this.data.containerData = {
        width: offsetWidth,
        height: offsetHeight,
        ratio: offsetWidth / offsetHeight
      };
      this.mount();
    }

    mount() {
      if (this.mounted) return;
      const {
        url,
        data,
        options
      } = this;
      const {
        containerData
      } = data;
      const {
        fill
      } = options;
      const image = document.createElement('img');
      image.classList.add(CLASS_IMAGE);
      image.src = url;
      this.image = image;
      const {
        naturalWidth,
        naturalHeight
      } = image;
      const imageRatio = naturalWidth / naturalHeight; // get base on width or height

      let baseSide;
      if (fill !== 'cover' && fill !== 'contain' && fill !== 'none') options.fill = 'cover';
      if (options.fill === 'cover') baseSide = containerData.ratio === imageRatio ? 'both' : containerData.ratio > imageRatio ? 'width' : 'height';
      if (options.fill === 'contain') baseSide = containerData.ratio === imageRatio ? 'both' : containerData.ratio > imageRatio ? 'height' : 'width'; // calculate the image width, height, left, top

      const imageWidth = options.fill === 'none' ? naturalWidth : baseSide === 'both' || baseSide === 'width' ? containerData.width : containerData.height * imageRatio;
      const imageHeight = options.fill === 'none' ? naturalHeight : baseSide === 'both' || baseSide === 'height' ? containerData.height : containerData.width / imageRatio;
      const imageLeft = (containerData.width - imageWidth) / 2;
      const imageTop = (containerData.height - imageHeight) / 2;
      this.data.imageData = {
        naturalWidth,
        naturalHeight,
        width: imageWidth,
        height: imageHeight,
        ratio: imageRatio,
        left: imageLeft,
        top: imageTop
      };
      setStyle(image, {
        width: imageWidth,
        height: imageHeight,
        left: imageLeft,
        top: imageTop
      });
      bindEvents(this);
      this.mounted = true;
      this.render();
    }

    render() {
      const {
        element,
        image
      } = this;
      element.classList.add(CLASS_CONTAINER);
      element.append(image);
    }

  }

  Object.assign(Zoomist.prototype, methods);

  return Zoomist;

}));

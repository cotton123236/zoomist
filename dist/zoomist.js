/*!
 * zoomist.js v1.0.0
 * https://github.com/cotton123236/zoomist#readme
 *
 * Copyright 2021-present Wilson Wu
 * Released under the MIT license
 *
 * Date: 2021-11-01T14:43:51.273Z
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Zoomist = factory());
})(this, (function () { 'use strict';

  var DEFAULT_OPTIONS = {
    src: 'data-zoomist-src',
    mousewheel: true
  };

  const NAME = 'zoomist';
  const CLASS_CONTAINER = `${NAME}-container`;
  const CLASS_WRAPPER = `${NAME}-wrapper`;
  const CLASS_IMAGE = `${NAME}-image`;
  const CLASS_HIDE = `${NAME}-hide`;

  var TEMPLATE = (zoomist => {
    const {
      url,
      style
    } = zoomist;
    return `
  <div class="${CLASS_WRAPPER}">
    <img class="${CLASS_IMAGE}" src="${url}" />
  </div>
  `;
  });

  // check value is a object and not null
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

  const isImg = value => {
    return isElementExist(value) && getElement(value).tagName === 'IMG';
  }; // 

  const getStyle = (element, prop) => {
    return element[prop] || element.style[prop] || window.getComputedStyle(element).getPropertyValue(prop);
  };
  const setStyle = (element, obj) => {
    for (const [k, v] of Object.entries(obj)) {
      element.style[k] = isNumber(v) ? `${v}px` : v;
    }
  };

  var bindEvents = (zoomist => {
    const {
      parent,
      data
    } = zoomist;
    const {
      container,
      wrapper
    } = data;
    window.addEventListener('resize', function () {
      const containerWidth = parent.offsetWidth * container.widthPercentage;
      const containerHeight = containerWidth / container.ratio;
      container.width = containerWidth;
      container.height = containerHeight;
      setStyle(zoomist.container, {
        width: containerWidth,
        height: containerHeight
      });
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
      this.parent = this.element.parentNode;
      this.init();
    }

    init() {
      const {
        element,
        options,
        parent
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
        element,
        parent
      } = this;
      const {
        offsetWidth,
        offsetHeight
      } = element;
      this.url = url;
      this.data = {};
      this.data.container = {
        width: offsetWidth,
        height: offsetHeight,
        ratio: offsetWidth / offsetHeight,
        position: getStyle(element, 'position') === 'static' ? 'relative' : getStyle(element, 'position'),
        top: getStyle(element, 'top'),
        left: getStyle(element, 'left'),
        right: getStyle(element, 'right'),
        bottom: getStyle(element, 'bottom'),
        widthPercentage: offsetWidth / parent.offsetWidth
      };

      if (isImg(element)) {
        element.onload = () => {
          const {
            offsetWidth,
            offsetHeight
          } = element;
          this.style.container.width = offsetWidth;
          this.style.container.height = offsetHeight;
          this.mount();
        };
      } else this.mount();
    }

    mount() {
      if (this.mounted) return;
      const {
        data
      } = this;
      const {
        position,
        top,
        left,
        right,
        bottom,
        width,
        height
      } = data.container;
      const template = document.createElement('div');
      template.innerHTML = TEMPLATE(this);
      template.classList.add(CLASS_CONTAINER);
      this.container = template;
      this.wrapper = template.querySelector(`.${CLASS_WRAPPER}`);
      this.image = template.querySelector(`.${CLASS_IMAGE}`);
      const {
        naturalWidth,
        naturalHeight
      } = this.image;
      this.data.image = {
        naturalWidth,
        naturalHeight,
        ratio: naturalWidth / naturalHeight
      }; // get base side, if 0 base on width, if 1 base on height

      const baseSide = data.container.ratio > data.image.ratio ? 0 : 1;
      const wrapperWidth = !baseSide ? data.container.width : height * data.image.ratio;
      const wrapperHeight = baseSide ? data.container.height : width / data.image.ratio;
      this.data.wrapper = {
        width: wrapperWidth,
        height: wrapperHeight,
        ratio: data.image.ratio,
        left: !baseSide ? 0 : -(wrapperWidth - width) / 2,
        top: baseSide ? 0 : -(wrapperHeight - height) / 2
      };
      setStyle(this.container, {
        position,
        top,
        left,
        right,
        bottom,
        width,
        height
      });
      setStyle(this.wrapper, {
        width: data.wrapper.width,
        height: data.wrapper.height,
        left: data.wrapper.left,
        top: data.wrapper.top
      });
      bindEvents(this);
      this.mounted = true;
      this.render();
    }

    render() {
      const {
        element,
        container,
        parent
      } = this;
      element.classList.add(CLASS_HIDE);
      element.parentNode.insertBefore(container, element.nextSibling);
    }

  }

  return Zoomist;

}));

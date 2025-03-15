var Gt = Object.defineProperty;
var Ft = (e, t, s) => t in e ? Gt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var Y = (e, t, s) => (Ft(e, typeof t != "symbol" ? t + "" : t, s), s), Pt = (e, t, s) => {
  if (!t.has(e))
    throw TypeError("Cannot " + s);
};
var S = (e, t, s) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, s);
};
var b = (e, t, s) => (Pt(e, t, "access private method"), s);
const yt = (e) => {
  if (!e || typeof e != "object")
    return !1;
  const t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null;
}, vt = (e) => typeof e == "function", W = (e) => !isNaN(Number(e)), rt = (e) => e == null, lt = (e) => e instanceof HTMLElement ? e : document.querySelector(e), ct = (e, t) => t ? e.closest(`.${t}`) : null, R = (e) => "touches" in e ? e.touches.length === 0 ? { clientX: 0, clientY: 0 } : e.touches.length === 1 ? { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY } : {
  clientX: [...e.touches].reduce((t, s) => t + s.clientX, 0) / e.touches.length,
  clientY: [...e.touches].reduce((t, s) => t + s.clientY, 0) / e.touches.length
} : { clientX: e.clientX, clientY: e.clientY }, y = (e) => {
  const { width: t, height: s, top: n, left: o, bottom: r } = e.getBoundingClientRect();
  return {
    width: t,
    height: s,
    top: n,
    left: o,
    bottom: r
  };
}, Et = (e) => e.touches.length >= 2 ? Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY) : 0, C = (e, t) => {
  for (const [s, n] of Object.entries(t))
    typeof n == "string" && e.style.setProperty(s, n);
}, x = (e, t) => {
  for (const [s, n] of Object.entries(t))
    e.setAttribute(s, n);
}, E = (e, t) => {
  for (const [s, n] of Object.entries(t))
    e[s] = n;
}, w = (e, t, s) => Math.min(Math.max(e, t), s), X = (e) => isNaN(e) ? 0 : Math.round(e * 100) / 100, St = (e) => {
  throw new Error(e);
}, ht = (e) => console.warn(e), I = (e = "div", t, s, n) => {
  const o = document.createElement(e);
  return t && o.classList.add(...t.split(" ")), s && x(o, s), n && (o.innerHTML = n), o;
}, p = "zoomist", qt = `${p}-container`, bt = `${p}-wrapper`, ut = `${p}-image`, Kt = `${p}-not-draggable`, Jt = `${p}-not-wheelable`, $ = `${p}-slider`, Qt = `${p}-slider-wrapper`, te = `${p}-slider-bar`, ee = `${p}-slider-button`, Z = `${p}-zoomer`, se = `${p}-zoomer-button`, gt = `${p}-zoomer-icon`, mt = `${p}-zoomer-in`, dt = `${p}-zoomer-out`, ft = `${p}-zoomer-reset`, ne = `${p}-zoomer-disabled`, ie = {
  tabindex: "0",
  role: "slider",
  "aria-label": "slider for zoomist",
  "aria-valuemin": "0",
  "aria-valuemax": "100",
  "aria-valuenow": "0",
  "aria-disabled": "false"
}, _t = {
  tabindex: "0",
  role: "button",
  type: "button",
  "aria-disabled": "false"
}, oe = {
  ..._t,
  "aria-label": "button for zoom in zoomist"
}, ae = {
  ..._t,
  "aria-label": "button for zoom out zoomist"
}, re = {
  ..._t,
  "aria-label": "button for reset zoomist scale"
}, le = typeof window < "u" && typeof window.document < "u", L = le && "ontouchstart" in window, ce = L ? "touchstart" : "mousedown", Tt = L ? "touchmove" : "mousemove", Ot = L ? "touchend" : "mouseup", he = "wheel", ue = ["left", "right", "center"], me = ["top", "bottom", "center"], Yt = "--scale", Xt = "--translate-x", Dt = "--translate-y", de = "--value", wt = {
  // set is draggable or not
  draggable: !0,
  // set is wheelable or not
  wheelable: !0,
  // set is pinchable or not
  pinchable: !0,
  // set image stuck on bounds
  bounds: !0,
  // the ratio of zooming at one time
  zoomRatio: 0.1,
  // the max scale of zoomist-image (must be number larger then initScale)
  maxScale: 10,
  // the min scale of zoomist-image (must be number smaller then initScale)
  minScale: 1,
  // set initial scale of zoomist-image
  initScale: null,
  // if set to true, enable to release touch events to allow for further page scrolling when .zoomist-image is on bounds.
  dragReleaseOnBounds: !1,
  // if set to true, enable to release wheel events to allow for further page scrolling when .zoomist-image is on mixScale or maxScale.
  wheelReleaseOnMinMax: !1,
  // elements matched this class will not be dragged.
  disableDraggingClass: Kt,
  // elements matched this class will not be zoomed by mouse wheel.
  disableWheelingClass: Jt,
  // if set to true, enable to smooth drag
  smooth: !1
}, fe = {
  // the css selector string or a element of the slider
  el: null,
  // the direction of the slider 'horizontal' or 'vertical'
  direction: "horizontal"
}, ge = {
  el: `.${$}`
}, _e = {
  el: null,
  // the css selector string or a element for in-zoomer
  inEl: null,
  // the css selector string or a element for out-zoomer
  outEl: null,
  // the css selector string or a element for reset-zoomer
  resetEl: null,
  // in zoomer and out zoomer will be disabled when image comes to maximin or minimum
  disabledClass: ne
}, pe = {
  el: `.${Z}`,
  inEl: `.${mt}`,
  outEl: `.${dt}`,
  resetEl: `.${ft}`
}, ve = {
  // invoked when zoomist instance ready
  ready: null,
  // invoked when reset methods be used
  reset: null,
  // invoked when image changes it's size
  resize: null,
  // invoked before destroy methods be used
  beforeDestroy: null,
  // invoked after destroy methods be used
  destroy: null,
  // invoked before update methods be used
  beforeUpdate: null,
  // invoked when update methods be used
  update: null,
  // invoked when image is zooming
  zoom: null,
  // invoked when wheeling
  wheel: null,
  // invoked when mousedown on wrapper
  dragStart: null,
  // invoked when dragging the image
  drag: null,
  // invoked when mouseup on wrapper
  dragEnd: null,
  // invoked when mousedown on wrapper
  pinchStart: null,
  // invoked when pinching the image
  pinch: null,
  // invoked when mouseup on wrapper
  pinchEnd: null,
  // invoked when mousedown on slider
  slideStart: null,
  // invoked when sliding the slider
  slide: null,
  // invoked when mouseup on slider
  slideEnd: null
}, Ee = {
  // slider options
  slider: null,
  // zoomer options
  zoomer: null
}, Se = `
<svg viewBox="0 0 12 12" class="${gt}">
  <polygon points="12,5.5 6.5,5.5 6.5,0 5.5,0 5.5,5.5 0,5.5 0,6.5 5.5,6.5 5.5,12 6.5,12 6.5,6.5 12,6.5 "/>
</svg>
`, be = `
<svg viewBox="0 0 12 12" class="${gt}">
  <rect y="5.5" width="12" height="1"/>
</svg>
`, Te = `
<svg viewBox="0 0 12 12" class="${gt}">
  <path d="m7.45,1.27l.35-.22c.26-.17.34-.52.17-.78-.17-.27-.52-.34-.78-.17l-1.54.99-.19.13-.11.46,1.12,1.75c.11.17.29.26.48.26.1,0,.21-.03.31-.09.26-.17.34-.52.17-.78l-.29-.46c1.85.5,3.22,2.17,3.22,4.18,0,2.39-1.95,4.34-4.34,4.34S1.66,8.92,1.66,6.52c0-1.15.44-2.23,1.25-3.05.22-.22.22-.58,0-.8-.22-.22-.58-.22-.8,0-1.02,1.03-1.58,2.4-1.58,3.85,0,3.02,2.46,5.48,5.48,5.48s5.48-2.46,5.48-5.48c0-2.51-1.71-4.62-4.02-5.26Z"/>
</svg>
`, Oe = {
  on(e, t) {
    if (!t || !vt(t))
      return this;
    const { __events__: s } = this;
    return e.split(" ").forEach((n) => {
      const o = n;
      s[o] || (s[o] = []), s[o].push(t);
    }), this;
  },
  emit(e, ...t) {
    const { __events__: s } = this;
    return s[e] ? (s[e].forEach((n) => {
      vt(n) && n.apply(this, t);
    }), this) : this;
  },
  zoom(e, t) {
    const { scale: s } = this.transform, n = this.useFixedRatio(X(s * (e + 1)));
    return s === n ? this : (this.zoomTo(n, t), this);
  },
  zoomTo(e, t = !0) {
    const {
      image: s,
      transform: { scale: n, translateX: o, translateY: r },
      options: { bounds: i }
    } = this;
    if (e = this.useFixedRatio(e), e === n)
      return this;
    if (this.transform.scale = e, !t)
      return this.emit("zoom", this, this.transform.scale), this;
    t = typeof t == "boolean" ? this.getContainerCenterClient() : t;
    const { clientX: l, clientY: h } = t, { top: c, left: f, width: m, height: a } = y(s), { width: d, height: g } = this.getImageDiff(), _ = e / n - 1, T = (m / 2 - l + f) * _ + o, u = (a / 2 - h + c) * _ + r, v = i ? w(T, d, -d) : T, O = i ? w(u, g, -g) : u;
    return E(this.transform, {
      translateX: v,
      translateY: O
    }), this.emit("zoom", this, this.transform.scale), this;
  },
  move(e) {
    const {
      options: { bounds: t },
      transform: { translateX: s, translateY: n }
    } = this, { x: o, y: r } = e, { width: i, height: l } = this.getImageDiff();
    if (W(o)) {
      const h = s + o, c = t ? w(h, i, -i) : h;
      this.transform.translateX = c;
    }
    if (W(r)) {
      const h = n + r, c = t ? w(h, l, -l) : h;
      this.transform.translateY = c;
    }
    return this;
  },
  moveTo(e) {
    const {
      options: { bounds: t }
    } = this, { x: s, y: n } = e, { width: o, height: r } = this.getImageDiff();
    if (W(s)) {
      const i = Number(s), l = t ? w(i, o, -o) : i;
      this.transform.translateX = l;
    }
    if (W(n)) {
      const i = Number(n), l = t ? w(i, r, -r) : i;
      this.transform.translateY = l;
    }
    if (ue.some((i) => i === s)) {
      const l = {
        left: -o,
        right: o,
        center: 0
      }[s];
      this.transform.translateX = l;
    }
    if (me.some((i) => i === n)) {
      const l = {
        top: -r,
        bottom: r,
        center: 0
      }[n];
      this.transform.translateY = l;
    }
    return this;
  },
  slideTo(e) {
    const {
      options: { minScale: t, maxScale: s }
    } = this, n = (s - t) * e / 100 + t;
    return this.zoomTo(n), this;
  },
  reset() {
    const {
      options: { initScale: e }
    } = this;
    return E(this.transform, {
      scale: e,
      translateX: 0,
      translateY: 0
    }), this.emit("reset", this), this;
  },
  destroy(e = !1) {
    const { element: t, image: s, controller: n } = this;
    return this.mounted && (this.emit("beforeDestroy", this), n.abort(), this.destroyModules(), e && s && (this.reset(), s.removeAttribute("style")), t[p] = null, this.mounted = !1, this.emit("destroy", this)), null;
  },
  update(e) {
    const { element: t, controller: s } = this;
    return this.emit("beforeUpdate", this), t[p] = null, this.mounted = !1, s.abort(), this.destroyModules(), e && (this.options = Object.assign({}, wt, yt(e) && e)), this.init(), this.emit("update", this), this;
  },
  getImageData() {
    return { ...this.data.imageData };
  },
  getContainerData() {
    return { ...this.data.containerData };
  },
  getSliderValue() {
    const {
      __modules__: { slider: e }
    } = this;
    return e && e.value !== void 0 ? e.value : null;
  },
  isOnBoundTop() {
    const {
      options: { bounds: e }
    } = this;
    if (!e)
      return !1;
    const {
      transform: { translateY: t }
    } = this, { height: s } = this.getImageDiff();
    return t * -1 === X(s);
  },
  isOnBoundBottom() {
    const {
      options: { bounds: e }
    } = this;
    if (!e)
      return !1;
    const {
      transform: { translateY: t }
    } = this, { height: s } = this.getImageDiff();
    return t === X(s);
  },
  isOnBoundLeft() {
    const {
      options: { bounds: e }
    } = this;
    if (!e)
      return !1;
    const {
      transform: { translateX: t }
    } = this, { width: s } = this.getImageDiff();
    return t * -1 === X(s);
  },
  isOnBoundRight() {
    const {
      options: { bounds: e }
    } = this;
    if (!e)
      return !1;
    const {
      transform: { translateX: t }
    } = this, { width: s } = this.getImageDiff();
    return t === X(s);
  },
  isOnBoundX() {
    const {
      options: { bounds: e }
    } = this;
    if (!e)
      return !1;
    const {
      transform: { translateX: t }
    } = this, { width: s } = this.getImageDiff();
    return Math.abs(t) === Math.abs(X(s));
  },
  isOnBoundY() {
    const {
      options: { bounds: e }
    } = this;
    if (!e)
      return !1;
    const {
      transform: { translateY: t }
    } = this, { height: s } = this.getImageDiff();
    return Math.abs(t) === Math.abs(X(s));
  },
  isOnMinScale() {
    const {
      options: { minScale: e }
    } = this, {
      transform: { scale: t }
    } = this;
    return t === e;
  },
  isOnMaxScale() {
    const {
      options: { maxScale: e }
    } = this, {
      transform: { scale: t }
    } = this;
    return t === e;
  },
  // private methods
  getImageDiff() {
    const { width: e, height: t } = this.getContainerData(), { width: s, height: n } = this.getImageData();
    return {
      width: (e - s) / 2,
      height: (t - n) / 2
    };
  },
  // private methods
  getContainerCenterClient() {
    const { element: e } = this, { top: t, left: s, width: n, height: o } = y(e);
    return {
      clientX: s + n / 2,
      clientY: t + o / 2
    };
  },
  // private methods
  getScaleRatio() {
    const {
      transform: { scale: e },
      options: { minScale: t, maxScale: s }
    } = this;
    return (e - t) / (s - t);
  },
  // private methods
  useFixedRatio(e) {
    const {
      options: { minScale: t, maxScale: s }
    } = this;
    return w(e, t, s);
  },
  // private methods
  // animation
  useAnimate(e) {
    const {
      options: { smooth: t },
      transform: s
    } = this, o = (1100 - (typeof t == "object" ? Math.max(0.1, Math.min(1, t.damping)) : 0.6) * 1e3) * 0.5, r = () => {
      if (!this.states.dragging && (Math.abs(e.velocityX) > 0.01 || Math.abs(e.velocityY) > 0.01)) {
        const i = Date.now(), l = i - e.lastTime, h = Math.exp(-l / o);
        e.velocityX *= h, e.velocityY *= h, e.lastTime = i;
        const c = e.velocityX * l, f = e.velocityY * l;
        if (this.moveTo({
          x: s.translateX + c,
          y: s.translateY + f
        }), Math.abs(e.velocityX) < 0.01 && Math.abs(e.velocityY) < 0.01) {
          e.frame = null;
          return;
        }
      }
      e.frame = requestAnimationFrame(r);
    };
    return r;
  }
}, { defineProperty: H } = Object;
var V, Rt, U, At, j, Lt, k, zt, G, Mt, F, Ct, P, It, q, xt, K, $t, J, Nt, Q, Bt, tt, Wt;
class Ye {
  constructor(t, s) {
    // create initial data
    S(this, V);
    // mount elements and bind events
    S(this, U);
    // resize, drag, pinch, wheel
    S(this, j);
    // on wheel
    S(this, k);
    // on drag (mouse)
    S(this, G);
    // on touch (pinch and touchmove)
    S(this, F);
    // resize observer on element
    S(this, P);
    // check modules and create
    S(this, q);
    // mount slider
    S(this, K);
    // slider events
    S(this, J);
    // mount zoomer
    S(this, Q);
    // zoomer event
    S(this, tt);
    Y(this, "element");
    Y(this, "options");
    Y(this, "wrapper");
    Y(this, "image");
    Y(this, "mounted");
    Y(this, "data");
    Y(this, "transform");
    Y(this, "states");
    Y(this, "controller");
    Y(this, "__events__");
    Y(this, "__modules__");
    if (!t)
      return St("The first argument is required.");
    const n = lt(t);
    if (!n)
      return St(`Element ${t} is not exist.`);
    this.element = n, this.options = Object.assign({}, wt, yt(s) && s), this.init();
  }
  // check zoomist-image is exist
  init() {
    const { element: t } = this, {
      options: { bounds: s, minScale: n, maxScale: o, initScale: r }
    } = this;
    if (t[p])
      return;
    t[p] = this;
    const i = t.querySelector(`.${bt}`), l = t.querySelector(`.${ut}`);
    if (!i)
      return ht(`${p} needs a ".${bt}" element.`);
    if (!l)
      return ht(`${p} needs a ".${ut}" element.`);
    this.options.minScale = s && n < 1 ? 1 : n, this.options.maxScale = Math.max(o, n), this.options.initScale = w(r || n, n, o), this.wrapper = i, this.image = l, b(this, V, Rt).call(this);
  }
  // destory modules
  destroyModules() {
    const { slider: t, zoomer: s } = this.__modules__;
    t && this.destroySlider(), s && this.destroyZoomer();
  }
  // destroy slider
  destroySlider() {
    var r, i;
    const {
      __modules__: { slider: t }
    } = this;
    if (!t || !t.mounted)
      return;
    const {
      options: { el: s },
      controller: n
    } = t;
    s === `.${$}` ? (r = t.sliderEl) == null || r.remove() : (i = t.sliderTrack) == null || i.remove(), n == null || n.abort(), t.mounted = !1;
  }
  // destroy zoomer
  destroyZoomer() {
    const {
      __modules__: { zoomer: t }
    } = this;
    if (!t || !t.mounted)
      return;
    const {
      options: { el: s, inEl: n, outEl: o, resetEl: r },
      controller: i,
      zoomerEl: l,
      zoomerInEl: h,
      zoomerOutEl: c,
      zoomerResetEl: f
    } = t, m = (a, d, g) => {
      a === `.${d}` && (g == null || g.remove());
    };
    [
      { target: s, className: Z, el: l },
      { target: n, className: mt, el: h },
      { target: o, className: dt, el: c },
      { target: r, className: ft, el: f }
    ].forEach((a) => m(a.target, a.className, a.el)), i == null || i.abort(), t.mounted = !1;
  }
}
V = new WeakSet(), Rt = function() {
  const { element: t, image: s, options: n } = this, { draggable: o, pinchable: r } = n, { offsetWidth: i, offsetHeight: l } = t, { offsetWidth: h, offsetHeight: c } = s, { width: f, height: m } = y(s);
  if (!h || !c)
    return ht(`The width or height of ${ut} should not be 0.`);
  if (this.transform = {
    scale: 0,
    translateX: 0,
    translateY: 0
  }, this.data = {
    imageData: {
      originWidth: h,
      originHeight: c,
      width: f,
      height: m
    },
    containerData: {
      width: i,
      height: l
    }
  }, L && (o || r) && (this.data.touchData = {
    hypot: 0,
    prevX: 0,
    prevY: 0,
    offsetX: 0,
    offsetY: 0,
    imageTop: 0,
    imageLeft: 0,
    widthDiff: 0,
    heightDiff: 0,
    lastTime: 0,
    velocityX: 0,
    velocityY: 0,
    frame: null
  }), !L && o && (this.data.dragData = {
    prevX: 0,
    prevY: 0,
    lastTime: 0,
    velocityX: 0,
    velocityY: 0,
    frame: null
  }), this.__events__ = { ...ve }, n.on)
    for (const [a, d] of Object.entries(n.on))
      this.__events__[a] = [d];
  if (this.__modules__ = { ...Ee }, n.slider) {
    const a = n.slider === !0 ? ge : n.slider;
    this.__modules__.slider = {
      options: Object.assign({}, fe, a)
    };
  }
  if (n.zoomer) {
    const a = n.zoomer === !0 ? pe : n.zoomer;
    this.__modules__.zoomer = {
      options: Object.assign({}, _e, a)
    };
  }
  this.controller = new AbortController(), b(this, U, At).call(this);
}, U = new WeakSet(), At = function() {
  if (this.mounted)
    return;
  const {
    element: t,
    image: s,
    options: { minScale: n, maxScale: o, initScale: r },
    __modules__: { slider: i, zoomer: l }
  } = this;
  C(s, {
    transform: `
        translate(var(${Xt}, 0px), var(${Dt}, 0px))
        scale(var(${Yt}, 0))`
  }), H(this.transform, "scale", {
    get: () => this.transform.__scale__,
    set: (h) => {
      const c = this.useFixedRatio(h);
      if (!(rt(c) || this.transform.__scale__ === c)) {
        if (this.transform.__scale__ = c, C(s, { [Yt]: c.toString() }), E(this.data.imageData, {
          width: y(s).width,
          height: y(s).height
        }), i) {
          const f = Math.round(this.getScaleRatio() * 100);
          i.value = f;
        }
        if (l && l.options.disabledClass) {
          const {
            zoomerInEl: f,
            zoomerOutEl: m,
            zoomerResetEl: a,
            options: { disabledClass: d }
          } = l;
          f && (f.classList[c === o ? "add" : "remove"](d), x(f, { "aria-disabled": c === o ? "true" : "false" })), m && (m.classList[c === n ? "add" : "remove"](d), x(m, { "aria-disabled": c === n ? "true" : "false" })), a && (a.classList[c === r ? "add" : "remove"](d), x(a, { "aria-disabled": c === r ? "true" : "false" }));
        }
      }
    }
  }), H(this.transform, "translateX", {
    get: () => this.transform.__translateX__,
    set: (h) => {
      const c = X(h);
      rt(c) || this.transform.__translateX__ === c || (this.transform.__translateX__ = c, C(s, { [Xt]: `${c}px` }));
    }
  }), H(this.transform, "translateY", {
    get: () => this.transform.__translateY__,
    set: (h) => {
      const c = X(h);
      rt(c) || this.transform.__translateY__ === c || (this.transform.__translateY__ = c, C(s, { [Dt]: `${c}px` }));
    }
  }), b(this, j, Lt).call(this), b(this, q, xt).call(this), E(this.transform, {
    scale: r,
    translateX: 0,
    translateY: 0
  }), t.classList.add(qt), this.mounted = !0, this.emit("ready", this);
}, j = new WeakSet(), Lt = function() {
  const {
    wrapper: t,
    options: s,
    controller: { signal: n }
  } = this, { draggable: o, pinchable: r, wheelable: i } = s;
  if (this.states = {}, i) {
    this.states.wheeling = !1;
    const l = (h) => b(this, k, zt).call(this, h);
    t.addEventListener(he, l, { signal: n });
  }
  if (L && (o || r)) {
    o && (this.states.dragging = !1), r && (this.states.pinching = !1);
    const l = (h) => b(this, F, Ct).call(this, h);
    t.addEventListener("touchstart", l, { signal: n });
  }
  if (!L && o) {
    this.states.dragging = !1;
    const l = (h) => b(this, G, Mt).call(this, h);
    t.addEventListener("mousedown", l, { signal: n });
  }
  b(this, P, It).call(this);
}, k = new WeakSet(), zt = function(t) {
  const {
    options: { zoomRatio: s, wheelReleaseOnMinMax: n, disableWheelingClass: o }
  } = this, r = (t.deltaY || t.detail) > 0 ? -1 : 1;
  if (n) {
    const i = this.isOnMinScale(), l = this.isOnMaxScale();
    i && r === -1 || l && r === 1 || t.preventDefault();
  } else
    t.preventDefault();
  this.states.wheeling || ct(t.target, o) || (this.states.wheeling = !0, setTimeout(() => {
    this.states.wheeling = !1;
  }, 30), this.zoom(r * s, R(t)), this.emit("wheel", this, this.transform.scale, t));
}, G = new WeakSet(), Mt = function(t) {
  const {
    data: s,
    transform: n,
    options: { disableDraggingClass: o, smooth: r }
  } = this, { dragData: i, imageData: l } = s;
  if (!i || !l)
    return;
  const h = (m) => {
    if (m && m.button !== 0 || (m.preventDefault(), ct(m.target, o)))
      return;
    i.frame !== null && cancelAnimationFrame(i.frame);
    const a = Date.now(), { clientX: d, clientY: g } = R(m);
    if (E(i, {
      prevX: d,
      prevY: g,
      lastTime: a,
      velocityX: 0,
      velocityY: 0,
      frame: null
    }), this.states.dragging = !0, r) {
      const _ = this.useAnimate(i);
      i.frame = requestAnimationFrame(_);
    }
    this.emit("dragStart", this, { x: n.translateX, y: n.translateY }, m), document.addEventListener("mousemove", c), document.addEventListener("mouseup", f);
  }, c = (m) => {
    if (m.touches || !this.states.dragging)
      return;
    m.preventDefault();
    const a = Date.now(), { clientX: d, clientY: g } = R(m), _ = d - i.prevX, T = g - i.prevY, u = a - i.lastTime, v = n.translateX + _, O = n.translateY + T;
    this.moveTo({ x: v, y: O }), r && u > 0 && (i.velocityX = 0.8 * (_ / u) + 0.2 * i.velocityX, i.velocityY = 0.8 * (T / u) + 0.2 * i.velocityY), E(i, {
      prevX: d,
      prevY: g,
      lastTime: a
    }), this.emit("drag", this, { x: v, y: O }, m);
  }, f = (m) => {
    m.touches || (this.states.dragging = !1, this.emit("dragEnd", this, { x: n.translateX, y: n.translateY }, m), document.removeEventListener("mousemove", c), document.removeEventListener("mouseup", f));
  };
  h(t);
}, F = new WeakSet(), Ct = function(t) {
  const {
    data: s,
    transform: n,
    options: { maxScale: o, minScale: r, draggable: i, pinchable: l, bounds: h, dragReleaseOnBounds: c, disableDraggingClass: f, smooth: m }
  } = this, { touchData: a, imageData: d } = s;
  if (!a || !d)
    return;
  const g = (u) => {
    if (!u.touches)
      return;
    if (h && c) {
      const z = this.isOnBoundX(), M = this.isOnBoundY();
      u.touches.length === 1 && (z || M) || u.preventDefault();
    } else
      u.preventDefault();
    if (ct(u.target, f) && u.touches.length <= 1)
      return;
    a.frame !== null && cancelAnimationFrame(a.frame);
    const v = Date.now(), { top: O, left: D } = y(this.image), { width: A, height: et } = this.getImageDiff(), { clientX: N, clientY: B } = R(u);
    if (E(a, {
      hypot: Et(u),
      prevX: N,
      prevY: B,
      offsetX: 0,
      offsetY: 0,
      imageTop: O,
      imageLeft: D,
      widthDiff: A,
      heightDiff: et,
      lastTime: v,
      velocityX: 0,
      velocityY: 0,
      frame: null
    }), i) {
      if (this.states.dragging = !0, m) {
        const z = this.useAnimate(a);
        a.frame = requestAnimationFrame(z);
      }
      this.emit("dragStart", this, { x: n.translateX, y: n.translateY }, u);
    }
    l && u.touches.length === 2 && (this.states.pinching = !0, this.emit("pinchStart", this, n.scale, u)), document.addEventListener("touchmove", _), document.addEventListener("touchend", T);
  }, _ = (u) => {
    if (!u.touches)
      return;
    const v = Date.now(), {
      states: { dragging: O, pinching: D }
    } = this, { top: A, left: et } = y(this.image), { width: N, height: B } = this.getImageDiff(), z = D && u.touches.length !== 2 || !D && u.touches.length === 2, M = Et(u), st = M ? M / a.hypot : 1, nt = this.useFixedRatio(st * n.scale), { clientX: it, clientY: ot } = R(u), Ht = it + a.offsetX, Zt = ot + a.offsetY;
    if (l && u.touches.length === 2 && (D || (this.states.pinching = !0, this.emit("pinchStart", this, n.scale, u)), this.zoomTo(nt, !1)), O) {
      z && (a.velocityX = 0, a.velocityY = 0);
      const pt = nt !== o && nt !== r && l && u.touches.length === 2 ? st : 1, Vt = X(
        Ht - a.imageLeft - (N - a.widthDiff) - (a.prevX - a.imageLeft) * pt + n.translateX
      ), Ut = X(
        Zt - a.imageTop - (B - a.heightDiff) - (a.prevY - a.imageTop) * pt + n.translateY
      );
      if (this.moveTo({ x: Vt, y: Ut }), m && u.touches.length === 1 && !z) {
        const at = v - a.lastTime;
        if (at > 0) {
          const jt = it - a.prevX, kt = ot - a.prevY;
          a.velocityX = 0.8 * (jt / at) + 0.2 * a.velocityX, a.velocityY = 0.8 * (kt / at) + 0.2 * a.velocityY;
        }
      }
    }
    E(a, {
      hypot: M,
      prevX: it,
      prevY: ot,
      imageTop: A,
      imageLeft: et,
      widthDiff: N,
      heightDiff: B,
      lastTime: v
    }), D && u.touches.length === 2 && this.emit("pinch", this, n.scale, u), O && this.emit("drag", this, { x: n.translateX, y: n.translateY }, u);
  }, T = (u) => {
    if (!u.touches)
      return;
    const {
      states: { dragging: v, pinching: O }
    } = this;
    if (O && u.touches.length === 1) {
      this.states.pinching = !1;
      const { clientX: D, clientY: A } = R(u);
      E(a, {
        prevX: D,
        prevY: A,
        velocityX: 0,
        velocityY: 0,
        lastTime: Date.now()
      }), this.emit("pinchEnd", this, n.scale, u);
    }
    if (v && !u.touches.length && (this.states.dragging = !1, this.emit("dragEnd", this, { x: n.translateX, y: n.translateY }, u)), v && u.touches.length === 1) {
      const { clientX: D, clientY: A } = R(u);
      E(a, {
        offsetX: a.prevX - D,
        offsetY: a.prevY - A
      });
    }
    u.touches.length || (document.removeEventListener("touchmove", _), document.removeEventListener("touchend", T));
  };
  g(t);
}, P = new WeakSet(), It = function() {
  const { element: t, image: s, transform: n } = this;
  new ResizeObserver(() => {
    const { offsetWidth: r, offsetHeight: i } = t, { width: l, height: h } = this.getContainerData();
    if (r === l && i === h)
      return;
    const c = n.translateX, f = n.translateY;
    if (c) {
      const _ = r / l * c;
      this.transform.translateX = _;
    }
    if (f) {
      const _ = i / h * f;
      this.transform.translateY = _;
    }
    const { offsetWidth: m, offsetHeight: a } = s, { width: d, height: g } = y(s);
    E(this.data.containerData, {
      width: r,
      height: i
    }), E(this.data.imageData, {
      originWidth: m,
      originHeight: a,
      width: d,
      height: g
    }), this.emit("resize", this);
  }).observe(t);
}, q = new WeakSet(), xt = function() {
  const { slider: t, zoomer: s } = this.__modules__;
  t && b(this, K, $t).call(this), s && b(this, Q, Bt).call(this);
}, K = new WeakSet(), $t = function() {
  const {
    element: t,
    __modules__: { slider: s }
  } = this;
  if (!s || s.mounted)
    return;
  const {
    options: { el: n, direction: o }
  } = s;
  if (!n)
    return;
  const r = n === `.${$}`, i = r ? I("div", $) : lt(n);
  if (!i)
    return;
  const l = I("div", Qt), h = I("span", te), c = I("span", ee, {
    ...ie,
    "aria-orientation": o
  });
  i.classList.add(`${$}-${o}`), H(s, "value", {
    get() {
      return s.__value__;
    },
    set(f) {
      s.__value__ !== f && (s.__value__ = f, C(i, { [de]: f.toString() }), x(c, { "aria-valuenow": f.toString() }));
    }
  }), E(s, {
    value: this.getScaleRatio() * 100,
    controller: new AbortController(),
    sliding: !1,
    sliderEl: i,
    sliderTrack: l,
    sliderButton: c
  }), b(this, J, Nt).call(this), l.append(h, c), i.append(l), r && t.append(i), s.mounted = !0;
}, J = new WeakSet(), Nt = function() {
  const {
    options: { minScale: t, maxScale: s },
    __modules__: { slider: n }
  } = this;
  if (!n)
    return;
  const {
    options: { direction: o },
    controller: r,
    sliderEl: i,
    sliderTrack: l
  } = n;
  if (!i || !l)
    return;
  const h = o === "vertical", c = (d) => {
    const g = y(l), _ = g[h ? "height" : "width"], T = g[h ? "bottom" : "left"], u = R(d)[h ? "clientY" : "clientX"], v = X(w((u - T) * (h ? -1 : 1) / _, 0, 1));
    return (s - t) * v + t;
  }, f = (d) => {
    if (d instanceof MouseEvent && d.button !== 0)
      return;
    n.sliding = !0;
    const g = c(d);
    this.zoomTo(g), this.emit("slideStart", this, this.getSliderValue(), d), document.addEventListener(Tt, m), document.addEventListener(Ot, a);
  }, m = (d) => {
    if (!n.sliding)
      return;
    const g = c(d);
    this.zoomTo(g), this.emit("slide", this, this.getSliderValue(), d);
  }, a = (d) => {
    this.emit("slideEnd", this, this.getSliderValue(), d), n.sliding = !1, document.removeEventListener(Tt, m), document.removeEventListener(Ot, a);
  };
  i.addEventListener(ce, f, { signal: r == null ? void 0 : r.signal });
}, Q = new WeakSet(), Bt = function() {
  const {
    element: t,
    __modules__: { zoomer: s }
  } = this;
  if (!s || s.mounted)
    return;
  const {
    options: { el: n, inEl: o, outEl: r, resetEl: i }
  } = s, l = [o, r, i], h = (d, g, _, T, u) => {
    if (!d)
      return null;
    const v = d === `.${_}`;
    return _ = l.includes(d) ? `${_} ${se}` : _, v ? I(g, _, T, u) : lt(d);
  }, c = h(n, "div", Z), f = h(o, "button", mt, oe, Se), m = h(r, "button", dt, ae, be), a = h(i, "button", ft, re, Te);
  E(s, {
    controller: new AbortController(),
    zoomerEl: c,
    zoomerInEl: f,
    zoomerOutEl: m,
    zoomerResetEl: a
  }), c && (f && c.append(f), m && c.append(m), a && c.append(a), n === `.${Z}` && t.append(c)), b(this, tt, Wt).call(this), s.mounted = !0;
}, tt = new WeakSet(), Wt = function() {
  const {
    options: { zoomRatio: t },
    __modules__: { zoomer: s }
  } = this, n = this;
  if (!s)
    return;
  const { controller: o, zoomerInEl: r, zoomerOutEl: i, zoomerResetEl: l } = s;
  r && r.addEventListener(
    "click",
    () => {
      n.zoom(t);
    },
    { signal: o == null ? void 0 : o.signal }
  ), i && i.addEventListener(
    "click",
    () => {
      n.zoom(-t);
    },
    { signal: o == null ? void 0 : o.signal }
  ), l && l.addEventListener(
    "click",
    () => {
      n.reset();
    },
    { signal: o == null ? void 0 : o.signal }
  );
};
Object.assign(Ye.prototype, Oe);
export {
  Ye as default
};

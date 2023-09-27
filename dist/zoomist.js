var Nt = Object.defineProperty;
var Ht = (n, t, e) => t in n ? Nt(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var O = (n, t, e) => (Ht(n, typeof t != "symbol" ? t + "" : t, e), e), Zt = (n, t, e) => {
  if (!t.has(n))
    throw TypeError("Cannot " + e);
};
var E = (n, t, e) => {
  if (t.has(n))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(n) : t.set(n, e);
};
var S = (n, t, e) => (Zt(n, t, "access private method"), e);
const et = (n) => document.contains(H(n)), bt = (n) => {
  if (!n)
    return !1;
  try {
    const { constructor: t } = n, { prototype: e } = t, { hasOwnProperty: s } = Object.prototype;
    return t && e && s.call(e, "isPrototypeOf");
  } catch {
    return !1;
  }
}, gt = (n) => typeof n == "function", $ = (n) => !isNaN(Number(n)), st = (n) => n == null, H = (n) => n instanceof HTMLElement ? n : document.querySelector(n), w = (n) => {
  const t = n instanceof TouchEvent ? n.touches[0] : n;
  return {
    clientX: t.clientX,
    clientY: t.clientY
  };
}, M = (n) => ({
  clientX: [...n].map((t) => t.clientX).reduce((t, e) => t + e) / n.length,
  clientY: [...n].map((t) => t.clientY).reduce((t, e) => t + e) / n.length
}), Y = (n) => {
  const { width: t, height: e, top: s, left: i, bottom: c } = n.getBoundingClientRect();
  return {
    width: t,
    height: e,
    top: s,
    left: i,
    bottom: c
  };
}, _t = (n) => n.length >= 2 ? Math.hypot(n[0].clientX - n[1].clientX, n[0].clientY - n[1].clientY) : 0, L = (n, t) => {
  for (const [e, s] of Object.entries(t))
    typeof s == "string" && n.style.setProperty(e, s);
}, A = (n, t) => {
  for (const [e, s] of Object.entries(t))
    n.setAttribute(e, s);
}, v = (n, t) => {
  for (const [e, s] of Object.entries(t))
    n[e] = s;
}, X = (n, t, e) => Math.min(Math.max(n, t), e), R = (n) => {
  const t = +(Math.round(+(n + "e+2")) + "e-2");
  return isNaN(t) ? 0 : t;
}, pt = (n) => {
  throw new Error(n);
}, nt = (n) => console.warn(n), y = (n = "div", t, e, s) => {
  const i = document.createElement(n);
  return t && i.classList.add(...t.split(" ")), e && A(i, e), s && (i.innerHTML = s), i;
}, _ = "zoomist", Et = `${_}-wrapper`, it = `${_}-image`, I = `${_}-slider`, Vt = `${_}-slider-wrapper`, Wt = `${_}-slider-bar`, Ut = `${_}-slider-button`, Z = `${_}-zoomer`, Bt = `${_}-zoomer-button`, lt = `${_}-zoomer-icon`, ot = `${_}-zoomer-in`, rt = `${_}-zoomer-out`, at = `${_}-zoomer-reset`, kt = `${_}-zoomer-disabled`, jt = {
  tabindex: "0",
  role: "slider",
  "aria-label": "slider for zoomist",
  "aria-valuemin": "0",
  "aria-valuemax": "100",
  "aria-valuenow": "0",
  "aria-disabled": "false"
}, ct = {
  tabindex: "0",
  role: "button",
  "aria-disabled": "false"
}, Gt = {
  ...ct,
  "aria-label": "button for zoom in zoomist"
}, Pt = {
  ...ct,
  "aria-label": "button for zoom out zoomist"
}, Ft = {
  ...ct,
  "aria-label": "button for reset zoomist scale"
}, qt = typeof window < "u" && typeof window.document < "u", z = !!(qt && "ontouchstart" in window), Kt = z ? "touchstart" : "mousedown", x = z ? "touchmove" : "mousemove", C = z ? "touchend" : "mouseup", Jt = "wheel", Qt = ["left", "right", "center"], te = ["top", "bottom", "center"], St = "--scale", vt = "--translate-x", Tt = "--translate-y", ee = "--value", Ot = {
  // set is draggable or not
  draggable: !0,
  // set is wheelable or not
  wheelable: !0,
  // set is pinchable or not
  pinchable: !0,
  // set image stuck on bounds
  bounds: !1,
  // the ratio of zoom at one time
  zoomRatio: 0.1,
  // the max ratio of the image, compare to the initial image status (must be number larger then 1)
  maxScale: 10,
  // the max ratio of the image, compare to the initial image status (must be number smaller then 1 and bigger then 0)
  minScale: 1,
  // set initial ratio of zoomist-image
  initScale: null
}, se = {
  // the css selector string or a element of the slider
  el: null,
  // the direction of the slider 'horizontal' or 'vertical'
  direction: "horizontal"
}, ne = {
  el: `.${I}`
}, ie = {
  el: null,
  // the css selector string or a element for in-zoomer
  inEl: null,
  // the css selector string or a element for out-zoomer
  outEl: null,
  // the css selector string or a element for reset-zoomer
  resetEl: null,
  // in zoomer and out zoomer will be disabled when image comes to maximin or minimum
  disabledClass: kt
}, oe = {
  el: `.${Z}`,
  inEl: `.${ot}`,
  outEl: `.${rt}`,
  resetEl: `.${at}`
}, re = {
  // invoked when zoomist instance ready
  ready: null,
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
  slideEnd: null,
  // invoked when image changes it's size
  resize: null,
  // invoked when reset methods be used
  reset: null,
  // invoked before destroy methods be used
  beforeDestroy: null,
  // invoked after destroy methods be used
  destroy: null,
  // invoked before update methods be used
  beforeUpdate: null,
  // invoked when update methods be used
  update: null
}, ae = {
  // slider options
  slider: null,
  // zoomer options
  zoomer: null
}, le = `
<svg viewBox="0 0 12 12" class="${lt}">
  <polygon points="12,5.5 6.5,5.5 6.5,0 5.5,0 5.5,5.5 0,5.5 0,6.5 5.5,6.5 5.5,12 6.5,12 6.5,6.5 12,6.5 "/>
</svg>
`, ce = `
<svg viewBox="0 0 12 12" class="${lt}">
  <rect y="5.5" width="12" height="1"/>
</svg>
`, he = `
<svg viewBox="0 0 12 12" class="${lt}">
  <path d="m7.45,1.27l.35-.22c.26-.17.34-.52.17-.78-.17-.27-.52-.34-.78-.17l-1.54.99-.19.13-.11.46,1.12,1.75c.11.17.29.26.48.26.1,0,.21-.03.31-.09.26-.17.34-.52.17-.78l-.29-.46c1.85.5,3.22,2.17,3.22,4.18,0,2.39-1.95,4.34-4.34,4.34S1.66,8.92,1.66,6.52c0-1.15.44-2.23,1.25-3.05.22-.22.22-.58,0-.8-.22-.22-.58-.22-.8,0-1.02,1.03-1.58,2.4-1.58,3.85,0,3.02,2.46,5.48,5.48,5.48s5.48-2.46,5.48-5.48c0-2.51-1.71-4.62-4.02-5.26Z"/>
</svg>
`, de = {
  on(n, t) {
    if (!t || !gt(t))
      return this;
    const { __events__: e } = this;
    return n.split(" ").forEach((s) => {
      const i = s;
      e[i] || (e[i] = []), e[i].push(t);
    }), this;
  },
  emit(n, ...t) {
    const { __events__: e } = this;
    return e[n] ? (e[n].forEach((s) => {
      gt(s) && s.apply(this, t);
    }), this) : this;
  },
  zoom(n, t) {
    const { scale: e } = this.transform, s = this.useFixedRatio(R(e * (n + 1)));
    return e === s ? this : (this.zoomTo(s, t), this);
  },
  zoomTo(n, t = !0) {
    const { image: e, transform: { scale: s, translateX: i, translateY: c }, options: { bounds: l } } = this;
    if (n = this.useFixedRatio(n), n === s)
      return this;
    if (this.transform.scale = n, this.emit("zoom", this, this.transform.scale), !t)
      return this;
    t = typeof t == "boolean" ? this.getContainerCenterClient() : t;
    const { clientX: a, clientY: r } = t, { top: o, left: m, width: f, height: u } = Y(e), { width: h, height: d } = this.getImageDiff(), g = n / s - 1, p = (f / 2 - a + m) * g + i, T = (u / 2 - r + o) * g + c, b = l ? X(p, h, -h) : p, D = l ? X(T, d, -d) : T;
    return v(this.transform, {
      translateX: b,
      translateY: D
    }), this;
  },
  move(n) {
    const { options: { bounds: t }, transform: { translateX: e, translateY: s } } = this, { x: i, y: c } = n, { width: l, height: a } = this.getImageDiff();
    if ($(i)) {
      const r = e + i, o = t ? X(r, l, -l) : r;
      this.transform.translateX = o;
    }
    if ($(c)) {
      const r = s + c, o = t ? X(r, a, -a) : r;
      this.transform.translateY = o;
    }
    return this;
  },
  moveTo(n) {
    const { options: { bounds: t } } = this, { x: e, y: s } = n, { width: i, height: c } = this.getImageDiff();
    if ($(e)) {
      const l = Number(e), a = t ? X(l, i, -i) : l;
      this.transform.translateX = a;
    }
    if (Qt.some((l) => l === e)) {
      const a = {
        left: -i,
        right: i,
        center: 0
      }[e];
      this.transform.translateX = a;
    }
    if ($(s)) {
      const l = Number(s), a = t ? X(l, c, -c) : l;
      this.transform.translateY = a;
    }
    if (te.some((l) => l === s)) {
      const a = {
        top: -c,
        bottom: c,
        center: 0
      }[s];
      this.transform.translateY = a;
    }
    return this;
  },
  slideTo(n) {
    const { options: { minScale: t, maxScale: e } } = this, s = (e - t) * n / 100 + t;
    return this.zoomTo(s), this;
  },
  reset() {
    const { options: { initScale: n } } = this;
    return v(this.transform, {
      scale: n,
      translateX: 0,
      translateY: 0
    }), this.emit("reset", this), this;
  },
  destroy(n = !1) {
    const { element: t, image: e, controller: s } = this;
    return this.mounted && (this.emit("beforeDestroy", this), s.abort(), this.destroyModules(), n && e && (this.reset(), e.removeAttribute("style")), t[_] = null, this.mounted = !1, this.emit("destroy", this)), null;
  },
  update(n) {
    const { element: t, controller: e } = this;
    return this.emit("beforeUpdate", this), t[_] = null, this.mounted = !1, e.abort(), this.destroyModules(), n && (this.options = Object.assign({}, Ot, bt(n) && n)), this.init(), this.emit("update", this), this;
  },
  getImageData() {
    return { ...this.data.imageData };
  },
  getContainerData() {
    return { ...this.data.containerData };
  },
  getSliderValue() {
    const { __modules__: { slider: n } } = this;
    return n && n.value ? n.value : null;
  },
  // private methods
  getImageDiff() {
    const { width: n, height: t } = this.getContainerData(), { width: e, height: s } = this.getImageData();
    return {
      width: (n - e) / 2,
      height: (t - s) / 2
    };
  },
  // private methods
  getContainerCenterClient() {
    const { element: n } = this, { top: t, left: e, width: s, height: i } = Y(n);
    return {
      clientX: e + s / 2,
      clientY: t + i / 2
    };
  },
  // private methods
  getScaleRatio() {
    const { transform: { scale: n }, options: { minScale: t, maxScale: e } } = this;
    return (n - t) / (e - t);
  },
  // private methods
  useFixedRatio(n) {
    const { options: { minScale: t, maxScale: e } } = this;
    return X(n, t, e);
  }
}, { defineProperty: N } = Object;
var V, wt, W, Yt, U, Xt, B, zt, k, Rt, j, Dt, G, Lt, P, yt, F, At, q, It, K, $t, J, Mt;
class ue {
  constructor(t, e) {
    // create initial data
    E(this, V);
    // mount elements and bind events
    E(this, W);
    // resize, drag, pinch, wheel
    E(this, U);
    // on wheel
    E(this, B);
    // on drag (mouse)
    E(this, k);
    // on touch (pinch and touchmove)
    E(this, j);
    // resize observer on element
    E(this, G);
    // check modules and create
    E(this, P);
    // mount slider
    E(this, F);
    // slider events
    E(this, q);
    // mount zoomer
    E(this, K);
    // zoomer event
    E(this, J);
    O(this, "element");
    O(this, "options");
    O(this, "wrapper");
    O(this, "image");
    O(this, "mounted");
    O(this, "data");
    O(this, "transform");
    O(this, "states");
    O(this, "controller");
    O(this, "__events__");
    O(this, "__modules__");
    t || pt("The first argument is required."), et(t) || pt(`Element ${t} is not exist.`), this.element = H(t), this.options = Object.assign({}, Ot, bt(e) && e), this.init();
  }
  // check zoomist-image is exist
  init() {
    const { element: t } = this, { options: { bounds: e, minScale: s, maxScale: i, initScale: c } } = this;
    if (t[_])
      return;
    t[_] = this;
    const l = t.querySelector(`.${Et}`), a = t.querySelector(`.${it}`);
    if (!l)
      return nt(`${_} needs a ".${Et}" element.`);
    if (!a)
      return nt(`${_} needs a ".${it}" element.`);
    this.options.minScale = e && s < 1 ? 1 : s, this.options.maxScale = Math.max(i, s), this.options.initScale = X(c || s, s, i), this.wrapper = l, this.image = a, S(this, V, wt).call(this);
  }
  // destory modules
  destroyModules() {
    const { slider: t, zoomer: e } = this.__modules__;
    t && this.destroySlider(), e && this.destroyZoomer();
  }
  // destroy slider
  destroySlider() {
    var c, l;
    const { __modules__: { slider: t } } = this;
    if (!t || !t.mounted)
      return;
    const { options: { el: e }, controller: s } = t;
    e === `.${I}` ? (c = t.sliderEl) == null || c.remove() : (l = t.sliderTrack) == null || l.remove(), s == null || s.abort(), t.mounted = !1;
  }
  // destroy zoomer
  destroyZoomer() {
    const { __modules__: { zoomer: t } } = this;
    if (!t || !t.mounted)
      return;
    const { options: { el: e, inEl: s, outEl: i, resetEl: c }, controller: l, zoomerEl: a, zoomerInEl: r, zoomerOutEl: o, zoomerResetEl: m } = t, f = (u, h, d) => {
      u === `.${h}` && (d == null || d.remove());
    };
    [
      { target: e, className: Z, el: a },
      { target: s, className: ot, el: r },
      { target: i, className: rt, el: o },
      { target: c, className: at, el: m }
    ].forEach((u) => f(u.target, u.className, u.el)), l == null || l.abort(), t.mounted = !1;
  }
}
V = new WeakSet(), wt = function() {
  const { element: t, image: e, options: s } = this, { draggable: i, pinchable: c } = s, { offsetWidth: l, offsetHeight: a } = t, { offsetWidth: r, offsetHeight: o } = e, { width: m, height: f } = Y(e);
  if (!r || !o)
    return nt(`The width or height of ${it} should not be 0.`);
  if (this.transform = {
    scale: 0,
    translateX: 0,
    translateY: 0
  }, this.data = {
    imageData: {
      originWidth: r,
      originHeight: o,
      width: m,
      height: f
    },
    containerData: {
      width: l,
      height: a
    }
  }, z && (i || c) && (this.data.touchData = {
    hypot: 0,
    startX: 0,
    startY: 0,
    prevX: 0,
    prevY: 0,
    imageTop: 0,
    imageLeft: 0,
    widthDiff: 0,
    heightDiff: 0
  }), !z && i && (this.data.dragData = {
    startX: 0,
    startY: 0
  }), this.__events__ = { ...re }, s.on)
    for (const [u, h] of Object.entries(s.on))
      this.__events__[u] = [h];
  if (this.__modules__ = { ...ae }, s.slider) {
    const u = s.slider === !0 ? ne : s.slider;
    this.__modules__.slider = {
      options: Object.assign({}, se, u)
    };
  }
  if (s.zoomer) {
    const u = s.zoomer === !0 ? oe : s.zoomer;
    this.__modules__.zoomer = {
      options: Object.assign({}, ie, u)
    };
  }
  this.controller = new AbortController(), S(this, W, Yt).call(this);
}, W = new WeakSet(), Yt = function() {
  if (this.mounted)
    return;
  const { image: t, options: { minScale: e, maxScale: s, initScale: i }, __modules__: { slider: c, zoomer: l } } = this, a = this;
  L(t, {
    transform: `
        translate(var(${vt}, 0px), var(${Tt}, 0px))
        scale(var(${St}, 0))`
  }), N(this.transform, "scale", {
    get() {
      return a.transform.__scale__;
    },
    set(r) {
      const o = a.useFixedRatio(r);
      if (!(st(o) || a.transform.__scale__ === o)) {
        if (a.transform.__scale__ = o, L(t, { [St]: o.toString() }), v(a.data.imageData, {
          width: Y(t).width,
          height: Y(t).height
        }), c) {
          const m = Math.round(a.getScaleRatio() * 100);
          c.value = m;
        }
        if (l && l.options.disabledClass) {
          const { zoomerInEl: m, zoomerOutEl: f, zoomerResetEl: u, options: { disabledClass: h } } = l;
          m && (m.classList[o === s ? "add" : "remove"](h), A(m, { "aria-disabled": o === s ? "true" : "false" })), f && (f.classList[o === e ? "add" : "remove"](h), A(f, { "aria-disabled": o === e ? "true" : "false" })), u && (u.classList[o === i ? "add" : "remove"](h), A(u, { "aria-disabled": o === i ? "true" : "false" }));
        }
      }
    }
  }), N(this.transform, "translateX", {
    get() {
      return a.transform.__translateX__;
    },
    set(r) {
      const o = R(r);
      st(o) || a.transform.__translateX__ === o || (a.transform.__translateX__ = o, L(t, { [vt]: `${o}px` }));
    }
  }), N(this.transform, "translateY", {
    get() {
      return a.transform.__translateY__;
    },
    set(r) {
      const o = R(r);
      st(o) || a.transform.__translateY__ === o || (a.transform.__translateY__ = o, L(t, { [Tt]: `${o}px` }));
    }
  }), S(this, U, Xt).call(this), S(this, P, yt).call(this), v(this.transform, {
    scale: i,
    translateX: 0,
    translateY: 0
  }), this.mounted = !0, this.emit("ready", this);
}, U = new WeakSet(), Xt = function() {
  const { wrapper: t, options: e, controller: { signal: s } } = this, { draggable: i, pinchable: c, wheelable: l } = e;
  if (this.states = {}, l) {
    this.states.wheeling = !1;
    const a = (r) => S(this, B, zt).call(this, r);
    t.addEventListener(Jt, a, { signal: s });
  }
  if (z && (i || c)) {
    i && (this.states.dragging = !1), c && (this.states.pinching = !1);
    const a = (r) => S(this, j, Dt).call(this, r);
    t.addEventListener("touchstart", a, { signal: s });
  }
  if (!z && i) {
    this.states.dragging = !1;
    const a = (r) => S(this, k, Rt).call(this, r);
    t.addEventListener("mousedown", a, { signal: s });
  }
  S(this, G, Lt).call(this);
}, B = new WeakSet(), zt = function(t) {
  const { options: e } = this, { zoomRatio: s } = e;
  if (t.preventDefault(), this.states.wheeling)
    return;
  this.states.wheeling = !0, setTimeout(() => {
    this.states.wheeling = !1;
  }, 30);
  const i = (t.deltaY || t.detail) > 0 ? -1 : 1;
  this.zoom(i * s, w(t)), this.emit("wheel", this, this.transform.scale, t);
}, k = new WeakSet(), Rt = function(t) {
  const { data: e, transform: s } = this, { dragData: i, imageData: c } = e;
  if (!i || !c)
    return;
  const l = (o) => {
    o && o.button !== 0 || (v(i, {
      startX: w(o).clientX,
      startY: w(o).clientY
    }), this.states.dragging = !0, this.emit("dragStart", this, { x: s.translateX, y: s.translateY }, o), document.addEventListener(x, a), document.addEventListener(C, r));
  }, a = (o) => {
    if (o.touches || !this.states.dragging)
      return;
    const m = w(o).clientX, f = w(o).clientY, u = m - i.startX + s.translateX, h = f - i.startY + s.translateY;
    this.moveTo({ x: u, y: h }), v(i, {
      startX: w(o).clientX,
      startY: w(o).clientY
    }), this.emit("drag", this, { x: u, y: h }, o);
  }, r = (o) => {
    o.touches || (this.states.dragging = !1, this.emit("dragEnd", this, { x: s.translateX, y: s.translateY }, o), document.removeEventListener(x, a), document.removeEventListener(C, r));
  };
  l(t);
}, j = new WeakSet(), Dt = function(t) {
  const { data: e, transform: s, options: { maxScale: i, minScale: c, draggable: l, pinchable: a } } = this, { touchData: r, imageData: o } = e;
  if (!r || !o)
    return;
  const m = (h) => {
    const d = h.touches;
    if (!d)
      return;
    const { top: g, left: p } = Y(this.image), { width: T, height: b } = this.getImageDiff();
    v(r, {
      hypot: _t(d),
      startX: M(d).clientX,
      startY: M(d).clientY,
      prevX: 0,
      prevY: 0,
      imageTop: g,
      imageLeft: p,
      widthDiff: T,
      heightDiff: b
    }), l && (this.states.dragging = !0, this.emit("dragStart", this, { x: s.translateX, y: s.translateY }, h)), a && d.length === 2 && (this.states.pinching = !0, this.emit("pinchStart", this, s.scale, h)), document.addEventListener("touchmove", f), document.addEventListener("touchend", u);
  }, f = (h) => {
    const d = h.touches;
    if (!d)
      return;
    const { states: { dragging: g, pinching: p } } = this, { top: T, left: b } = Y(this.image), { width: D, height: ht } = this.getImageDiff(), Q = _t(d), dt = Q ? Q / r.hypot : 1, tt = this.useFixedRatio(dt * s.scale), ut = M(d).clientX + r.prevX, mt = M(d).clientY + r.prevY;
    if (p && d.length === 2 && this.zoomTo(tt, !1), g) {
      const ft = tt !== i && tt !== c && a ? dt : 1, xt = R(ut - r.imageLeft - (D - r.widthDiff) - (r.startX - r.imageLeft) * ft + s.translateX), Ct = R(mt - r.imageTop - (ht - r.heightDiff) - (r.startY - r.imageTop) * ft + s.translateY);
      this.moveTo({ x: xt, y: Ct });
    }
    v(r, {
      hypot: Q,
      startX: ut,
      startY: mt,
      imageTop: T,
      imageLeft: b,
      widthDiff: D,
      heightDiff: ht
    }), p && d.length === 2 && this.emit("pinch", this, s.scale, h), g && this.emit("drag", this, { x: s.translateX, y: s.translateY }, h);
  }, u = (h) => {
    const d = h.touches;
    if (!d)
      return;
    const { states: { dragging: g, pinching: p } } = this;
    if (g && !d.length && (this.states.dragging = !1, this.emit("dragEnd", this, { x: s.translateX, y: s.translateY }, h)), p && d.length < 2 && (this.states.pinching = !1, this.emit("pinchEnd", this, s.scale, h)), g && d.length === 1) {
      const T = w(h).clientX, b = w(h).clientY;
      v(r, {
        prevX: r.startX - T,
        prevY: r.startY - b
      });
    }
    d.length || (document.removeEventListener("touchmove", f), document.removeEventListener("touchend", u));
  };
  m(t);
}, G = new WeakSet(), Lt = function() {
  const { element: t, image: e, transform: s } = this;
  new ResizeObserver(() => {
    const { offsetWidth: c, offsetHeight: l } = t, { width: a, height: r } = this.getContainerData();
    if (c === a && l === r)
      return;
    const o = s.translateX, m = s.translateY;
    if (o) {
      const g = c / a * o;
      this.transform.translateX = g;
    }
    if (m) {
      const g = l / r * m;
      this.transform.translateY = g;
    }
    const { offsetWidth: f, offsetHeight: u } = e, { width: h, height: d } = Y(e);
    v(this.data.containerData, {
      width: c,
      height: l
    }), v(this.data.imageData, {
      originWidth: f,
      originHeight: u,
      width: h,
      height: d
    }), this.emit("resize", this);
  }).observe(t);
}, P = new WeakSet(), yt = function() {
  const { slider: t, zoomer: e } = this.__modules__;
  t && S(this, F, At).call(this), e && S(this, K, $t).call(this);
}, F = new WeakSet(), At = function() {
  const { element: t, __modules__: { slider: e } } = this;
  if (!e || e.mounted)
    return;
  const { options: { el: s, direction: i } } = e, c = s === `.${I}`;
  if (!s || !c && !et(s))
    return;
  const l = c ? y("div", I) : H(s), a = y("div", Vt), r = y("span", Wt), o = y("span", Ut, { ...jt, "aria-orientation": i });
  l.classList.add(`${I}-${i}`), N(e, "value", {
    get() {
      return e.__value__;
    },
    set(m) {
      e.__value__ !== m && (e.__value__ = m, L(l, { [ee]: m.toString() }), A(o, { "aria-valuenow": m.toString() }));
    }
  }), v(e, {
    value: this.getScaleRatio() * 100,
    controller: new AbortController(),
    sliding: !1,
    sliderEl: l,
    sliderTrack: a,
    sliderButton: o
  }), S(this, q, It).call(this), a.append(r, o), l.append(a), c && t.append(l), e.mounted = !0;
}, q = new WeakSet(), It = function() {
  const { options: { minScale: t, maxScale: e }, __modules__: { slider: s } } = this;
  if (!s)
    return;
  const { options: { direction: i }, controller: c, sliderEl: l, sliderTrack: a } = s;
  if (!l || !a)
    return;
  const r = i === "vertical", o = (h) => {
    const d = Y(a), g = d[r ? "height" : "width"], p = d[r ? "bottom" : "left"], T = w(h)[r ? "clientY" : "clientX"], b = R(X((T - p) * (r ? -1 : 1) / g, 0, 1));
    return (e - t) * b + t;
  }, m = (h) => {
    if (h instanceof MouseEvent && h.button !== 0)
      return;
    s.sliding = !0;
    const d = o(h);
    this.zoomTo(d), this.emit("slideStart", this, this.getSliderValue(), h), document.addEventListener(x, f), document.addEventListener(C, u);
  }, f = (h) => {
    if (!s.sliding)
      return;
    const d = o(h);
    this.zoomTo(d), this.emit("slide", this, this.getSliderValue(), h);
  }, u = (h) => {
    this.emit("slideEnd", this, this.getSliderValue(), h), s.sliding = !1, document.removeEventListener(x, f), document.removeEventListener(C, u);
  };
  l.addEventListener(Kt, m, { signal: c == null ? void 0 : c.signal });
}, K = new WeakSet(), $t = function() {
  const { element: t, __modules__: { zoomer: e } } = this;
  if (!e || e.mounted)
    return;
  const { options: { el: s, inEl: i, outEl: c, resetEl: l } } = e, a = [i, c, l], r = (h, d, g, p, T) => {
    const b = h === `.${g}`;
    return !h || !b && !et(h) ? null : (g = a.includes(h) ? `${g} ${Bt}` : g, b ? y(d, g, p, T) : H(h));
  }, o = r(s, "div", Z), m = r(i, "button", ot, Gt, le), f = r(c, "button", rt, Pt, ce), u = r(l, "button", at, Ft, he);
  v(e, {
    controller: new AbortController(),
    zoomerEl: o,
    zoomerInEl: m,
    zoomerOutEl: f,
    zoomerResetEl: u
  }), o && (m && o.append(m), f && o.append(f), u && o.append(u), s === `.${Z}` && t.append(o)), S(this, J, Mt).call(this), e.mounted = !0;
}, J = new WeakSet(), Mt = function() {
  const { options: { zoomRatio: t }, __modules__: { zoomer: e } } = this, s = this;
  if (!e)
    return;
  const { controller: i, zoomerInEl: c, zoomerOutEl: l, zoomerResetEl: a } = e;
  c && c.addEventListener("click", () => {
    s.zoom(t);
  }, { signal: i == null ? void 0 : i.signal }), l && l.addEventListener("click", () => {
    s.zoom(-t);
  }, { signal: i == null ? void 0 : i.signal }), a && a.addEventListener("click", () => {
    s.reset();
  }, { signal: i == null ? void 0 : i.signal });
};
Object.assign(ue.prototype, de);
export {
  ue as Zoomist,
  ue as default
};

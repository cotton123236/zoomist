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
  const t = "touches" in n ? n.touches[0] : n;
  return {
    clientX: t.clientX,
    clientY: t.clientY
  };
}, C = (n) => ({
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
}, _ = "zoomist", Vt = `${_}-container`, Et = `${_}-wrapper`, it = `${_}-image`, I = `${_}-slider`, Wt = `${_}-slider-wrapper`, Ut = `${_}-slider-bar`, Bt = `${_}-slider-button`, Z = `${_}-zoomer`, kt = `${_}-zoomer-button`, lt = `${_}-zoomer-icon`, ot = `${_}-zoomer-in`, rt = `${_}-zoomer-out`, at = `${_}-zoomer-reset`, jt = `${_}-zoomer-disabled`, Gt = {
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
  type: "button",
  "aria-disabled": "false"
}, Pt = {
  ...ct,
  "aria-label": "button for zoom in zoomist"
}, Ft = {
  ...ct,
  "aria-label": "button for zoom out zoomist"
}, qt = {
  ...ct,
  "aria-label": "button for reset zoomist scale"
}, Kt = typeof window < "u" && typeof window.document < "u", z = !!(Kt && "ontouchstart" in window), Jt = z ? "touchstart" : "mousedown", M = z ? "touchmove" : "mousemove", x = z ? "touchend" : "mouseup", Qt = "wheel", te = ["left", "right", "center"], ee = ["top", "bottom", "center"], St = "--scale", vt = "--translate-x", Tt = "--translate-y", se = "--value", Ot = {
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
  initScale: null
}, ne = {
  // the css selector string or a element of the slider
  el: null,
  // the direction of the slider 'horizontal' or 'vertical'
  direction: "horizontal"
}, ie = {
  el: `.${I}`
}, oe = {
  el: null,
  // the css selector string or a element for in-zoomer
  inEl: null,
  // the css selector string or a element for out-zoomer
  outEl: null,
  // the css selector string or a element for reset-zoomer
  resetEl: null,
  // in zoomer and out zoomer will be disabled when image comes to maximin or minimum
  disabledClass: jt
}, re = {
  el: `.${Z}`,
  inEl: `.${ot}`,
  outEl: `.${rt}`,
  resetEl: `.${at}`
}, ae = {
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
}, le = {
  // slider options
  slider: null,
  // zoomer options
  zoomer: null
}, ce = `
<svg viewBox="0 0 12 12" class="${lt}">
  <polygon points="12,5.5 6.5,5.5 6.5,0 5.5,0 5.5,5.5 0,5.5 0,6.5 5.5,6.5 5.5,12 6.5,12 6.5,6.5 12,6.5 "/>
</svg>
`, he = `
<svg viewBox="0 0 12 12" class="${lt}">
  <rect y="5.5" width="12" height="1"/>
</svg>
`, de = `
<svg viewBox="0 0 12 12" class="${lt}">
  <path d="m7.45,1.27l.35-.22c.26-.17.34-.52.17-.78-.17-.27-.52-.34-.78-.17l-1.54.99-.19.13-.11.46,1.12,1.75c.11.17.29.26.48.26.1,0,.21-.03.31-.09.26-.17.34-.52.17-.78l-.29-.46c1.85.5,3.22,2.17,3.22,4.18,0,2.39-1.95,4.34-4.34,4.34S1.66,8.92,1.66,6.52c0-1.15.44-2.23,1.25-3.05.22-.22.22-.58,0-.8-.22-.22-.58-.22-.8,0-1.02,1.03-1.58,2.4-1.58,3.85,0,3.02,2.46,5.48,5.48,5.48s5.48-2.46,5.48-5.48c0-2.51-1.71-4.62-4.02-5.26Z"/>
</svg>
`, ue = {
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
    const { image: e, transform: { scale: s, translateX: i, translateY: c }, options: { bounds: r } } = this;
    if (n = this.useFixedRatio(n), n === s)
      return this;
    if (this.transform.scale = n, !t)
      return this.emit("zoom", this, this.transform.scale), this;
    t = typeof t == "boolean" ? this.getContainerCenterClient() : t;
    const { clientX: l, clientY: o } = t, { top: a, left: d, width: f, height: m } = Y(e), { width: h, height: u } = this.getImageDiff(), g = n / s - 1, p = (f / 2 - l + d) * g + i, T = (m / 2 - o + a) * g + c, b = r ? X(p, h, -h) : p, D = r ? X(T, u, -u) : T;
    return v(this.transform, {
      translateX: b,
      translateY: D
    }), this.emit("zoom", this, this.transform.scale), this;
  },
  move(n) {
    const { options: { bounds: t }, transform: { translateX: e, translateY: s } } = this, { x: i, y: c } = n, { width: r, height: l } = this.getImageDiff();
    if ($(i)) {
      const o = e + i, a = t ? X(o, r, -r) : o;
      this.transform.translateX = a;
    }
    if ($(c)) {
      const o = s + c, a = t ? X(o, l, -l) : o;
      this.transform.translateY = a;
    }
    return this;
  },
  moveTo(n) {
    const { options: { bounds: t } } = this, { x: e, y: s } = n, { width: i, height: c } = this.getImageDiff();
    if ($(e)) {
      const r = Number(e), l = t ? X(r, i, -i) : r;
      this.transform.translateX = l;
    }
    if (te.some((r) => r === e)) {
      const l = {
        left: -i,
        right: i,
        center: 0
      }[e];
      this.transform.translateX = l;
    }
    if ($(s)) {
      const r = Number(s), l = t ? X(r, c, -c) : r;
      this.transform.translateY = l;
    }
    if (ee.some((r) => r === s)) {
      const l = {
        top: -c,
        bottom: c,
        center: 0
      }[s];
      this.transform.translateY = l;
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
    return n && n.value !== void 0 ? n.value : null;
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
var V, wt, W, Yt, U, Xt, B, zt, k, Rt, j, Dt, G, Lt, P, yt, F, At, q, It, K, $t, J, Ct;
class me {
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
    const r = t.querySelector(`.${Et}`), l = t.querySelector(`.${it}`);
    if (!r)
      return nt(`${_} needs a ".${Et}" element.`);
    if (!l)
      return nt(`${_} needs a ".${it}" element.`);
    this.options.minScale = e && s < 1 ? 1 : s, this.options.maxScale = Math.max(i, s), this.options.initScale = X(c || s, s, i), this.wrapper = r, this.image = l, S(this, V, wt).call(this);
  }
  // destory modules
  destroyModules() {
    const { slider: t, zoomer: e } = this.__modules__;
    t && this.destroySlider(), e && this.destroyZoomer();
  }
  // destroy slider
  destroySlider() {
    var c, r;
    const { __modules__: { slider: t } } = this;
    if (!t || !t.mounted)
      return;
    const { options: { el: e }, controller: s } = t;
    e === `.${I}` ? (c = t.sliderEl) == null || c.remove() : (r = t.sliderTrack) == null || r.remove(), s == null || s.abort(), t.mounted = !1;
  }
  // destroy zoomer
  destroyZoomer() {
    const { __modules__: { zoomer: t } } = this;
    if (!t || !t.mounted)
      return;
    const { options: { el: e, inEl: s, outEl: i, resetEl: c }, controller: r, zoomerEl: l, zoomerInEl: o, zoomerOutEl: a, zoomerResetEl: d } = t, f = (m, h, u) => {
      m === `.${h}` && (u == null || u.remove());
    };
    [
      { target: e, className: Z, el: l },
      { target: s, className: ot, el: o },
      { target: i, className: rt, el: a },
      { target: c, className: at, el: d }
    ].forEach((m) => f(m.target, m.className, m.el)), r == null || r.abort(), t.mounted = !1;
  }
}
V = new WeakSet(), wt = function() {
  const { element: t, image: e, options: s } = this, { draggable: i, pinchable: c } = s, { offsetWidth: r, offsetHeight: l } = t, { offsetWidth: o, offsetHeight: a } = e, { width: d, height: f } = Y(e);
  if (!o || !a)
    return nt(`The width or height of ${it} should not be 0.`);
  if (this.transform = {
    scale: 0,
    translateX: 0,
    translateY: 0
  }, this.data = {
    imageData: {
      originWidth: o,
      originHeight: a,
      width: d,
      height: f
    },
    containerData: {
      width: r,
      height: l
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
  }), this.__events__ = { ...ae }, s.on)
    for (const [m, h] of Object.entries(s.on))
      this.__events__[m] = [h];
  if (this.__modules__ = { ...le }, s.slider) {
    const m = s.slider === !0 ? ie : s.slider;
    this.__modules__.slider = {
      options: Object.assign({}, ne, m)
    };
  }
  if (s.zoomer) {
    const m = s.zoomer === !0 ? re : s.zoomer;
    this.__modules__.zoomer = {
      options: Object.assign({}, oe, m)
    };
  }
  this.controller = new AbortController(), S(this, W, Yt).call(this);
}, W = new WeakSet(), Yt = function() {
  if (this.mounted)
    return;
  const { element: t, image: e, options: { minScale: s, maxScale: i, initScale: c }, __modules__: { slider: r, zoomer: l } } = this, o = this;
  L(e, {
    transform: `
        translate(var(${vt}, 0px), var(${Tt}, 0px))
        scale(var(${St}, 0))`
  }), N(this.transform, "scale", {
    get() {
      return o.transform.__scale__;
    },
    set(a) {
      const d = o.useFixedRatio(a);
      if (!(st(d) || o.transform.__scale__ === d)) {
        if (o.transform.__scale__ = d, L(e, { [St]: d.toString() }), v(o.data.imageData, {
          width: Y(e).width,
          height: Y(e).height
        }), r) {
          const f = Math.round(o.getScaleRatio() * 100);
          r.value = f;
        }
        if (l && l.options.disabledClass) {
          const { zoomerInEl: f, zoomerOutEl: m, zoomerResetEl: h, options: { disabledClass: u } } = l;
          f && (f.classList[d === i ? "add" : "remove"](u), A(f, { "aria-disabled": d === i ? "true" : "false" })), m && (m.classList[d === s ? "add" : "remove"](u), A(m, { "aria-disabled": d === s ? "true" : "false" })), h && (h.classList[d === c ? "add" : "remove"](u), A(h, { "aria-disabled": d === c ? "true" : "false" }));
        }
      }
    }
  }), N(this.transform, "translateX", {
    get() {
      return o.transform.__translateX__;
    },
    set(a) {
      const d = R(a);
      st(d) || o.transform.__translateX__ === d || (o.transform.__translateX__ = d, L(e, { [vt]: `${d}px` }));
    }
  }), N(this.transform, "translateY", {
    get() {
      return o.transform.__translateY__;
    },
    set(a) {
      const d = R(a);
      st(d) || o.transform.__translateY__ === d || (o.transform.__translateY__ = d, L(e, { [Tt]: `${d}px` }));
    }
  }), S(this, U, Xt).call(this), S(this, P, yt).call(this), v(this.transform, {
    scale: c,
    translateX: 0,
    translateY: 0
  }), t.classList.add(Vt), this.mounted = !0, this.emit("ready", this);
}, U = new WeakSet(), Xt = function() {
  const { wrapper: t, options: e, controller: { signal: s } } = this, { draggable: i, pinchable: c, wheelable: r } = e;
  if (this.states = {}, r) {
    this.states.wheeling = !1;
    const l = (o) => S(this, B, zt).call(this, o);
    t.addEventListener(Qt, l, { signal: s });
  }
  if (z && (i || c)) {
    i && (this.states.dragging = !1), c && (this.states.pinching = !1);
    const l = (o) => S(this, j, Dt).call(this, o);
    t.addEventListener("touchstart", l, { signal: s });
  }
  if (!z && i) {
    this.states.dragging = !1;
    const l = (o) => S(this, k, Rt).call(this, o);
    t.addEventListener("mousedown", l, { signal: s });
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
  const r = (a) => {
    a && a.button !== 0 || (v(i, {
      startX: w(a).clientX,
      startY: w(a).clientY
    }), this.states.dragging = !0, this.emit("dragStart", this, { x: s.translateX, y: s.translateY }, a), document.addEventListener(M, l), document.addEventListener(x, o));
  }, l = (a) => {
    if (a.touches || !this.states.dragging)
      return;
    const d = w(a).clientX, f = w(a).clientY, m = d - i.startX + s.translateX, h = f - i.startY + s.translateY;
    this.moveTo({ x: m, y: h }), v(i, {
      startX: w(a).clientX,
      startY: w(a).clientY
    }), this.emit("drag", this, { x: m, y: h }, a);
  }, o = (a) => {
    a.touches || (this.states.dragging = !1, this.emit("dragEnd", this, { x: s.translateX, y: s.translateY }, a), document.removeEventListener(M, l), document.removeEventListener(x, o));
  };
  r(t);
}, j = new WeakSet(), Dt = function(t) {
  const { data: e, transform: s, options: { maxScale: i, minScale: c, draggable: r, pinchable: l } } = this, { touchData: o, imageData: a } = e;
  if (!o || !a)
    return;
  const d = (h) => {
    const u = h.touches;
    if (!u)
      return;
    const { top: g, left: p } = Y(this.image), { width: T, height: b } = this.getImageDiff();
    v(o, {
      hypot: _t(u),
      startX: C(u).clientX,
      startY: C(u).clientY,
      prevX: 0,
      prevY: 0,
      imageTop: g,
      imageLeft: p,
      widthDiff: T,
      heightDiff: b
    }), r && (this.states.dragging = !0, this.emit("dragStart", this, { x: s.translateX, y: s.translateY }, h)), l && u.length === 2 && (this.states.pinching = !0, this.emit("pinchStart", this, s.scale, h)), document.addEventListener("touchmove", f), document.addEventListener("touchend", m);
  }, f = (h) => {
    const u = h.touches;
    if (!u)
      return;
    const { states: { dragging: g, pinching: p } } = this, { top: T, left: b } = Y(this.image), { width: D, height: ht } = this.getImageDiff(), Q = _t(u), dt = Q ? Q / o.hypot : 1, tt = this.useFixedRatio(dt * s.scale), ut = C(u).clientX + o.prevX, mt = C(u).clientY + o.prevY;
    if (p && u.length === 2 && this.zoomTo(tt, !1), g) {
      const ft = tt !== i && tt !== c && l ? dt : 1, Mt = R(ut - o.imageLeft - (D - o.widthDiff) - (o.startX - o.imageLeft) * ft + s.translateX), xt = R(mt - o.imageTop - (ht - o.heightDiff) - (o.startY - o.imageTop) * ft + s.translateY);
      this.moveTo({ x: Mt, y: xt });
    }
    v(o, {
      hypot: Q,
      startX: ut,
      startY: mt,
      imageTop: T,
      imageLeft: b,
      widthDiff: D,
      heightDiff: ht
    }), p && u.length === 2 && this.emit("pinch", this, s.scale, h), g && this.emit("drag", this, { x: s.translateX, y: s.translateY }, h);
  }, m = (h) => {
    const u = h.touches;
    if (!u)
      return;
    const { states: { dragging: g, pinching: p } } = this;
    if (g && !u.length && (this.states.dragging = !1, this.emit("dragEnd", this, { x: s.translateX, y: s.translateY }, h)), p && u.length < 2 && (this.states.pinching = !1, this.emit("pinchEnd", this, s.scale, h)), g && u.length === 1) {
      const T = w(h).clientX, b = w(h).clientY;
      v(o, {
        prevX: o.startX - T,
        prevY: o.startY - b
      });
    }
    u.length || (document.removeEventListener("touchmove", f), document.removeEventListener("touchend", m));
  };
  d(t);
}, G = new WeakSet(), Lt = function() {
  const { element: t, image: e, transform: s } = this;
  new ResizeObserver(() => {
    const { offsetWidth: c, offsetHeight: r } = t, { width: l, height: o } = this.getContainerData();
    if (c === l && r === o)
      return;
    const a = s.translateX, d = s.translateY;
    if (a) {
      const g = c / l * a;
      this.transform.translateX = g;
    }
    if (d) {
      const g = r / o * d;
      this.transform.translateY = g;
    }
    const { offsetWidth: f, offsetHeight: m } = e, { width: h, height: u } = Y(e);
    v(this.data.containerData, {
      width: c,
      height: r
    }), v(this.data.imageData, {
      originWidth: f,
      originHeight: m,
      width: h,
      height: u
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
  const r = c ? y("div", I) : H(s), l = y("div", Wt), o = y("span", Ut), a = y("span", Bt, { ...Gt, "aria-orientation": i });
  r.classList.add(`${I}-${i}`), N(e, "value", {
    get() {
      return e.__value__;
    },
    set(d) {
      e.__value__ !== d && (e.__value__ = d, L(r, { [se]: d.toString() }), A(a, { "aria-valuenow": d.toString() }));
    }
  }), v(e, {
    value: this.getScaleRatio() * 100,
    controller: new AbortController(),
    sliding: !1,
    sliderEl: r,
    sliderTrack: l,
    sliderButton: a
  }), S(this, q, It).call(this), l.append(o, a), r.append(l), c && t.append(r), e.mounted = !0;
}, q = new WeakSet(), It = function() {
  const { options: { minScale: t, maxScale: e }, __modules__: { slider: s } } = this;
  if (!s)
    return;
  const { options: { direction: i }, controller: c, sliderEl: r, sliderTrack: l } = s;
  if (!r || !l)
    return;
  const o = i === "vertical", a = (h) => {
    const u = Y(l), g = u[o ? "height" : "width"], p = u[o ? "bottom" : "left"], T = w(h)[o ? "clientY" : "clientX"], b = R(X((T - p) * (o ? -1 : 1) / g, 0, 1));
    return (e - t) * b + t;
  }, d = (h) => {
    if (h instanceof MouseEvent && h.button !== 0)
      return;
    s.sliding = !0;
    const u = a(h);
    this.zoomTo(u), this.emit("slideStart", this, this.getSliderValue(), h), document.addEventListener(M, f), document.addEventListener(x, m);
  }, f = (h) => {
    if (!s.sliding)
      return;
    const u = a(h);
    this.zoomTo(u), this.emit("slide", this, this.getSliderValue(), h);
  }, m = (h) => {
    this.emit("slideEnd", this, this.getSliderValue(), h), s.sliding = !1, document.removeEventListener(M, f), document.removeEventListener(x, m);
  };
  r.addEventListener(Jt, d, { signal: c == null ? void 0 : c.signal });
}, K = new WeakSet(), $t = function() {
  const { element: t, __modules__: { zoomer: e } } = this;
  if (!e || e.mounted)
    return;
  const { options: { el: s, inEl: i, outEl: c, resetEl: r } } = e, l = [i, c, r], o = (h, u, g, p, T) => {
    const b = h === `.${g}`;
    return !h || !b && !et(h) ? null : (g = l.includes(h) ? `${g} ${kt}` : g, b ? y(u, g, p, T) : H(h));
  }, a = o(s, "div", Z), d = o(i, "button", ot, Pt, ce), f = o(c, "button", rt, Ft, he), m = o(r, "button", at, qt, de);
  v(e, {
    controller: new AbortController(),
    zoomerEl: a,
    zoomerInEl: d,
    zoomerOutEl: f,
    zoomerResetEl: m
  }), a && (d && a.append(d), f && a.append(f), m && a.append(m), s === `.${Z}` && t.append(a)), S(this, J, Ct).call(this), e.mounted = !0;
}, J = new WeakSet(), Ct = function() {
  const { options: { zoomRatio: t }, __modules__: { zoomer: e } } = this, s = this;
  if (!e)
    return;
  const { controller: i, zoomerInEl: c, zoomerOutEl: r, zoomerResetEl: l } = e;
  c && c.addEventListener("click", () => {
    s.zoom(t);
  }, { signal: i == null ? void 0 : i.signal }), r && r.addEventListener("click", () => {
    s.zoom(-t);
  }, { signal: i == null ? void 0 : i.signal }), l && l.addEventListener("click", () => {
    s.reset();
  }, { signal: i == null ? void 0 : i.signal });
};
Object.assign(me.prototype, ue);
export {
  me as default
};

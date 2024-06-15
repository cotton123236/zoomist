import { Zoomist } from './core/core';
export interface ZoomistHTMLElement extends HTMLElement {
    zoomist: Zoomist | null;
}
export interface ZoomistDefaultOptions {
    draggable: boolean;
    wheelable: boolean;
    pinchable: boolean;
    bounds: boolean;
    zoomRatio: number;
    minScale: number;
    maxScale: number;
    initScale: number | null;
    dragReleaseOnBounds: boolean;
    wheelReleaseOnMinMax: boolean;
    disableDraggingClass: string;
    disableWheelingClass: string;
    slider?: boolean | SliderOptions;
    zoomer?: boolean | ZoomerOptions;
    on?: {
        [event in EventTypes]?: EventOptions[event];
    };
}
export type ZoomistOptions = Partial<ZoomistDefaultOptions>;
export interface SliderOptions {
    el: string | HTMLElement | null;
    direction: 'horizontal' | 'vertical';
}
export interface ZoomerOptions {
    el: string | HTMLElement | null;
    inEl: string | HTMLElement | null;
    outEl: string | HTMLElement | null;
    resetEl: string | HTMLElement | null;
    disabledClass: string | false | null;
}
export interface EventOptions {
    drag: (zoomist: Zoomist, transform: {
        x: number;
        y: number;
    }, event: Event) => void;
    dragStart: (zoomist: Zoomist, transform: {
        x: number;
        y: number;
    }, event: Event) => void;
    dragEnd: (zoomist: Zoomist, transform: {
        x: number;
        y: number;
    }, event: Event) => void;
    pinch: (zoomist: Zoomist, scale: number, event: Event) => void;
    pinchStart: (zoomist: Zoomist, scale: number, event: Event) => void;
    pinchEnd: (zoomist: Zoomist, scale: number, event: Event) => void;
    slide: (zoomist: Zoomist, value: number, event: Event) => void;
    slideStart: (zoomist: Zoomist, value: number, event: Event) => void;
    slideEnd: (zoomist: Zoomist, value: number, event: Event) => void;
    wheel: (zoomist: Zoomist, scale: number, event: WheelEvent) => void;
    zoom: (zoomist: Zoomist, scale: number) => void;
    ready: (zoomist: Zoomist) => void;
    reset: (zoomist: Zoomist) => void;
    resize: (zoomist: Zoomist) => void;
    beforeDestroy: (zoomist: Zoomist) => void;
    destroy: (zoomist: Zoomist) => void;
    beforeUpdate: (zoomist: Zoomist) => void;
    update: (zoomist: Zoomist) => void;
}
export type EventTypes = keyof EventOptions;
export type ZoomistEvents = {
    [event in EventTypes]: EventOptions[event][] | null;
};
export interface ZoomistMethods {
    on: <T extends EventTypes>(event: T, handler: EventOptions[T]) => Zoomist;
    emit: <T extends EventTypes>(event: T, ...args: Parameters<EventOptions[T]>) => Zoomist;
    zoom: (ratio: number, pointer?: {
        clientX: number;
        clientY: number;
    } | boolean) => Zoomist;
    zoomTo: (ratio: number, pointer?: {
        clientX: number;
        clientY: number;
    } | boolean) => Zoomist;
    move: (params: {
        x: number;
        y: number;
    }) => Zoomist;
    moveTo: (params: MoveToParams) => Zoomist;
    slideTo: (value: number) => Zoomist;
    reset: () => Zoomist;
    destroy: (cleanStyle?: boolean) => null;
    update: (options?: ZoomistOptions) => Zoomist;
    getImageData: () => ImageData;
    getContainerData: () => ContainerData;
    getSliderValue: () => number | null;
    isOnBoundTop: () => boolean;
    isOnBoundBottom: () => boolean;
    isOnBoundLeft: () => boolean;
    isOnBoundRight: () => boolean;
    isOnBoundX: () => boolean;
    isOnBoundY: () => boolean;
    isOnMinScale: () => boolean;
    isOnMaxScale: () => boolean;
    getImageDiff: () => {
        width: number;
        height: number;
    };
    getContainerCenterClient: () => {
        clientX: number;
        clientY: number;
    };
    getScaleRatio: () => number;
    useFixedRatio: (ratio: number) => number;
}
export interface ZoomistSlider {
    options: SliderOptions;
    mounted?: boolean;
    value?: number;
    sliding?: boolean;
    sliderEl?: HTMLElement | null;
    sliderTrack?: HTMLElement;
    sliderButton?: HTMLElement;
    controller?: AbortController;
    __value__?: number;
}
export interface ZoomistZoomer {
    options: ZoomerOptions;
    mounted?: boolean;
    zoomerEl?: HTMLElement | null;
    zoomerInEl?: HTMLElement | null;
    zoomerOutEl?: HTMLElement | null;
    zoomerResetEl?: HTMLElement | null;
    controller?: AbortController;
}
export interface ZoomistModules {
    slider: ZoomistSlider | null;
    zoomer: ZoomistZoomer | null;
}
export interface ZoomistTransfrom {
    scale: number;
    translateX: number;
    translateY: number;
    __scale__?: number;
    __translateX__?: number;
    __translateY__?: number;
}
export interface ZoomistStates {
    dragging?: boolean;
    pinching?: boolean;
    wheeling?: boolean;
}
export type ConstEventTouchStart = 'touchstart' | 'mousedown';
export type ConstEventTouchMove = 'touchmove' | 'mousemove';
export type ConstEventTouchEnd = 'touchend' | 'mouseup';
export type ConstEventWheel = 'wheel';
export interface ImageData {
    originWidth: number;
    originHeight: number;
    width: number;
    height: number;
}
export interface ContainerData {
    width: number;
    height: number;
}
export interface DragData {
    startX: number;
    startY: number;
}
export interface touchData {
    hypot: number;
    startX: number;
    startY: number;
    prevX: number;
    prevY: number;
    imageTop: number;
    imageLeft: number;
    widthDiff: number;
    heightDiff: number;
}
export interface ZoomistData {
    imageData: ImageData;
    containerData: ContainerData;
    dragData?: DragData;
    touchData?: touchData;
}
export interface StyleObject {
    [key: string]: string;
}
export interface BoundingRect {
    width: number;
    height: number;
    top: number;
    left: number;
    bottom: number;
}
export interface PointerData {
    clientX: number;
    clientY: number;
}
export type MoveToKeywordsX = 'left' | 'right' | 'center';
export type MoveToKeywordsY = 'top' | 'bottom' | 'center';
export interface MoveToParams {
    x?: number | MoveToKeywordsX;
    y?: number | MoveToKeywordsY;
}
export type AppTouchEvent = TouchEvent;

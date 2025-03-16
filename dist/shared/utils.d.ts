import { StyleObject, PointerData, BoundingRect, AppTouchEvent } from './../types';

export declare const isPlainObject: (value: unknown) => boolean;
export declare const isFunction: (value: any) => boolean;
export declare const isNumber: (value: any) => boolean;
export declare const isNull: (value: any) => boolean;
export declare const getElement: (value: HTMLElement | string) => HTMLElement | null;
export declare const getClosestElement: (target: HTMLElement, className: string) => HTMLElement | null;
export declare const getPointer: (e: MouseEvent | AppTouchEvent) => PointerData;
export declare const getBoundingRect: (target: HTMLElement) => BoundingRect;
export declare const getPinchHypot: (e: AppTouchEvent) => number;
export declare const setStyle: (element: HTMLElement, value: StyleObject) => void;
export declare const setAttributes: (element: HTMLElement, value: Record<string, string>) => void;
export declare const setObject: <T, K extends keyof T>(obj: T, value: Pick<T, K>) => void;
export declare const minmax: (value: number, min: number, max: number) => number;
export declare const roundToTwo: (value: number) => number;
export declare const useError: (msg: string) => never;
export declare const useWarn: (msg: string) => void;
export declare const createElement: (tagName?: string, className?: string, attributes?: Record<string, string>, children?: string) => HTMLElement;

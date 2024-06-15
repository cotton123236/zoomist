import { ZoomistOptions, ZoomistDefaultOptions, ZoomistData, ZoomistEvents, ZoomistMethods, ZoomistStates, ZoomistModules, ZoomistTransfrom } from '../types';
interface Zoomist extends ZoomistMethods {
}
declare class Zoomist {
    #private;
    element: HTMLElement;
    options: ZoomistDefaultOptions;
    wrapper: HTMLElement;
    image: HTMLElement;
    mounted: boolean;
    data: ZoomistData;
    transform: ZoomistTransfrom;
    states: ZoomistStates;
    controller: AbortController;
    __events__: ZoomistEvents;
    __modules__: ZoomistModules;
    constructor(element: HTMLElement | string, options?: ZoomistOptions);
    init(): void;
    destroyModules(): void;
    destroySlider(): void;
    destroyZoomer(): void;
}
export { Zoomist };

import { QueryElement, ZoomistOptions, ZoomistData, ZoomistEvents, ZoomistMethods, ZoomistStates, ZoomistModules, ZoomistTransfrom } from '../types';
interface Zoomist extends ZoomistMethods {
}
declare class Zoomist {
    #private;
    element: HTMLElement;
    options: ZoomistOptions;
    wrapper: HTMLElement;
    image: HTMLElement;
    mounted: boolean;
    data: ZoomistData;
    transform: ZoomistTransfrom;
    states: ZoomistStates;
    controller: AbortController;
    __events__: ZoomistEvents;
    __modules__: ZoomistModules;
    constructor(element: QueryElement, options: Partial<ZoomistOptions>);
    init(): void;
    destroyModules(): void;
    destroySlider(): void;
    destroyZoomer(): void;
}
export default Zoomist;

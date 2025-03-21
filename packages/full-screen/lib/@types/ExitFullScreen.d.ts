import { type Store } from '@react-pdf-viewer/core';
import * as React from 'react';
import { type StoreProps } from './types/StoreProps';
export interface RenderExitFullScreenProps {
    onClick(): void;
}
type RenderExitFullScreen = (props: RenderExitFullScreenProps) => React.ReactElement;
export interface ExitFullScreenProps {
    children?: RenderExitFullScreen;
}
export declare const ExitFullScreen: React.FC<{
    children?: RenderExitFullScreen;
    getFullScreenTarget(pagesContainer: HTMLElement): HTMLElement;
    store: Store<StoreProps>;
}>;
export {};

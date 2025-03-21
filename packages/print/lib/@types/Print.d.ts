import { type Store } from '@react-pdf-viewer/core';
import * as React from 'react';
import { type RenderPrintProps } from './types/RenderPrintProps';
import { type StoreProps } from './types/StoreProps';
type RenderPrint = (props: RenderPrintProps) => React.ReactElement;
export interface PrintProps {
    children?: RenderPrint;
}
export declare const Print: React.FC<{
    children?: RenderPrint;
    enableShortcuts: boolean;
    store: Store<StoreProps>;
}>;
export {};

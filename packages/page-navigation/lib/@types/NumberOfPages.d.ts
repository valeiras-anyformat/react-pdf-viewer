import { type Store } from '@react-pdf-viewer/core';
import * as React from 'react';
import { type StoreProps } from './types/StoreProps';
export interface RenderNumberOfPagesProps {
    numberOfPages: number;
}
export type RenderNumberOfPages = (props: RenderNumberOfPagesProps) => React.ReactElement;
export interface NumberOfPagesProps {
    children?: RenderNumberOfPages;
}
export declare const NumberOfPages: React.FC<{
    children?: RenderNumberOfPages;
    store: Store<StoreProps>;
}>;

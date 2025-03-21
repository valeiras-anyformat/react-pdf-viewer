import { type Store } from '@react-pdf-viewer/core';
import * as React from 'react';
import { type StoreProps } from './types/StoreProps';
export interface RenderCurrentPageLabelProps {
    currentPage: number;
    numberOfPages: number;
    pageLabel: string;
}
type RenderCurrentPageLabel = (props: RenderCurrentPageLabelProps) => React.ReactElement;
export interface CurrentPageLabelProps {
    children?: RenderCurrentPageLabel;
}
export declare const CurrentPageLabel: React.FC<{
    children?: RenderCurrentPageLabel;
    store: Store<StoreProps>;
}>;
export {};

import { type Store } from '@react-pdf-viewer/core';
import * as React from 'react';
import { type RenderRotatePageProps } from './types/RenderRotatePageProps';
import { type StoreProps } from './types/StoreProps';
type RenderRotatePage = (props: RenderRotatePageProps) => React.ReactElement;
export interface RotatePageProps {
    children: RenderRotatePage;
}
export declare const RotatePage: React.FC<{
    children: RenderRotatePage;
    store: Store<StoreProps>;
}>;
export {};

import { RotateDirection, type Store } from '@react-pdf-viewer/core';
import * as React from 'react';
import { type RenderRotateProps } from './types/RenderRotateProps';
import { type StoreProps } from './types/StoreProps';
type RenderRotate = (props: RenderRotateProps) => React.ReactElement;
export interface RotateProps {
    children?: RenderRotate;
    direction: RotateDirection;
}
export declare const Rotate: React.FC<{
    children?: RenderRotate;
    direction: RotateDirection;
    store: Store<StoreProps>;
}>;
export {};

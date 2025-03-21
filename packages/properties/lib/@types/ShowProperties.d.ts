import { type Store } from '@react-pdf-viewer/core';
import * as React from 'react';
import { type RenderShowPropertiesProps } from './types/RenderShowPropertiesProps';
import { type StoreProps } from './types/StoreProps';
type RenderShowProperties = (props: RenderShowPropertiesProps) => React.ReactElement;
export interface ShowPropertiesProps {
    children?: RenderShowProperties;
}
export declare const ShowProperties: React.FC<{
    children?: RenderShowProperties;
    store: Store<StoreProps>;
}>;
export {};

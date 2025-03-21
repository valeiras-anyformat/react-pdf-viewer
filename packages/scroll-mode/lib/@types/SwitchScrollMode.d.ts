import { ScrollMode, type Store } from '@react-pdf-viewer/core';
import * as React from 'react';
import { type RenderSwitchScrollModeProps } from './types/RenderSwitchScrollModeProps';
import { type StoreProps } from './types/StoreProps';
type RenderSwitchScrollMode = (props: RenderSwitchScrollModeProps) => React.ReactElement;
export interface SwitchScrollModeProps {
    children?: RenderSwitchScrollMode;
    mode: ScrollMode;
    store?: Store<StoreProps>;
}
export declare const SwitchScrollMode: ({ children, mode, store }: SwitchScrollModeProps) => React.ReactElement;
export {};

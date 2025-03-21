import { type Store } from '@react-pdf-viewer/core';
import * as React from 'react';
import { SelectionMode } from './structs/SelectionMode';
import { type RenderSwitchSelectionModeProps } from './types/RenderSwitchSelectionModeProps';
import { type StoreProps } from './types/StoreProps';
type RenderSwitchSelectionMode = (props: RenderSwitchSelectionModeProps) => React.ReactElement;
export interface SwitchSelectionModeProps {
    children?: RenderSwitchSelectionMode;
    mode: SelectionMode;
}
export declare const SwitchSelectionMode: React.FC<{
    children?: RenderSwitchSelectionMode;
    mode: SelectionMode;
    store: Store<StoreProps>;
}>;
export {};

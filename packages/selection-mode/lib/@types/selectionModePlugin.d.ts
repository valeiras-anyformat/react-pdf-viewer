import { type Plugin } from '@react-pdf-viewer/core';
import * as React from 'react';
import { SwitchSelectionModeProps } from './SwitchSelectionMode';
import { SelectionMode } from './structs/SelectionMode';
export interface SwitchSelectionModeButtonProps {
    mode: SelectionMode;
}
export interface SwitchSelectionModeMenuItemProps {
    mode: SelectionMode;
    onClick(): void;
}
export interface SelectionModePlugin extends Plugin {
    SwitchSelectionMode(props: SwitchSelectionModeProps): React.ReactElement;
    SwitchSelectionModeButton(props: SwitchSelectionModeButtonProps): React.ReactElement;
    SwitchSelectionModeMenuItem(props: SwitchSelectionModeMenuItemProps): React.ReactElement;
}
export interface SelectionModePluginProps {
    selectionMode?: SelectionMode;
}
export declare const selectionModePlugin: (props?: SelectionModePluginProps) => SelectionModePlugin;

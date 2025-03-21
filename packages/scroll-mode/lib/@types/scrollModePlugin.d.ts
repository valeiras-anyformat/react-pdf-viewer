import { ScrollMode, ViewMode, type Plugin } from '@react-pdf-viewer/core';
import * as React from 'react';
import { SwitchScrollModeProps } from './SwitchScrollMode';
import { SwitchViewModeProps } from './SwitchViewMode';
export interface SwitchScrollModeButtonProps {
    mode: ScrollMode;
}
export interface SwitchScrollModeMenuItemProps {
    mode: ScrollMode;
    onClick(): void;
}
export interface SwitchViewModeButtonProps {
    mode: ViewMode;
}
export interface SwitchViewModeMenuItemProps {
    mode: ViewMode;
    onClick(): void;
}
export interface ScrollModePlugin extends Plugin {
    switchScrollMode(mode: ScrollMode): void;
    SwitchScrollMode(props: SwitchScrollModeProps): React.ReactElement;
    SwitchScrollModeButton(props: SwitchScrollModeButtonProps): React.ReactElement;
    SwitchScrollModeMenuItem(props: SwitchScrollModeMenuItemProps): React.ReactElement;
    switchViewMode(mode: ViewMode): void;
    SwitchViewMode(props: SwitchViewModeProps): React.ReactElement;
    SwitchViewModeButton(props: SwitchViewModeButtonProps): React.ReactElement;
    SwitchViewModeMenuItem(props: SwitchViewModeMenuItemProps): React.ReactElement;
}
export declare const scrollModePlugin: () => ScrollModePlugin;

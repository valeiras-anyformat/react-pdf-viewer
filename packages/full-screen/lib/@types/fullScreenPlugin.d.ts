import { type Plugin } from '@react-pdf-viewer/core';
import * as React from 'react';
import { EnterFullScreenProps } from './EnterFullScreen';
import { EnterFullScreenMenuItemProps } from './EnterFullScreenMenuItem';
import { RenderExitFullScreenProps } from './ExitFullScreen';
import { type Zoom } from './types/Zoom';
export interface FullScreenPlugin extends Plugin {
    EnterFullScreen: (props: EnterFullScreenProps) => React.ReactElement;
    EnterFullScreenButton: () => React.ReactElement;
    EnterFullScreenMenuItem: (props: EnterFullScreenMenuItemProps) => React.ReactElement;
}
export interface FullScreenPluginProps {
    enableShortcuts?: boolean;
    getFullScreenTarget?(pagesContainer: HTMLElement): HTMLElement;
    renderExitFullScreenButton?: (props: RenderExitFullScreenProps) => React.ReactElement;
    onEnterFullScreen?(zoom: Zoom): void;
    onExitFullScreen?(zoom: Zoom): void;
}
export declare const fullScreenPlugin: (props?: FullScreenPluginProps) => FullScreenPlugin;

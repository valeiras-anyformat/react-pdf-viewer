import { SpecialZoomLevel, type Plugin } from '@react-pdf-viewer/core';
import * as React from 'react';
import { CurrentScaleProps } from './CurrentScale';
import { ZoomProps } from './Zoom';
import { ZoomInProps } from './ZoomIn';
import { ZoomOutProps } from './ZoomOut';
import { type ZoomMenuItemProps } from './types/ZoomMenuItemProps';
export interface ZoomPopoverProps {
    levels?: number[];
}
export interface ZoomPlugin extends Plugin {
    zoomTo: (scale: number | SpecialZoomLevel) => void;
    CurrentScale: (props: CurrentScaleProps) => React.ReactElement;
    ZoomIn: (props: ZoomInProps) => React.ReactElement;
    ZoomInButton: () => React.ReactElement;
    ZoomInMenuItem: (props: ZoomMenuItemProps) => React.ReactElement;
    ZoomOut: (props: ZoomOutProps) => React.ReactElement;
    ZoomOutButton: () => React.ReactElement;
    ZoomOutMenuItem: (props: ZoomMenuItemProps) => React.ReactElement;
    Zoom: (props: ZoomProps) => React.ReactElement;
    ZoomPopover: (props?: ZoomPopoverProps) => React.ReactElement;
}
export interface ZoomPluginProps {
    enableShortcuts?: boolean;
}
export declare const zoomPlugin: (props?: ZoomPluginProps) => ZoomPlugin;

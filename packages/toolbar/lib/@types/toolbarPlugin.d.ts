import { type Plugin } from '@react-pdf-viewer/core';
import { type FullScreenPlugin, type FullScreenPluginProps } from '@react-pdf-viewer/full-screen';
import { type GetFilePlugin, type GetFilePluginProps } from '@react-pdf-viewer/get-file';
import { type OpenPlugin, type OpenPluginProps } from '@react-pdf-viewer/open';
import { type PageNavigationPlugin, type PageNavigationPluginProps } from '@react-pdf-viewer/page-navigation';
import { type PrintPlugin, type PrintPluginProps } from '@react-pdf-viewer/print';
import { type PropertiesPlugin } from '@react-pdf-viewer/properties';
import { type RotatePlugin } from '@react-pdf-viewer/rotate';
import { type ScrollModePlugin } from '@react-pdf-viewer/scroll-mode';
import { type SearchPlugin, type SearchPluginProps } from '@react-pdf-viewer/search';
import { type SelectionModePlugin, type SelectionModePluginProps } from '@react-pdf-viewer/selection-mode';
import { type ThemePlugin } from '@react-pdf-viewer/theme';
import { type ZoomPlugin, type ZoomPluginProps } from '@react-pdf-viewer/zoom';
import * as React from 'react';
import { ToolbarProps } from './Toolbar';
import { type ToolbarSlot } from './types/ToolbarSlot';
import { type TransformToolbarSlot } from './types/TransformToolbarSlot';
export interface ToolbarPlugin extends Plugin {
    renderDefaultToolbar: (transformToolbarSlot: TransformToolbarSlot) => (defaultToolbarSlot: ToolbarSlot) => React.ReactElement;
    Toolbar: (props: ToolbarProps) => React.ReactElement;
    readonly fullScreenPluginInstance: FullScreenPlugin;
    readonly getFilePluginInstance: GetFilePlugin;
    readonly openPluginInstance: OpenPlugin;
    readonly pageNavigationPluginInstance: PageNavigationPlugin;
    readonly printPluginInstance: PrintPlugin;
    readonly propertiesPluginInstance: PropertiesPlugin;
    readonly rotatePluginInstance: RotatePlugin;
    readonly scrollModePluginInstance: ScrollModePlugin;
    readonly searchPluginInstance: SearchPlugin;
    readonly selectionModePluginInstance: SelectionModePlugin;
    readonly themePluginInstance: ThemePlugin;
    readonly zoomPluginInstance: ZoomPlugin;
}
export interface ToolbarPluginProps {
    fullScreenPlugin?: FullScreenPluginProps;
    getFilePlugin?: GetFilePluginProps;
    openPlugin?: OpenPluginProps;
    pageNavigationPlugin?: PageNavigationPluginProps;
    printPlugin?: PrintPluginProps;
    searchPlugin?: SearchPluginProps;
    selectionModePlugin?: SelectionModePluginProps;
    zoomPlugin?: ZoomPluginProps;
}
export declare const toolbarPlugin: (props?: ToolbarPluginProps) => ToolbarPlugin;

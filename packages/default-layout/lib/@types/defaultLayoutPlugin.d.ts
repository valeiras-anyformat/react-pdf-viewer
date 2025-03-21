import { type AttachmentPlugin } from '@react-pdf-viewer/attachment';
import { type BookmarkPlugin } from '@react-pdf-viewer/bookmark';
import { type PdfJs, type Plugin } from '@react-pdf-viewer/core';
import { type ThumbnailPlugin, type ThumbnailPluginProps } from '@react-pdf-viewer/thumbnail';
import { type ToolbarPlugin, type ToolbarPluginProps, type ToolbarProps } from '@react-pdf-viewer/toolbar';
import * as React from 'react';
import { SidebarTab } from './Sidebar';
export interface DefaultLayoutPlugin extends Plugin {
    activateTab(index: number): void;
    toggleTab(index: number): void;
    readonly attachmentPluginInstance: AttachmentPlugin;
    readonly bookmarkPluginInstance: BookmarkPlugin;
    readonly thumbnailPluginInstance: ThumbnailPlugin;
    readonly toolbarPluginInstance: ToolbarPlugin;
}
export interface DefaultLayoutPluginProps {
    thumbnailPlugin?: ThumbnailPluginProps;
    toolbarPlugin?: ToolbarPluginProps;
    renderToolbar?: (Toolbar: (props: ToolbarProps) => React.ReactElement) => React.ReactElement;
    setInitialTab?: (doc: PdfJs.PdfDocument) => Promise<number>;
    sidebarTabs?: (defaultTabs: SidebarTab[]) => SidebarTab[];
}
export declare const defaultLayoutPlugin: (props?: DefaultLayoutPluginProps) => DefaultLayoutPlugin;

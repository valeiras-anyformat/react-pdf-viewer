import { type OpenFile, type Plugin } from '@react-pdf-viewer/core';
import * as React from 'react';
import { DownloadProps } from './Download';
import { DownloadMenuItemProps } from './DownloadMenuItem';
export interface GetFilePlugin extends Plugin {
    Download: (props: DownloadProps) => React.ReactElement;
    DownloadButton: () => React.ReactElement;
    DownloadMenuItem: (props: DownloadMenuItemProps) => React.ReactElement;
}
export interface GetFilePluginProps {
    fileNameGenerator?: (file: OpenFile) => string;
}
export declare const getFilePlugin: (props?: GetFilePluginProps) => GetFilePlugin;

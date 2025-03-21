import { type OpenFile, type Store } from '@react-pdf-viewer/core';
import * as React from 'react';
import { type RenderDownloadProps } from './types/RenderDownloadProps';
import { type StoreProps } from './types/StoreProps';
export type RenderDownload = (props: RenderDownloadProps) => React.ReactElement;
export interface DownloadProps {
    children?: RenderDownload;
}
export declare const Download: React.FC<{
    children?: RenderDownload;
    fileNameGenerator: (file: OpenFile) => string;
    store: Store<StoreProps>;
}>;

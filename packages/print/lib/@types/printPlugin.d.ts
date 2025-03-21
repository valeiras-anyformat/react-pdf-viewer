import { type PdfJs, type Plugin } from '@react-pdf-viewer/core';
import * as React from 'react';
import { PrintProps } from './Print';
import { PrintMenuItemProps } from './PrintMenuItem';
export interface PrintPlugin extends Plugin {
    print: () => void;
    setPages: (printPages: (doc: PdfJs.PdfDocument) => number[]) => void;
    Print: (props: PrintProps) => React.ReactElement;
    PrintButton: () => React.ReactElement;
    PrintMenuItem: (props: PrintMenuItemProps) => React.ReactElement;
}
export interface PrintPluginProps {
    enableShortcuts?: boolean;
    renderProgressBar?(numLoadedPages: number, numPages: number, onCancel: () => void): React.ReactElement;
    setPages?: (doc: PdfJs.PdfDocument) => number[];
}
export declare const printPlugin: (props?: PrintPluginProps) => PrintPlugin;

import { type Plugin } from '@react-pdf-viewer/core';
import * as React from 'react';
import { OpenProps } from './Open';
export interface OpenPlugin extends Plugin {
    Open: (props: OpenProps) => React.ReactElement;
    OpenButton: () => React.ReactElement;
    OpenMenuItem: () => React.ReactElement;
}
export interface OpenPluginProps {
    enableShortcuts?: boolean;
}
export declare const openPlugin: (props?: OpenPluginProps) => OpenPlugin;

import { type Plugin } from '@react-pdf-viewer/core';
import * as React from 'react';
import { RotateProps } from './Rotate';
import { RotatePageProps } from './RotatePage';
export interface RotateDecoratorProps {
    onClick(): void;
}
export interface RotatePlugin extends Plugin {
    Rotate(props: RotateProps): React.ReactElement;
    RotatePage(props: RotatePageProps): React.ReactElement;
    RotateBackwardButton(): React.ReactElement;
    RotateBackwardMenuItem(props: RotateDecoratorProps): React.ReactElement;
    RotateForwardButton(): React.ReactElement;
    RotateForwardMenuItem(props: RotateDecoratorProps): React.ReactElement;
}
export declare const rotatePlugin: () => RotatePlugin;

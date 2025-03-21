import { ViewMode } from '@react-pdf-viewer/core';
import * as React from 'react';
interface RenderChildren {
    icon: React.ReactElement;
    label: string;
    onClick(): void;
}
export declare const SwitchViewModeDecorator: React.FC<{
    children(props: RenderChildren): React.ReactElement;
    mode: ViewMode;
    onClick(): void;
}>;
export {};

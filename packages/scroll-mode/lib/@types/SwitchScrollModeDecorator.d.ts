import { ScrollMode } from '@react-pdf-viewer/core';
import * as React from 'react';
interface RenderChildren {
    icon: React.ReactElement;
    label: string;
    onClick(): void;
}
export declare const SwitchScrollModeDecorator: React.FC<{
    children(props: RenderChildren): React.ReactElement;
    mode: ScrollMode;
    onClick(): void;
}>;
export {};

import * as React from 'react';
import { SelectionMode } from './structs/SelectionMode';
interface RenderChildren {
    icon: React.ReactElement;
    label: string;
    onClick(): void;
}
export declare const SwitchSelectionModeDecorator: React.FC<{
    children(props: RenderChildren): React.ReactElement;
    mode: SelectionMode;
    onClick(): void;
}>;
export {};

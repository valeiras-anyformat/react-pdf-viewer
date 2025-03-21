import * as React from 'react';
import { type ToolbarSlot } from './types/ToolbarSlot';
export type RenderToolbarSlot = (toolbarSlot: ToolbarSlot) => React.ReactElement;
export interface ToolbarProps {
    children?: RenderToolbarSlot;
}
export declare const Toolbar: React.FC<{
    children?: RenderToolbarSlot;
    slot: ToolbarSlot;
}>;

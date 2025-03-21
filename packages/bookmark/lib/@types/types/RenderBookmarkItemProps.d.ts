import { type PdfJs } from '@react-pdf-viewer/core';
import * as React from 'react';
export interface RenderBookmarkItemProps {
    bookmark: PdfJs.Outline;
    defaultRenderItem: (onClickItem: () => void, children: React.ReactNode) => React.ReactElement;
    defaultRenderTitle: (onClickBookmark: () => void) => React.ReactElement;
    defaultRenderToggle: (expandIcon: React.ReactElement, collapseIcon: React.ReactElement) => React.ReactElement;
    depth: number;
    hasSubItems: boolean;
    index: number;
    isExpanded: boolean;
    path: string;
    onClickItem: () => void;
    onClickTitle: () => void;
    onToggleSubItems: () => void;
}
export type RenderBookmarkItem = (props: RenderBookmarkItemProps) => React.ReactElement;

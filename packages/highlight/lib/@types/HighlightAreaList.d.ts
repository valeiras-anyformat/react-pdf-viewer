import { type Store } from '@react-pdf-viewer/core';
import * as React from 'react';
import { type RenderHighlightContentProps } from './types/RenderHighlightContentProps';
import { type RenderHighlightTargetProps } from './types/RenderHighlightTargetProps';
import { type RenderHighlightsProps } from './types/RenderHighlightsProps';
import { type StoreProps } from './types/StoreProps';
export declare const HighlightAreaList: React.FC<{
    pageIndex: number;
    renderHighlightContent?(props: RenderHighlightContentProps): React.ReactElement;
    renderHighlightTarget?(props: RenderHighlightTargetProps): React.ReactElement;
    renderHighlights?(props: RenderHighlightsProps): React.ReactElement;
    store: Store<StoreProps>;
}>;

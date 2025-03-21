import { type Store } from '@react-pdf-viewer/core';
import * as React from 'react';
import { type OnHighlightKeyword } from './types/OnHighlightKeyword';
import { type RenderHighlightsProps } from './types/RenderHighlightsProps';
import { type StoreProps } from './types/StoreProps';
export declare const Highlights: React.FC<{
    numPages: number;
    pageIndex: number;
    renderHighlights?(props: RenderHighlightsProps): React.ReactElement;
    store: Store<StoreProps>;
    onHighlightKeyword?(props: OnHighlightKeyword): void;
}>;

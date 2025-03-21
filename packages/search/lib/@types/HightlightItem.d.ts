import * as React from 'react';
import { type OnHighlightKeyword } from './types/OnHighlightKeyword';
import { type HighlightArea } from './types/RenderHighlightsProps';
export declare const HightlightItem: React.FC<{
    index: number;
    area: HighlightArea;
    onHighlightKeyword?(props: OnHighlightKeyword): void;
}>;

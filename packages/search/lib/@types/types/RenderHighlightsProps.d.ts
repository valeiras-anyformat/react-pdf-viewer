import * as React from 'react';
export interface HighlightArea {
    keyword: RegExp;
    keywordStr: string;
    numPages: number;
    pageIndex: number;
    left: number;
    top: number;
    height: number;
    width: number;
    pageHeight: number;
    pageWidth: number;
}
export interface RenderHighlightsProps {
    getCssProperties(area: HighlightArea): React.CSSProperties;
    highlightAreas: HighlightArea[];
}

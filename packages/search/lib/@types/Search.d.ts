import { type Store } from '@react-pdf-viewer/core';
import * as React from 'react';
import { type Match } from './types/Match';
import { type SearchTargetPageFilter } from './types/SearchTargetPage';
import { type StoreProps } from './types/StoreProps';
export interface RenderSearchProps {
    clearKeyword(): void;
    changeMatchCase(matchCase: boolean): void;
    changeWholeWords(wholeWords: boolean): void;
    currentMatch: number;
    isDocumentLoaded: boolean;
    jumpToMatch(matchIndex: number): Match | null;
    jumpToNextMatch(): Match | null;
    jumpToPreviousMatch(): Match | null;
    keyword: string;
    matchCase: boolean;
    numberOfMatches: number;
    wholeWords: boolean;
    search(): Promise<Match[]>;
    setKeyword(keyword: string): void;
    setTargetPages(targetPageFilter: SearchTargetPageFilter): void;
}
type RenderSearch = (props: RenderSearchProps) => React.ReactElement;
export interface SearchProps {
    children: RenderSearch;
}
export declare const Search: React.FC<{
    children: RenderSearch;
    store: Store<StoreProps>;
}>;
export {};

import { type Plugin } from '@react-pdf-viewer/core';
import * as React from 'react';
import { SearchProps } from './Search';
import { ShowSearchPopoverProps } from './ShowSearchPopover';
import { type Match } from './types/Match';
import { type OnHighlightKeyword } from './types/OnHighlightKeyword';
import { type RenderHighlightsProps } from './types/RenderHighlightsProps';
import { type SearchTargetPageFilter } from './types/SearchTargetPage';
import { type SingleKeyword } from './types/SingleKeyword';
export interface SearchPlugin extends Plugin {
    Search(props: SearchProps): React.ReactElement;
    ShowSearchPopover(props: ShowSearchPopoverProps): React.ReactElement;
    ShowSearchPopoverButton(): React.ReactElement;
    clearHighlights(): void;
    highlight(keyword: SingleKeyword | SingleKeyword[]): Promise<Match[]>;
    jumpToMatch(index: number): Match | null;
    jumpToNextMatch(): Match | null;
    jumpToPreviousMatch(): Match | null;
    setTargetPages(targetPageFilter: SearchTargetPageFilter): void;
}
export interface SearchPluginProps {
    enableShortcuts?: boolean;
    keyword?: SingleKeyword | SingleKeyword[];
    renderHighlights?(props: RenderHighlightsProps): React.ReactElement;
    onHighlightKeyword?(props: OnHighlightKeyword): void;
}
export declare const searchPlugin: (props?: SearchPluginProps) => SearchPlugin;

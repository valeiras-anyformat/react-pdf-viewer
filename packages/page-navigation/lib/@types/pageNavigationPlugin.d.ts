import { type Plugin } from '@react-pdf-viewer/core';
import * as React from 'react';
import { CurrentPageLabelProps } from './CurrentPageLabel';
import { NumberOfPagesProps } from './NumberOfPages';
import { type GoToPageMenuItemProps, type GoToPageProps } from './types';
export interface PageNavigationPlugin extends Plugin {
    jumpToNextPage(): void;
    jumpToPage: (pageIndex: number) => void;
    jumpToPreviousPage(): void;
    CurrentPageInput: () => React.ReactElement;
    CurrentPageLabel: (props: CurrentPageLabelProps) => React.ReactElement;
    GoToFirstPage: (props: GoToPageProps) => React.ReactElement;
    GoToFirstPageButton: () => React.ReactElement;
    GoToFirstPageMenuItem: (props: GoToPageMenuItemProps) => React.ReactElement;
    GoToLastPage: (props: GoToPageProps) => React.ReactElement;
    GoToLastPageButton: () => React.ReactElement;
    GoToLastPageMenuItem: (props: GoToPageMenuItemProps) => React.ReactElement;
    GoToNextPage: (props: GoToPageProps) => React.ReactElement;
    GoToNextPageButton: () => React.ReactElement;
    GoToNextPageMenuItem: (props: GoToPageMenuItemProps) => React.ReactElement;
    GoToPreviousPage: (props: GoToPageProps) => React.ReactElement;
    GoToPreviousPageButton: () => React.ReactElement;
    GoToPreviousPageMenuItem: (props: GoToPageMenuItemProps) => React.ReactElement;
    NumberOfPages: (props: NumberOfPagesProps) => React.ReactElement;
}
export interface PageNavigationPluginProps {
    enableShortcuts?: boolean;
}
export declare const pageNavigationPlugin: (props?: PageNavigationPluginProps) => PageNavigationPlugin;

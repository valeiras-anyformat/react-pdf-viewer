import { type Store } from '@react-pdf-viewer/core';
import * as React from 'react';
import { type StoreProps } from './types/StoreProps';
export interface SidebarTab {
    content: React.ReactElement;
    icon: React.ReactElement;
    title: string;
}
interface SidebarProps {
    attachmentTabContent: React.ReactElement;
    bookmarkTabContent: React.ReactElement;
    store: Store<StoreProps>;
    thumbnailTabContent: React.ReactElement;
    tabs?: (defaultTabs: SidebarTab[]) => SidebarTab[];
}
export declare const Sidebar: React.FC<SidebarProps>;
export {};

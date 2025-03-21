import { type Store } from '@react-pdf-viewer/core';
import * as React from 'react';
import { type StoreProps } from './types/StoreProps';
export declare const useTriggerOpen: (store: Store<StoreProps>) => {
    inputRef: React.RefObject<HTMLInputElement>;
    openFile: () => void;
};

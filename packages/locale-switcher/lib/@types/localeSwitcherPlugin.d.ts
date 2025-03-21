import { type Plugin } from '@react-pdf-viewer/core';
import * as React from 'react';
import { LocalePopoverProps } from './LocalePopover';
export interface LocaleSwitcherPlugin extends Plugin {
    LocalePopover: (props: LocalePopoverProps) => React.ReactElement;
}
export declare const localeSwitcherPlugin: () => LocaleSwitcherPlugin;

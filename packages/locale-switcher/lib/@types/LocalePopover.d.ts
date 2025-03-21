import { type LocalizationMap } from '@react-pdf-viewer/core';
import * as React from 'react';
export interface LocalePopoverProps {
    initialLocale?: string;
    locales: {
        [locale: string]: string;
    };
    localizations: {
        [locale: string]: LocalizationMap;
    };
    onUpdateLocalization: (locale: string, localization: LocalizationMap) => void;
}
export declare const LocalePopover: React.FC<LocalePopoverProps>;

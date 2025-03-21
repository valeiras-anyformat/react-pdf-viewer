import { type Plugin } from '@react-pdf-viewer/core';
import * as React from 'react';
import { SwitchThemeProps } from './SwitchTheme';
import { SwitchThemeMenuItemProps } from './SwitchThemeMenuItem';
export interface ThemePlugin extends Plugin {
    SwitchTheme: (props: SwitchThemeProps) => React.ReactElement;
    SwitchThemeButton: () => React.ReactElement;
    SwitchThemeMenuItem: (props: SwitchThemeMenuItemProps) => React.ReactElement;
}
export declare const themePlugin: () => ThemePlugin;

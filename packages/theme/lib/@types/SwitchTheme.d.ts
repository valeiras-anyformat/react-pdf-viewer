import * as React from 'react';
export interface RenderSwitchThemeProps {
    onClick: () => void;
}
type RenderSwitchTheme = (props: RenderSwitchThemeProps) => React.ReactElement;
export interface SwitchThemeProps {
    children?: RenderSwitchTheme;
}
export declare const SwitchTheme: React.FC<{
    children?: RenderSwitchTheme;
}>;
export {};

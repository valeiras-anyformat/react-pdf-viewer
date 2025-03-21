import { type Plugin } from '@react-pdf-viewer/core';
import * as React from 'react';
import { ShowPropertiesProps } from './ShowProperties';
export interface ShowPropertiesMenuItemProps {
    onClick: () => void;
}
export interface PropertiesPlugin extends Plugin {
    ShowProperties(props: ShowPropertiesProps): React.ReactElement;
    ShowPropertiesButton(): React.ReactElement;
    ShowPropertiesMenuItem(props: ShowPropertiesMenuItemProps): React.ReactElement;
}
export declare const propertiesPlugin: () => PropertiesPlugin;

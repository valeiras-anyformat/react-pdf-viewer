import { type Plugin } from '@react-pdf-viewer/core';
import * as React from 'react';
import { Trigger } from './structs/Trigger';
import { type HighlightArea } from './types/HighlightArea';
import { type RenderHighlightContentProps } from './types/RenderHighlightContentProps';
import { type RenderHighlightTargetProps } from './types/RenderHighlightTargetProps';
import { type RenderHighlightsProps } from './types/RenderHighlightsProps';
export interface HighlightPlugin extends Plugin {
    jumpToHighlightArea(area: HighlightArea): void;
    switchTrigger(trigger: Trigger): void;
}
export interface HighlightPluginProps {
    renderHighlightTarget?(props: RenderHighlightTargetProps): React.ReactElement;
    renderHighlightContent?(props: RenderHighlightContentProps): React.ReactElement;
    renderHighlights?(props: RenderHighlightsProps): React.ReactElement;
    trigger?: Trigger;
}
export declare const highlightPlugin: (props?: HighlightPluginProps) => HighlightPlugin;

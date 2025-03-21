import { type HighlightArea } from './HighlightArea';
import { type SelectionData } from './SelectionData';
export declare enum HighlightStateType {
    NoSelection = "NoSelection",
    Selecting = "Selecting",
    Selected = "Selected",
    Selection = "Selection",
    ClickDragging = "ClickDragging",
    ClickDragged = "ClickDragged"
}
export declare const NO_SELECTION_STATE: {
    highlightAreas: HighlightArea[];
    selectionRegion: HighlightArea;
    type: HighlightStateType;
};
export declare const SELECTING_STATE: {
    highlightAreas: HighlightArea[];
    selectionRegion: HighlightArea;
    type: HighlightStateType;
};
export interface HighlightState {
    highlightAreas: HighlightArea[];
    selectionRegion: HighlightArea;
    type: HighlightStateType;
    selectedText?: string;
    selectionData?: SelectionData;
    previewImage?: string;
}

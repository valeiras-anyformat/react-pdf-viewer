import { type HighlightArea } from './HighlightArea';
import { type SelectionData } from './SelectionData';
export interface RenderHighlightTargetProps {
    highlightAreas: HighlightArea[];
    previewImage: string;
    selectedText: string;
    selectionRegion: HighlightArea;
    selectionData?: SelectionData;
    cancel(): void;
    toggle(): void;
}

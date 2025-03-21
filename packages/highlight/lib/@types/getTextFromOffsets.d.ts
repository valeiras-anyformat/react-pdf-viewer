import { type DivText } from './types/DivText';
interface Result {
    divTexts: DivText[];
    wholeText: string;
}
export declare const getTextFromOffsets: (nodes: Node[], pageIndex: number, startDivIdx: number, startOffset: number, endDivIdx: number, endOffset?: number) => Result;
export {};

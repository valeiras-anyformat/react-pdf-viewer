import * as React from 'react';
interface RenderChildren {
    icon: React.ReactElement;
    label: string;
    onClick(): void;
}
export declare const ShowSearchPopoverDecorator: React.FC<{
    children(props: RenderChildren): React.ReactElement;
    onClick(): void;
}>;
export {};

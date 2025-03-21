import * as React from 'react';
export interface SpinnerContextProps {
    renderSpinner: () => React.ReactElement;
}
export declare const defaultSpinner: () => React.JSX.Element;
export declare const SpinnerContext: React.Context<SpinnerContextProps>;

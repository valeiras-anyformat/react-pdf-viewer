import { type Plugin } from '@react-pdf-viewer/core';
import * as React from 'react';
export interface AttachmentPlugin extends Plugin {
    Attachments: () => React.ReactElement;
}
export declare const attachmentPlugin: () => AttachmentPlugin;

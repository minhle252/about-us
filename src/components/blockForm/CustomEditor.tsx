// components/custom-editor.js
'use client' // only in App Router

import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo } from 'ckeditor5';
// import { SlashCommand } from 'ckeditor5-premium-features';

import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

export interface CustomEditorI{
	onchangeEvent: any;
    value: string;
}
const CustomEditor: React.FC<CustomEditorI> = ({onchangeEvent, value}) => {
    return (
        <CKEditor
            editor={ ClassicEditor }
            config={ {
                toolbar: {
                    items: [  'undo', 'redo', 'bold', 'italic', 'numberedList', 'bulletedList'  ],
                },
                plugins: [
                    Bold, Essentials, Italic, Mention, Paragraph, Undo
                ],
                licenseKey: 'SythU0VodlVIaGJGaEZQTjY0ejVsS0t0WnVXcFd5cHhtOXJpRXdaaXQxemxNQnY0WWgvZmw3Nmt2UXJ4VWc9PS1NakF5TkRBNE1EST0=',
                // mention: { 
                //     // Mention configuration
                // },
                initialData: value
            } }
            onChange={onchangeEvent}
        />
    );
}

export default CustomEditor;

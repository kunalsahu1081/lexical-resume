// VanillaLexical.jsx
import {useEffect, useRef} from 'react';
import {$createParagraphNode, $createTextNode, $getRoot, createEditor, ParagraphNode, TextNode,} from 'lexical';
import {registerDragonSupport} from '@lexical/dragon';
import {createEmptyHistoryState, registerHistory} from '@lexical/history';
import {registerRichText} from '@lexical/rich-text';
import {mergeRegister} from '@lexical/utils';
import {$createDocNode, DocumentTreeNode} from "../features/plugins/DocumentTreeNode.ts";
import HorizontalRuler from "../components/rulers/horizontal-ruler/horizontalRuler.tsx";

export default function VanillaLexical() {
    const editorRef = useRef<HTMLElement | null>(null);
    const editorInstance = useRef<unknown>(null);

    useEffect(() => {
        if (!editorRef.current) return;

        const editor = createEditor({
            namespace: 'VanillaLexicalEditor',
            onError: (error) => console.error('Lexical Error:', error),
            nodes: [ParagraphNode, TextNode, DocumentTreeNode],
        });

        editorInstance.current = editor;

        // Mount to the DOM
        editor.setRootElement(editorRef.current);

        // Registering Plugins
        mergeRegister(
            registerRichText(editor),
            registerDragonSupport(editor),
            registerHistory(editor, createEmptyHistoryState(), 300),
        );

        // Initialize editor state (a single empty paragraph)
        editor.update(() => {
            const root = $getRoot();
            if (root.getChildrenSize() === 0) {
                const paragraph = $createParagraphNode();
                paragraph.append($createTextNode(' '));
                root.append(paragraph);
            }
        });

        // Log changes
        const unregister = editor.registerUpdateListener(({editorState}) => {
            editorState.read(() => {
                const root = $getRoot();
                console.log('Editor content:', root.getTextContent());
            });
        });

        return () => {
            unregister();
            editor.setRootElement(null);
        };
    }, []);

    const createNewNode = () => {
        editorInstance?.current?.update(() => {
            const root = $getRoot();
            const paragraph = $createDocNode(100, 100, 100, 'blue');
            paragraph.append($createTextNode(' '));
            root.append(paragraph);
        })
    }

    const splitNode = () => {
        editorInstance?.current?.update(() => {
            const root = $getRoot();
            const paragraph = $createDocNode(100, 100, 100, 'blue');
            paragraph.append($createTextNode(' '));
            root.append(paragraph);
        })
    }

    return (
        <div>

            <HorizontalRuler/>

            <button onClick={() => createNewNode()}>
                create new node
            </button>

            <button onClick={() => splitNode()}>
                Split Node
            </button>

            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                style={{
                    border: '1px solid #ccc',
                    padding: '10px',
                    fontFamily: 'sans-serif',
                    margin: 'auto',
                    height: '297mm',
                    width: '210mm',
                    background: 'white'
                }}
            />


        </div>
    );
}

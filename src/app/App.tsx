// VanillaLexical.jsx
import {createContext, useEffect, useRef, useState} from 'react';
import {$getRoot, createEditor, ParagraphNode, TextNode,} from 'lexical';
import {registerDragonSupport} from '@lexical/dragon';
import {createEmptyHistoryState, registerHistory} from '@lexical/history';
import {registerRichText} from '@lexical/rich-text';
import {mergeRegister} from '@lexical/utils';
import {DocumentTreeNode} from "../features/plugins/DocumentTreeNode.ts";
import HorizontalRuler from "../components/rulers/horizontal-ruler/horizontalRuler.tsx";
import VerticalRuler from "../components/rulers/vertical-ruler/verticalRuler.tsx";
import EditorMenu from "../features/editor-menu";
import {createNewNode} from "../utils/createNode.ts";


const nodes : any =  [ParagraphNode, TextNode, DocumentTreeNode];

export const SomeContext = createContext<unknown>(null)

export default function VanillaLexical() {
    const editorRef = useRef<HTMLElement | null>(null);
    const editorInstance = useRef<unknown>(null);
    const [ref_state, setRefState] = useState<any>(null);


    useEffect(() => {
        if (!editorRef.current) return;

        const editor = createEditor({
            namespace: 'VanillaLexicalEditor',
            onError: (error) => console.error('Lexical Error:', error),
            nodes: nodes,
        });

        editorInstance.current = editor;

        // Mount to the DOM
        editor.setRootElement(editorRef.current);
        setRefState(editor);

        // Registering Plugins
        mergeRegister(
            registerRichText(editor),
            registerDragonSupport(editor),
            registerHistory(editor, createEmptyHistoryState(), 300),
        );

        return () => {
            editor.setRootElement(null);
        };
    }, []);

    const createDocNode = () => {
        createNewNode(editorInstance?.current, 'blue', 50, 50, 1023, 694);
    }


    return (

        <SomeContext value={ref_state}>
            <div>

                <VerticalRuler/>

                <HorizontalRuler/>

                <EditorMenu />

                <button onClick={() => createDocNode()}>
                    create new node
                </button>

                {/*<button onClick={() => splitNode()}>*/}
                {/*    Split Node*/}
                {/*</button>*/}

                <div
                    id={'editorDoc'}
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
        </SomeContext>
    );
}

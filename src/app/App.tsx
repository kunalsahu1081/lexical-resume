// VanillaLexical.jsx
import {createContext, useEffect, useRef, useState} from 'react';
import {$createParagraphNode, $createTextNode, $getRoot, createEditor, ParagraphNode, TextNode,} from 'lexical';
import {registerDragonSupport} from '@lexical/dragon';
import {createEmptyHistoryState, registerHistory} from '@lexical/history';
import {registerRichText} from '@lexical/rich-text';
import {mergeRegister} from '@lexical/utils';
import {DocumentTreeNode} from "../features/plugins/DocumentTreeNode.ts";
import HorizontalRuler from "../components/rulers/horizontal-ruler/horizontalRuler.tsx";
import VerticalRuler from "../components/rulers/vertical-ruler/verticalRuler.tsx";
import EditorMenu from "../features/editor-menu";
import {createNewNode} from "../utils/createNode.ts";


export const SomeContext = createContext<unknown>(null)

export default function VanillaLexical() {
    const editorRef = useRef<HTMLElement | null>(null);
    const editorInstance = useRef<unknown>(null);
    const [ref_state, setRefState] = useState<any>(null);

    const [c_menu_pos, set_c_menu_pos] = useState<any>({x: 0, y: 0, visible: false});


    // create editor on mount
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

    const showContextMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();

        set_c_menu_pos({x: e.x, y: e.y, visible: true, target: e.target.id});
    }

    // listeners on mount
    useEffect(() => {

        document.getElementById('editorDoc')?.addEventListener('contextmenu', showContextMenu);

        return () => {
            document.getElementById('editorDoc')?.removeEventListener('contextmenu', showContextMenu);
        }

    }, []);

    const createDocNode = () => {
        createNewNode(editorInstance?.current, 'blue', 50, 50, 1023, 694);
    }


    return (

        <SomeContext value={ref_state}>
            <div>

                <VerticalRuler/>

                <HorizontalRuler/>

                <EditorMenu c_menu_props={c_menu_pos} />

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

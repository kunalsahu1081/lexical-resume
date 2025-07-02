// VanillaLexical.jsx
import {createContext, useEffect, useRef, useState} from 'react';
import {$createTextNode, $getRoot, createEditor, ParagraphNode, TextNode,} from 'lexical';
import {registerDragonSupport} from '@lexical/dragon';
import {createEmptyHistoryState, registerHistory} from '@lexical/history';
import {registerRichText} from '@lexical/rich-text';
import {mergeRegister} from '@lexical/utils';
import {$createDocNode, DocumentTreeNode} from "../features/plugins/DocumentTreeNode.ts";
import HorizontalRuler from "../components/rulers/horizontal-ruler/horizontalRuler.tsx";
import VerticalRuler from "../components/rulers/vertical-ruler/verticalRuler.tsx";

export const nodeBoundaryObject: any = {};

export const nodeArray = [];

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
            nodes: [ParagraphNode, TextNode, DocumentTreeNode],
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

        // Initialize editor state (a single empty paragraph)
        editor.update(() => {
            const root = $getRoot();
            if (root.getChildrenSize() === 0) {
                // const paragraph = $createParagraphNode();
                // paragraph.append($createTextNode(' '));
                // root.append(paragraph);
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

    const createNewNode = (color = 'red') => {
        editorInstance?.current?.update(() => {
            const root = $getRoot();
            const {node, c_key} = $createDocNode(100, 100, 500, 500, color);

            const parent = document.getElementById('horizontalrule');
            const parent2 = document.getElementById('vhorizontalrule');

            const leftNode = document.createElement('div');
            const rightNode = document.createElement('div');
            const topNode = document.createElement('div');
            const downNode = document.createElement('div');

            const id = c_key;

            nodeArray.push(id);

            const index = nodeArray?.length - 1;

            leftNode.classList.add('rulerPoint');
            leftNode.classList.add('showGuide');

            if (!nodeBoundaryObject['l' + id]) nodeBoundaryObject['l' + id] = {left: [], right: [], top: [], down: []}
            nodeBoundaryObject['l' + id]['left'].push(index);

            leftNode.id = 'l' + id;

            rightNode.classList.add('rulerPoint');
            rightNode.classList.add('showGuide');

            if (!nodeBoundaryObject['r' + id]) nodeBoundaryObject['r' + id] = {left: [], right: [], top: [], down: []}
            nodeBoundaryObject['r' + id]['right'].push(index);

            rightNode.id = 'r' + id;

            topNode.classList.add('vrulerPoint');
            topNode.classList.add('vshowGuide');

            if (!nodeBoundaryObject['t' + id]) nodeBoundaryObject['t' + id] = {left: [], right: [], top: [], down: []}
            nodeBoundaryObject['t' + id]['top'].push(index);

            topNode.id = 't' + id;

            downNode.classList.add('vrulerPoint');
            downNode.classList.add('vshowGuide');

            if (!nodeBoundaryObject['d' + id]) nodeBoundaryObject['d' + id] = {left: [], right: [], top: [], down: []}
            nodeBoundaryObject['d' + id]['down'].push(index);

            downNode.id = 'd' + id;

            leftNode.style.left = '110px';
            rightNode.style.left = '610px';

            topNode.style.top = '100px';
            downNode.style.top = '600px';

            parent.append(leftNode);
            parent.append(rightNode);

            parent2.append(topNode);
            parent2.append(downNode);


            node.append($createTextNode(' '));
            root.append(node);
        })
    }

    const splitNode = () => {
        createNewNode('blue')
    }

    return (

        <SomeContext value={ref_state}>
            <div>

                <VerticalRuler/>

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
        </SomeContext>
    );
}

import {LexicalComposer} from "@lexical/react/LexicalComposer";
import {ParagraphNode, TextNode} from "lexical";
import {DocumentTreeNode} from "../plugins/DocumentTreeNode";
import VerticalRuler from "../../components/rulers/vertical-ruler/verticalRuler";
import HorizontalRuler from "../../components/rulers/horizontal-ruler/horizontalRuler";
import EditorMenu from "../editor-menu";
import {boundaryKeys, nodeArray, nodeBoundaryObject} from "../../utils/createNode";
import React, {useEffect, useState} from "react";
import {HistoryPlugin} from "@lexical/react/LexicalHistoryPlugin";
import {RichTextPlugin} from "@lexical/react/LexicalRichTextPlugin";
import {ContentEditable} from "@lexical/react/LexicalContentEditable";
import {LexicalErrorBoundary} from "@lexical/react/LexicalErrorBoundary";
import LexicalButton from "../plugins/lexicalButton";


function Editor() {


    const [c_menu_pos, set_c_menu_pos] = useState<any>({x: 0, y: 0, visible: false});

    const showContextMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();

        set_c_menu_pos({x: e.x, y: e.y, visible: true, target: e.target.id});
    }

    // listeners on mount
    useEffect(() => {

        document?.addEventListener('contextmenu', showContextMenu);

        return () => {
            document?.removeEventListener('contextmenu', showContextMenu);
        }

    }, []);


    return <>


        <LexicalComposer initialConfig={{
            namespace: 'VanillaLexicalEditor',
            onError: (error) => console.error('Lexical Error:', error),
            nodes: [ParagraphNode, TextNode, DocumentTreeNode],
        }}>


            <div style={{marginTop: '100px'}}>

                <VerticalRuler/>

                <HorizontalRuler/>

                <EditorMenu c_menu_props={c_menu_pos}/>
                <LexicalButton/>

                <RichTextPlugin
                    contentEditable={<ContentEditable className="editor"/>}
                    placeholder={<div>Enter text here...</div>}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin/>

                <button style={{position: 'absolute', top: '25px', left: '300px'}} onClick={() => {
                    console.log(nodeArray, 'nodeArray');
                    console.log(boundaryKeys, 'boundaryKeys');
                    console.log(nodeBoundaryObject, 'nodeBoundaryObject')
                }}>
                    log constants
                </button>


            </div>

        </LexicalComposer>


    </>

}

export default React.memo(Editor);
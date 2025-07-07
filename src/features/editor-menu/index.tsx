import ContextMenu from "../../components/context-menu/contextMenu.tsx";
import {useCallback, useContext} from "react";
import {SomeContext} from "../../app/App.tsx";
import {$getNodeByKey} from "lexical";
import {boundaryKeys, createNewNode, nodeArray} from "../../utils/createNode.ts";
import moment from "moment/moment";


const EditorMenu = ({c_menu_props}) => {


    const editor = useContext(SomeContext);

    const splitNodeHorizontal = useCallback(() => {


        editor?.update(() => {

            const nodeId = c_menu_props.target;

            const node: any = $getNodeByKey(nodeId);

            console.log('node id', c_menu_props.target, node)

            if (node) {

                const left = node.__left;
                const top = node.__top;
                const height = node.__height;
                const width = node.__width;
                const bg = node.__background;

                const left_id = 'c_key' + moment().format('DD|MM|hh|mm|ss');

                const boundaryKey = boundaryKeys[nodeId];

                const replacementId = nodeArray.indexOf(nodeId);

                createNewNode(editor, 'red', left, top, height, width / 2, {...boundaryKey, right_id: left_id}, replacementId);

                createNewNode(editor, 'blue', left + width / 2, top, height, width / 2, {...boundaryKey, left_id: left_id}, replacementId);

                node.remove();

            }

        })

    }, [editor, c_menu_props.target])

    const splitNodeVertical = () => {


    }

    const deleteNode = () => {



    }


    return <>

        <ContextMenu.wrapper is_visible={c_menu_props.visible} left={c_menu_props.x} top={c_menu_props.y}>

            <ContextMenu.item onClick={splitNodeHorizontal}>

                Split to two Horizontal

            </ContextMenu.item>

            <ContextMenu.item onClick={splitNodeVertical}>

                Split to two Vertical

            </ContextMenu.item>

            <ContextMenu.item onClick={deleteNode}>

                Delete Node

            </ContextMenu.item>


        </ContextMenu.wrapper>

    </>

}

export default EditorMenu;
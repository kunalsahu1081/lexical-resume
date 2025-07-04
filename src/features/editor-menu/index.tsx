import ContextMenu from "../../components/context-menu/contextMenu.tsx";
import {useContext} from "react";
import {SomeContext} from "../../app/App.tsx";
import {$getNodeByKey} from "lexical";


const EditorMenu = ({c_menu_props}) => {


    const editor = useContext(SomeContext);

    const splitNodeHorizontal = () => {

        editor.update(() => {

            const nodeId = c_menu_props.target;

            const node: any = $getNodeByKey(nodeId);

            if (node) {

                const left = node.__left;
                const top = node.__top;
                const height = node.__height;
                const width = node.__width;
                const bg = node.__background;



            }

        })

    }

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
import ContextMenu from "../../components/context-menu/contextMenu.tsx";
import {useContext} from "react";
import {SomeContext} from "../../app/App.tsx";


const EditorMenu = () => {


    const editor = useContext(SomeContext);

    const splitNodeHorizontal = () => {


    }

    const splitNodeVertical = () => {


    }

    const deleteNode = () => {



    }


    return <>

        <ContextMenu.wrapper is_visible={false}>

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
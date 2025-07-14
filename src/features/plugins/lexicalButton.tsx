import {createNewNode} from "../../utils/createNode";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";

const LexicalButton = () => {

    const [editor] = useLexicalComposerContext();

    const createDocNode = () => {
        createNewNode(editor, 'blue', 50, 50, 1023, 694);
    }

    return <>


        <button onClick={() => createDocNode()} style={{position: 'absolute', top: '25px'}}>
            create new node
        </button>

    </>

}

export default LexicalButton;
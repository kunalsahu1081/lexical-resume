import ContextMenu from "../../components/context-menu/contextMenu.tsx";
import {useCallback} from "react";
import {$getNodeByKey, $getRoot} from "lexical";
import {boundaryKeys, createNewNode, nodeArray, nodeBoundaryObject, nodeTreeMapping} from "../../utils/createNode.ts";
import moment from "moment/moment";
import {NodeModel} from "../../models/node-model";
import {$createDocNode, DocumentTreeNode} from "../plugins/DocumentTreeNode";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";


const EditorMenu = ({c_menu_props}) => {


    const [editor] = useLexicalComposerContext();

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

                document.createElement('div').id = left_id;

                const boundaryKey = boundaryKeys[nodeId];

                const replacementId = nodeArray.indexOf(nodeId);

                const DocTreeRef: NodeModel = nodeTreeMapping[replacementId];
                const leftNode = DocTreeRef.createLeft(0);
                const rightNode = DocTreeRef.createRight(0);

                createNewNode(editor, 'red', left, top, height, width / 2, {
                    ...boundaryKey,
                    right_id: left_id
                }, replacementId, leftNode);

                createNewNode(editor, 'blue', left + width / 2, top, height, width / 2, {
                    ...boundaryKey,
                    left_id: left_id
                }, null, rightNode);

                node.remove();

            }

        })

    }, [editor, c_menu_props.target])

    const splitNodeVertical = () => {

        editor?.update(() => {

            const nodeId = c_menu_props.target;

            const node: any = $getNodeByKey(nodeId);

            if (node) {

                const left = node.__left;
                const top = node.__top;
                const height = node.__height;
                const width = node.__width;
                const bg = node.__background;

                const top_id = 'c_keyt' + moment().format('DD|MM|hh|mm|ss');

                const boundaryKey = boundaryKeys[nodeId];

                const replacementId = nodeArray.indexOf(nodeId);

                const DocTreeRef: NodeModel = nodeTreeMapping[replacementId];
                const topNode = DocTreeRef.createTop(0);
                const bottomNode = DocTreeRef.createBottom(0);

                document.createElement('div').id = top_id;

                createNewNode(editor, 'red', left, top, height / 2, width, {
                    ...boundaryKey,
                    bottom_id: top_id
                }, replacementId, topNode);

                createNewNode(editor, 'green', left, top + height / 2, height / 2, width, {
                    ...boundaryKey,
                    top_id: top_id
                }, null, bottomNode);

                node.remove();

            }

        })

    }

    const deleteNode = () => {

        const nodeId = c_menu_props.target;

        editor.update(() => {

            const node: any = $getNodeByKey(nodeId);

            console.log('node id', c_menu_props.target, node)

            const root = $getRoot();

            if (node) {

                const left = node.__left;
                const top = node.__top;
                const height = node.__height;
                const width = node.__width;
                const bg = node.__background;

                const boundaryKey = boundaryKeys[nodeId];

                const replacementId = nodeArray.indexOf(nodeId);

                const DocTreeRef: NodeModel = nodeTreeMapping[replacementId];
                const parent = document.getElementById('horizontalrule');
                const parent2 = document.getElementById('vhorizontalrule');

                if (DocTreeRef.is_bottom_member) {

                    const id = boundaryKey.top_id;

                    const topNodeKeys = [...new Set(nodeBoundaryObject[id]['down'])];
                    nodeBoundaryObject[boundaryKey.bottom_id]['down'] = [...nodeBoundaryObject[boundaryKey.bottom_id]['down'], ...topNodeKeys];

                    topNodeKeys?.map((editor_key, index) => {
                        const pNode: DocumentTreeNode = $getNodeByKey(nodeArray[editor_key]);
                        if (topNodeKeys.length === 1) {
                            nodeTreeMapping[editor_key].copyParentValues();
                        }

                        if (pNode) {

                            const {node, c_key} = $createDocNode(pNode.__left, pNode.__top, pNode.__height + height, pNode.__width, pNode.__background);

                            boundaryKeys[c_key] = {...boundaryKeys[nodeArray[editor_key]], bottom_id: boundaryKey.bottom_id};
                            delete boundaryKeys[nodeArray[editor_key]]
                            nodeArray[editor_key] = c_key;

                            root.append(node);
                            pNode.remove();

                        }
                    })

                    parent2.removeChild(document.getElementById(id));
                }

                if (DocTreeRef.is_top_member) {

                    const id = boundaryKey.bottom_id;

                    const topNodeKeys = [...new Set(nodeBoundaryObject[id]['top'])];
                    nodeBoundaryObject[boundaryKey.top_id]['top'] = [...nodeBoundaryObject[boundaryKey.top_id]['top'] ,...topNodeKeys];

                    topNodeKeys?.map((editor_key, index) => {
                        const pNode: DocumentTreeNode = $getNodeByKey(nodeArray[editor_key]);
                        if (topNodeKeys.length === 1) {
                            nodeTreeMapping[editor_key].copyParentValues();
                        }

                        if (pNode) {

                            const {node, c_key} = $createDocNode(pNode.__left, top, pNode.__height + height, pNode.__width, pNode.__background);

                            boundaryKeys[c_key] = {...boundaryKeys[nodeArray[editor_key]], top_id: boundaryKey.top_id};
                            delete boundaryKeys[nodeArray[editor_key]]
                            nodeArray[editor_key] = c_key;

                            root.append(node);
                            pNode.remove();

                        }
                    })

                    parent2.removeChild(document.getElementById(id));
                }

                if (DocTreeRef.is_right_member) {

                    const id = boundaryKey.left_id;

                    const topNodeKeys = [...new Set(nodeBoundaryObject[id]['right'])];
                    nodeBoundaryObject[boundaryKey.right_id]['right'] = [...nodeBoundaryObject[boundaryKey.right_id]['right'], ...topNodeKeys];

                    topNodeKeys?.map((editor_key, index) => {
                        const pNode: DocumentTreeNode = $getNodeByKey(nodeArray[editor_key]);
                        if (topNodeKeys.length === 1) {
                            nodeTreeMapping[editor_key].copyParentValues();
                        }

                        if (pNode) {

                            const {node, c_key} = $createDocNode(pNode.__left , pNode.__top, pNode.__height , pNode.__width + width, pNode.__background);

                            boundaryKeys[c_key] = {...boundaryKeys[nodeArray[editor_key]], right_id: boundaryKey.right_id};
                            delete boundaryKeys[nodeArray[editor_key]]
                            nodeArray[editor_key] = c_key;

                            root.append(node);
                            pNode.remove();

                        }
                    })

                    parent.removeChild(document.getElementById(id));
                }

                if (DocTreeRef.is_left_member) {

                    const id = boundaryKey.right_id;

                    const topNodeKeys = [...new Set(nodeBoundaryObject[id]['left'])];
                    nodeBoundaryObject[boundaryKey.left_id]['left'] = [...nodeBoundaryObject[boundaryKey.left_id]['left'], ...topNodeKeys];

                    topNodeKeys?.map((editor_key, index) => {
                        const pNode: DocumentTreeNode = $getNodeByKey(nodeArray[editor_key]);
                        if (topNodeKeys.length === 1) {
                            nodeTreeMapping[editor_key].copyParentValues();
                        }

                        if (pNode) {

                            const {node, c_key} = $createDocNode(left, pNode.__top, pNode.__height , pNode.__width + width, pNode.__background);

                            boundaryKeys[c_key] = {...boundaryKeys[nodeArray[editor_key]], left_id: boundaryKey.left_id};
                            delete boundaryKeys[nodeArray[editor_key]]
                            nodeArray[editor_key] = c_key;

                            root.append(node);
                            pNode.remove();

                        }
                    })

                    parent.removeChild(document.getElementById(id));
                }

                node.remove();

            }

        })

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
import {$createTextNode, $getRoot} from "lexical";
import {$createDocNode} from "../features/plugins/DocumentTreeNode.ts";
import moment from "moment";
import {NodeModel} from "../models/node-model";


export const nodeBoundaryObject: any = {};

export const boundaryKeys: any = {};

export const nodeArray = [];

export const nodeTreeMapping = [];

export const vwToPx = (vw: number) => (vw / 100) * window.innerWidth;
export const pxToVw = (px: number) => (px / window.innerWidth) * 100;

export let rootNode;

export const
    createNewNode = (editor, color: string = 'red', left: number, top: number, height: number, width: number, boundary_ids: any = {}, replace_id_index?: any, parentNode?: NodeModel) => {
        editor?.update(() => {

            const root = $getRoot();
            const {node, c_key} = $createDocNode(left, top, height, width, color);

            const parent = document.getElementById('horizontalrule');
            const parent2 = document.getElementById('vhorizontalrule');

            const id = c_key + moment().format('DD|MM|hh|mm|ss');

            const {left_id = 'l' + id, right_id = 'r' + id, top_id = 't' + id, bottom_id = 'd' + id} = boundary_ids;

            const leftNode = document?.getElementById(left_id) || document.createElement('div');
            const rightNode = document?.getElementById(right_id) || document.createElement('div');
            const topNode = document?.getElementById(top_id) || document.createElement('div');
            const downNode = document?.getElementById(bottom_id) || document.createElement('div');


            if (!parentNode) {
                rootNode = new NodeModel(0, false, false, false, false, null);
            }

            if (replace_id_index != null) {
                nodeArray[replace_id_index] = c_key;
            } else {
                nodeArray.push(c_key);
            }

            boundaryKeys[c_key] = {left_id: left_id, right_id: right_id, top_id: top_id, bottom_id: bottom_id};

            const index = replace_id_index ?? nodeArray?.length - 1;

            if (!parentNode) {
                nodeTreeMapping[index] = rootNode;
            } else {
                nodeTreeMapping[index] = parentNode;
            }

            for (const side in nodeBoundaryObject) {


                nodeBoundaryObject[side]['right']?.forEach((val, pindex) => {

                    if (val == replace_id_index) nodeBoundaryObject[side]['right'][pindex] = null;

                })

                nodeBoundaryObject[side]['top']?.forEach((val, pindex) => {

                    if (val == replace_id_index) nodeBoundaryObject[side]['top'][pindex] = null;

                })

                nodeBoundaryObject[side]['left']?.forEach((val, pindex) => {

                    if (val == replace_id_index) nodeBoundaryObject[side]['left'][pindex] = null;

                })

                nodeBoundaryObject[side]['down']?.forEach((val, pindex) => {

                    if (val == replace_id_index) nodeBoundaryObject[side]['down'][pindex] = null;

                })

            }

            leftNode.classList.add('rulerPoint');
            // leftNode.classList.add('showGuide');

            if (!nodeBoundaryObject[left_id]) nodeBoundaryObject[left_id] = {left: [], right: [], top: [], down: []}
            nodeBoundaryObject[left_id]['left'].push(index);

            leftNode.id = left_id;

            rightNode.classList.add('rulerPoint');
            // rightNode.classList.add('showGuide');

            if (!nodeBoundaryObject[right_id]) nodeBoundaryObject[right_id] = {left: [], right: [], top: [], down: []}
            nodeBoundaryObject[right_id]['right'].push(index);

            rightNode.id = right_id;

            topNode.classList.add('vrulerPoint');
            // topNode.classList.add('vshowGuide');

            if (!nodeBoundaryObject[top_id]) nodeBoundaryObject[top_id] = {left: [], right: [], top: [], down: []}
            nodeBoundaryObject[top_id]['top'].push(index);

            topNode.id = top_id;

            downNode.classList.add('vrulerPoint');
            // downNode.classList.add('vshowGuide');

            if (!nodeBoundaryObject[bottom_id]) nodeBoundaryObject[bottom_id] = {left: [], right: [], top: [], down: []}
            nodeBoundaryObject[bottom_id]['down'].push(index);

            downNode.id = bottom_id;

            leftNode.style.left = (left + 10) + 'px';
            rightNode.style.left = left + width + 10 + 'px';

            topNode.style.top = top + 72 + 'px';
            downNode.style.top = (top + height + 72) + 'px';

            parent.append(leftNode);
            parent.append(rightNode);

            parent2.append(topNode);
            parent2.append(downNode);


            node.append($createTextNode(' asdfasdfasdf'));
            root.append(node);

            return {left_id: left_id, right_id, top_id, bottom_id};
        })

        return {left_id: null, right_id: null, top_id: null, bottom_id: null};
    }
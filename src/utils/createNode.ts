import {$createTextNode, $getRoot} from "lexical";
import {$createDocNode} from "../features/plugins/DocumentTreeNode.ts";


export const nodeBoundaryObject: any = {};

export const nodeArray = [];

export const vwToPx = (vw: number) => (vw / 100) * window.innerWidth;
export const pxToVw = (px: number) => (px / window.innerWidth) * 100;

export const
    createNewNode = (editor, color: string = 'red', left: number, top: number, height: number, width: number) => {
        editor?.update(() => {
            const root = $getRoot();
            const {node, c_key} = $createDocNode(left, top, height, width, color);

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

            leftNode.style.left = (left + 10 )+ 'px';
            rightNode.style.left = left + width + 10 + 'px';

            topNode.style.top = top + 'px';
            downNode.style.top = (top + height) + 'px';

            parent.append(leftNode);
            parent.append(rightNode);

            parent2.append(topNode);
            parent2.append(downNode);


            node.append($createTextNode(' asdfasdfasdf'));
            root.append(node);
        })
    }
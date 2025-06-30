import type {EditorConfig, NodeKey} from 'lexical';
import {ElementNode} from "lexical";


export class IndentNode extends ElementNode {

    static getType(): string {
        return 'indent-document';
    }

    constructor(key?: NodeKey) {
        super(key);
    }

    createDOM(): HTMLElement {
        // Define the DOM element here
        const dom = document.createElement('p');

        dom.style.position = 'relative';
        dom.style.paddingLeft = '8px'

        return dom;
    }

    updateDOM(_prevNode: this, _dom: HTMLElement, _config: EditorConfig): boolean {
        return super.updateDOM(_prevNode, _dom, _config);
    }

}
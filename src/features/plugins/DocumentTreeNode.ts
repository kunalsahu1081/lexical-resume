import type {EditorConfig, NodeKey} from 'lexical';
import {
    $applyNodeReplacement,
    ElementNode,
    type LexicalNode,
    type SerializedLexicalNode,
    type Spread,
} from "lexical";


export type SerializedDocNode = Spread<
  {
    top: number;
    height: number;
    width: number;
    background: string;
  },
  SerializedLexicalNode
>;

export class DocumentTreeNode extends ElementNode {

    __top: number;
    __left: number;
    __height: number;
    __width: number;
    __background: string;
    __c_key: NodeKey | undefined;
    __hide_init: boolean;


    static getType(): string {
        return 'custom-document';
    }

    static clone(node: DocumentTreeNode): DocumentTreeNode {
        return new DocumentTreeNode(node.__left, node.__top, node.__height, node.__width, node.__background, node.__hide_init, node.__key);
    }

    // static importJSON(serializedNode: SerializedDocNode): DocumentTreeNode {
    //     return new DocumentTreeNode(serializedNode.top, serializedNode.height, serializedNode.width, serializedNode.background).updateFromJSON(serializedNode);
    // }
    //
    // exportJSON(): SerializedDocNode {
    //     return {...super.exportJSON(), top: this.__top, height: this.__height, width: this.__width, background: this.__background};
    // }

    constructor(left:number = 0,top: number = 0, height: number = 0, width: number = 0, background: string = '', hide_init: boolean, key?: NodeKey) {

        super(key);

        this.__c_key = key;
        this.__background = background;
        this.__left = left;
        this.__top = top;
        this.__width = width;
        this.__height = height;
        this.__hide_init = hide_init

    }

    createDOM(): HTMLElement {
        // Define the DOM element here
        const dom = document.createElement('div');

        dom.id = this.__key;
        if (this.__hide_init) {
            // dom.style.display = 'none'
        }
        dom.style.position = 'absolute';
        dom.style.top = this.__top + 'px';
        dom.style.width = this.__width + 'px';
        dom.style.height = this.__height + 'px';
        dom.style.left = this.__left + 'px';
        dom.style.background = this.__background;

        return dom;
    }

    updateDOM(_prevNode: this, _dom: HTMLElement, _config: EditorConfig): boolean {
        // const isUpdated = super.updateDOM(_prevNode, _dom, _config);

        if (_prevNode.__top !== this.__top) _dom.style.top = this.__top + 'px';
        if (_prevNode.__width !== this.__width) _dom.style.width = this.__width + 'px';
        if (_prevNode.__height !== this.__height) _dom.style.right = this.__height + 'px';
        if (_prevNode.__background !== this.__background) _dom.style.background = this.__background;
        if (_prevNode.__left !== this.__left) _dom.style.left = this.__left + 'px';

        return true;
    }

}

export function $createDocNode(left: number = 0,top: number = 0, height: number = 0, width: number = 0, background: string = '', hide_init = false): {node: DocumentTreeNode, c_key: NodeKey | undefined} {

    const newNode = new DocumentTreeNode(left, top, height, width, background, hide_init);

    return {node: $applyNodeReplacement(newNode), c_key: newNode.__key}

}

export function $isVideoNode(
    node: LexicalNode | null | undefined,
): node is DocumentTreeNode {
    return node instanceof DocumentTreeNode;
}
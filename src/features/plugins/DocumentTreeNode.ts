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
    __height: number;
    __width: number;
    __background: string;
    __c_key: NodeKey | undefined;


    static getType(): string {
        return 'custom-document';
    }

    static clone(node: DocumentTreeNode): DocumentTreeNode {
        return new DocumentTreeNode(node.__top, node.__height, node.__width, node.__background, node.__key);
    }

    // static importJSON(serializedNode: SerializedDocNode): DocumentTreeNode {
    //     return new DocumentTreeNode(serializedNode.top, serializedNode.height, serializedNode.width, serializedNode.background).updateFromJSON(serializedNode);
    // }
    //
    // exportJSON(): SerializedDocNode {
    //     return {...super.exportJSON(), top: this.__top, height: this.__height, width: this.__width, background: this.__background};
    // }

    constructor(top: number = 0, height: number = 0, width: number = 0, background: string = '', key?: NodeKey) {

        super(key);

        this.__c_key = key;
        this.__background = background;
        this.__top = top;
        this.__width = width;
        this.__height = height;

    }

    createDOM(): HTMLElement {
        // Define the DOM element here
        const dom = document.createElement('div');

        dom.style.position = 'relative';
        dom.style.top = this.__top + 'px';
        dom.style.width = this.__width + 'px';
        dom.style.height = this.__height + 'px';
        dom.style.background = this.__background;

        return dom;
    }

    updateDOM(_prevNode: this, _dom: HTMLElement, _config: EditorConfig): boolean {
        const isUpdated = super.updateDOM(_prevNode, _dom, _config);

        if (_prevNode.__top !== this.__top) _dom.style.top = this.__top + 'px';
        if (_prevNode.__width !== this.__width) _dom.style.width = this.__width + 'px';
        if (_prevNode.__height !== this.__height) _dom.style.right = this.__height + 'px';
        if (_prevNode.__background !== this.__background) _dom.style.background = this.__background;

        return isUpdated;
    }

}

export function $createDocNode(top: number = 0, height: number = 0, width: number = 0, background: string = ''): {node: DocumentTreeNode, c_key: NodeKey | undefined} {

    const newNode = new DocumentTreeNode(top, height, width, background);

    return {node: $applyNodeReplacement(newNode), c_key: newNode.__c_key}

}

export function $isVideoNode(
    node: LexicalNode | null | undefined,
): node is DocumentTreeNode {
    return node instanceof DocumentTreeNode;
}
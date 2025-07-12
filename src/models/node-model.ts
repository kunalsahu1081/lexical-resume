export class NodeModel {

    parent: NodeModel | null;
    node_value: number | null;
    left_node: NodeModel | null;
    right_node: NodeModel | null;
    is_left_member: boolean;
    is_right_member: boolean;
    is_bottom_member: boolean;
    is_top_member: boolean;

    constructor(node_value: number, is_left: boolean, is_right: boolean, is_top: boolean, is_bottom: boolean, parent: NodeModel) {

        this.node_value = node_value;
        this.is_left_member = is_left;
        this.is_right_member = is_right;
        this.is_top_member = is_top;
        this.is_bottom_member = is_bottom;
        this.parent = parent;
        this.left_node = null;
        this.right_node = null;

        return this;

    }

    copyParentValues() {

        if (this.parent) {
            this.is_left_member = this.parent.is_left_member;
            this.is_right_member = this.parent.is_right_member;
            this.is_top_member = this.parent.is_top_member;
            this.is_bottom_member = this.parent.is_bottom_member;
            this.parent = this.parent.parent;
        }
    }

    createLeft(node_value: number) {

        const LeftNode = new NodeModel(node_value, true, false, false, false, this);

        this.left_node = LeftNode;
        this.node_value = null;

        return LeftNode;

    }

    createTop(node_value: number) {

        const LeftNode = new NodeModel(node_value, false, false, true, false, this);

        this.right_node = LeftNode;
        this.node_value = null;

        return LeftNode;

    }

    createBottom(node_value: number) {

        const LeftNode = new NodeModel(node_value, false, false, false, true, this);

        this.left_node = LeftNode;
        this.node_value = null;

        return LeftNode;

    }

    createRight(node_value: number) {

        const LeftNode = new NodeModel(node_value, false, true, false, false, this);

        this.right_node = LeftNode;
        this.node_value = null;

        return LeftNode;

    }


}
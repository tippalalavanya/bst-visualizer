export interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
  id: string;
}

export interface VisualizerState {
  nodes: Map<string, { value: number; x: number; y: number; highlighted: boolean; status: 'normal' | 'found' | 'processing' }>;
  edges: Array<{ from: string; to: string; highlighted: boolean }>;
  message: string;
  isAnimating: boolean;
}

export class BST {
  root: TreeNode | null = null;
  nodeCounter = 0;

  private generateId(): string {
    return `node-${this.nodeCounter++}`;
  }

  insert(value: number): TreeNode {
    if (this.root === null) {
      const node: TreeNode = { value, left: null, right: null, id: this.generateId() };
      this.root = node;
      return node;
    }
    return this._insertHelper(this.root, value);
  }

  private _insertHelper(node: TreeNode, value: number): TreeNode {
    if (value < node.value) {
      if (node.left === null) {
        node.left = { value, left: null, right: null, id: this.generateId() };
      } else {
        this._insertHelper(node.left, value);
      }
    } else if (value > node.value) {
      if (node.right === null) {
        node.right = { value, left: null, right: null, id: this.generateId() };
      } else {
        this._insertHelper(node.right, value);
      }
    }
    return node;
  }

  search(value: number): TreeNode | null {
    return this._searchHelper(this.root, value);
  }

  private _searchHelper(node: TreeNode | null, value: number): TreeNode | null {
    if (node === null) return null;
    if (value === node.value) return node;
    if (value < node.value) return this._searchHelper(node.left, value);
    return this._searchHelper(node.right, value);
  }

  remove(value: number): void {
    this.root = this._removeHelper(this.root, value);
  }

  private _removeHelper(node: TreeNode | null, value: number): TreeNode | null {
    if (node === null) return null;

    if (value < node.value) {
      node.left = this._removeHelper(node.left, value);
    } else if (value > node.value) {
      node.right = this._removeHelper(node.right, value);
    } else {
      // Node to remove found
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      // Find in-order successor
      const minRight = this._findMin(node.right);
      node.value = minRight.value;
      node.right = this._removeHelper(node.right, minRight.value);
    }
    return node;
  }

  private _findMin(node: TreeNode): TreeNode {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  inorderTraversal(node: TreeNode | null = this.root): number[] {
    if (node === null) return [];
    return [...this.inorderTraversal(node.left), node.value, ...this.inorderTraversal(node.right)];
  }

  preorderTraversal(node: TreeNode | null = this.root): number[] {
    if (node === null) return [];
    return [node.value, ...this.preorderTraversal(node.left), ...this.preorderTraversal(node.right)];
  }

  postorderTraversal(node: TreeNode | null = this.root): number[] {
    if (node === null) return [];
    return [...this.postorderTraversal(node.left), ...this.postorderTraversal(node.right), node.value];
  }

  getHeight(node: TreeNode | null = this.root): number {
    if (node === null) return -1;
    return 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
  }

  getAllNodes(node: TreeNode | null = this.root): TreeNode[] {
    if (node === null) return [];
    return [node, ...this.getAllNodes(node.left), ...this.getAllNodes(node.right)];
  }
}

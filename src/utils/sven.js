import { createElement } from "./dom.js"

const Sven = {
    root: document.body,
    tree: null,
    traversalPointer: [],
    getCurrentTraversalNode () {
        // Create a reference to the current tree
        let currentNode = this.tree;

        // Traverse through the pointer levels except the last one
        for (let i = 0; i < this.traversalPointer.length - 1; i++) {
            currentNode = currentNode?.children[this.traversalPointer[i]];
            
            // Ensure the node exists
            if (!currentNode) {
                console.error(`Invalid traversal path at index ${i}`);
                return false;
            }
        }
        
        return currentNode
    },

    getLastTraversalPointer () {
        return this.traversalPointer[this.traversalPointer.length - 1];
    },

    updateTree (tree) {
        // If no traversal pointer, simply set the entire tree
        if (this.traversalPointer.length === 0) {
            this.tree = tree;
            return;
        }

        const currentNode = this.getCurrentTraversalNode()

        // Get the last pointer value
        const lastPointer = this.getLastTraversalPointer()

        // Update or create the node at the final level
        if (currentNode.children[lastPointer]) {
            // Merge existing node with new tree
            currentNode.children[lastPointer] = {
                ...currentNode.children[lastPointer],
                ...tree
            };
        } else {
            // Create new node if it doesn't exist
            currentNode.children[lastPointer] = tree;
        }
    },

    createRoot (element) {
        this.root = element
        return element
    },

    render (tree, isRerender = false) {
        const { tag, text, attrs, listeners, children, component, props } = tree

        if (component) {
            const json = component(props)
            return this.render(json)
        }

        const element = createElement(tag, text, attrs, listeners)
        
        if (isRerender) {
            const currentNode = this.getCurrentTraversalNode()
            const lastPointer = this.getLastTraversalPointer()
            const childToReplace = this.root.childNodes[lastPointer || 0]
            this.root.replaceChild(element, childToReplace)
        } else {
            this.root.appendChild(element)
        }

        this.updateTree(tree)
        
        if (children) {
            this.traversalPointer.push(0)
            this.root = element
            children.forEach((child, idx) => {
                this.traversalPointer[this.traversalPointer.length - 1] = idx
                // this.isRenderingChildren = true
                this.render(child)
            })
            this.traversalPointer.pop()
            this.root = element.parentElement
        }
    }
}

export default Sven
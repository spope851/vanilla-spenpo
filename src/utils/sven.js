const RESTRICTED_ATTRIBUTES = [
    'innerHTML',
    'children'
];

const Sven = {
    root: document.body,
    createElement (tag, props = {}) {
        if (typeof tag === 'function') {
            const tree = tag(props)
            this.render(tree)
            return
        }
        
        const element = document.createElement(tag)
        
        Object.entries(props).forEach(([ name, value ]) => {
            if (RESTRICTED_ATTRIBUTES.includes(name)) return
            else if ( typeof value === 'function') {
                if (name.startsWith("DOM")) {
                    document.addEventListener(name, value)
                } else {
                    element.addEventListener(name, value)
                }
            }
            else element.setAttribute(name, value)
        })

        // RESTRICTED_ATTRIBUTES.forEach(attr => {
        //     if (props[attr]) {
        //         element[attr] = props[attr]
        //     }
        // })
    
        return element
    },

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
        let element;

        if (['string', 'number'].includes(typeof tree)) {
            element = document.createTextNode(tree)
        }

        const { tag, props = {} } = tree

        if (!element) element = this.createElement(tag, props)
        if (!element) return
        
        if (isRerender) {
            const currentNode = this.getCurrentTraversalNode()
            const lastPointer = this.getLastTraversalPointer()
            const childToReplace = this.root.childNodes[lastPointer || 0]
            this.root.replaceChild(element, childToReplace)
        } else {
            this.root.appendChild(element)
        }

        // this.updateTree(tree)
        
        this.traversalPointer.push(0)
        this.root = element
        props.children?.forEach((child, idx) => {
            this.traversalPointer[this.traversalPointer.length - 1] = idx
            this.render(child)
        })
        this.traversalPointer.pop()
        this.root = element.parentElement
    }
}

export default Sven
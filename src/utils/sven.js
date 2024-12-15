const RESTRICTED_ATTRIBUTES = [
    'innerHTML',
    'children'
];

const Sven = {
    root: document.body,
    createElement (tree) {
        if (['string', 'number'].includes(typeof tree)) {
            return document.createTextNode(String(tree))
        }

        const { tag, props = {} } = tree

        if (typeof tag === 'function') {
            try {
                const component = tag(props)
                this.render(component)
                return
            } catch ({ promise, key }) {
                promise.then(res => {
                    promiseCache.set(key, res)
                    this.rerender(this.tree)
                })
                
                return this.render({
                    tag: 'p',
                    props: {
                        style: "margin: 20px",
                        children: ["one moment please..."]
                    }
                })
            }
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

        RESTRICTED_ATTRIBUTES.forEach(attr => {
            if (props[attr]) {
                switch (attr) {
                    case "children": return
                    default: element[attr] = props[attr]
                }
            }
        })
    
        return element
    },

    tree: null,
    traversalPointer: [],
    getCurrentTraversalNode () {
        // Create a reference to the current tree
        let currentNode = this.tree;

        // Traverse through the pointer levels except the last one
        for (let i = 0; i < this.traversalPointer.length - 1; i++) {
            currentNode = currentNode.props.children[this.traversalPointer[i]];
            
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
        if (currentNode.props.children[lastPointer]) {
            // Merge existing node with new tree
            currentNode.props.children[lastPointer] = {
                ...currentNode.props.children[lastPointer],
                ...tree
            };
        } else {
            // Create new node if it doesn't exist
            currentNode.props.children[lastPointer] = tree;
        }
    },

    trueRoot: null,
    createRoot (element) {
        this.root = element
        this.trueRoot = element.id
        
        return element
    },

    render (tree) {
        // this.updateTree(tree)
        if (!this.tree) this.tree = tree

        const  element = this.createElement(tree)
        if (!element) return
        
        this.root.appendChild(element)
        
        this.traversalPointer.push(0)
        this.root = element

        tree.props?.children?.forEach((child, idx) => {
            this.traversalPointer[this.traversalPointer.length - 1] = idx
            this.render(child)
        })
        
        this.traversalPointer.pop()
        this.root = element.parentElement
        if (this.root.id === this.trueRoot) {
            stateCursor = 0
        }
    },

    rerender (tree) {
        // const currentNode = this.getCurrentTraversalNode()
        // const lastPointer = this.getLastTraversalPointer()
        // const childToReplace = this.root.childNodes[lastPointer || 0]
        // this.root.replaceChild(element, childToReplace)
        this.root.innerHTML = ''
        this.render(tree)
    }
}

const states = []
let stateCursor = 0

const useState = (initialState) => {
    const FROZEN_CURSOR = stateCursor
    let state = states[FROZEN_CURSOR] || initialState
    states[FROZEN_CURSOR] = state

    const setState = (newState) => {
        state = newState
        states[FROZEN_CURSOR] = newState
        Sven.rerender(Sven.tree)
    }

    stateCursor += 1

    return [state, setState]
}

const promiseCache = new Map()

const wrapPromise = (promise, key) => {
    if (promiseCache.get(key)) {
        return promiseCache.get(key)
    } else {
        throw { promise, key }
    }
}

export default Sven
export {
    useState,
    wrapPromise
}
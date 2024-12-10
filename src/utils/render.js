const Sven = {
    root: document.body,

    createRoot (element) {
        this.root = element
    },

    render (components) {
        components.forEach((component) => {
            this.root.appendChild(component)
        })
    }
}

export { Sven }
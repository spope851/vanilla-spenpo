const render = (components) => {
    const root = document.getElementById('vanilla-spenpo-root')
    root.innerHTML = ""
    components.forEach(async (node, idx) => {
        switch (typeof node) {
            case 'object':
                root.appendChild(node)
                break
            case 'function':
                await node().then(res => {
                    components[idx] = res
                    render(components)
                })
                break
            default:
                return
        }
    })
}

export { render }
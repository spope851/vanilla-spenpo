const RESTRICTED_ATTRIBUTES = [
    'innerHTML'
]

const createElement = (tag, text, attrs, listeners) => {
    const element = document.createElement(tag)
    if (text) {
        const textNode = document.createTextNode(text)
        element.appendChild(textNode)
    }
    
    if (attrs) {
        Object.entries(attrs).forEach(([ name, value ]) => {
            if (RESTRICTED_ATTRIBUTES.includes(name)) return
            element.setAttribute(name, value)
        })

        RESTRICTED_ATTRIBUTES.forEach(attr => {
            if (attrs[attr]) {
                element[attr] = attrs[attr]
            }
        })
    }

    if (listeners) {
        Object.entries(listeners).forEach(([ event, callback ]) => {
            if (event.startsWith("DOM")) {
                document.addEventListener(event, callback)
            } else {
                element.addEventListener(event, callback)
            }
        })
    }

    return element
};

export {
    createElement
}
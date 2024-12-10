import { Router } from './router.js'

const createElement = (tag, text, attrs, children) => {
    const element = document.createElement(tag)
    if (text) {
        const textNode = document.createTextNode(text)
        element.appendChild(textNode)
    }
    
    if (attrs) {
        attrs.forEach(({ name, value }) => {
            element.setAttribute(name, value)
        })
    }

    if (children) {
        children.forEach(child => {
            element.appendChild(child)
        })
    }

    return element
};

const createLink = (href, title, attrs, children) => {
    const elAttrs = [
        {
            name: "href",
            value: `/${href}`
        },
        {
            name: "class",
            value: `spenpo-link-${href}`
        }
    ]

    if (attrs) elAttrs.push(...attrs)

    const link = createElement('a', title || href, elAttrs, children)

    // intercept click event to rerender the spa
    link.addEventListener("click", (e) => {
        e.preventDefault()
        Router.navigate(`/${href}`)
    })

    return link
}

export {
    createElement,
    createLink
}
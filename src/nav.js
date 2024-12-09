import { SvenRouter } from "./index.js"

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

    const navLink = createElement('a', title || href, elAttrs, children)

    // intercept click event and to rerender the spa
    navLink.addEventListener("click", (e) => {
        e.preventDefault()
        SvenRouter.push(href)
    })

    return navLink
};

const navBarHead = createLink('', '', [
    {
        name: 'id',
        value: 'nav-home-btn'
    },
    {
        name: 'href',
        value: ''
    }
], [createElement('h1', 'Spencer Pope')])

const pages = [
    'about',
    'now',
    'work',
    'blog',
    'contact'
];

const createNavElement = (name) => {
    const navLink = createLink(name)
    const navEl = createElement('li', '', undefined, [navLink])
    return navEl
};

const navList = createElement('ul', '', [
    {
        name: "class",
        value: `navList`
    }
], pages.map(name => createNavElement(name)));


const navBar = createElement('nav', '', [
    {
        name: "class",
        value: `navBar`
    }
], [
    navBarHead,
    navList
])

export { navBar }
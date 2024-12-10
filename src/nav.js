import { createElement, createLink } from "./utils/dom.js";

export const NavBar = () => {
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
        // 'blog',
        // 'contact'
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
    
    
    return createElement('nav', '', [
        {
            name: "class",
            value: `navBar`
        }
    ], [
        navBarHead,
        navList
    ])
}

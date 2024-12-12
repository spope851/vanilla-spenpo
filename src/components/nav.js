import { Link } from "./link.js";

export const NavBar = ({ active }) => {
    const navBarHead = {
        component: Link,
        props: {
            href: '',
            attrs: {
                    id:
                    'nav-home-btn'
                ,
                    href:
                    ''
            },
            children: [{ tag: 'h1', text: 'Spencer Pope' }],
            active: active === '/'
        },
    }

    const pages = [
        'about',
        'now',
        'work',
        'nest',
        // 'blog',
        // 'contact'
    ];
    
    const createNavElement = (name) => {
        const navEl = {
            tag: 'li',
            children: [{ component: Link, props: { href: name, active: active.includes(name) } }]
        }
        return navEl
    };
    
    const navList = {
        tag: 'ul',
        attrs: 
            {
                class:
                `navList`
            }
        , 
        children: pages.map(name => createNavElement(name))
    };

    return {
        tag: 'nav',
        attrs:
            {
                class:
                `navBar`
            }
        , 
        children: [
            navBarHead,
            navList
        ]
    }
}

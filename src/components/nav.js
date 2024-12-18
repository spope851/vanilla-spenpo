import { Link } from "./link.js";

export const NavBar = ({ active }) => {
    const navBarHead = {
        tag: Link,
        props: {
            href: '',
            id: 'nav-home-btn',
            active: active === '/',
            children: [
                {
                    tag: 'h1',
                    props: {
                        class: 'logo',
                        children: ['Spencer Pope']
                    }
                },
                {
                    tag: 'img',
                    props: {
                        src: '../favicon.ico',
                        class: 'mobile-logo',
                        alt: 'mobile-logo',
                        height: 50
                    }
                }
            ],
        },
    }

    const pages = [
        'about',
        'now',
        'projects',
        'blog',
        // 'contact'
    ];
    
    const createNavElement = (name) => {
        const navEl = {
            tag: 'li',
            props: {
                children: [{ tag: Link, props: { href: name, active: active.includes(name) } }]
            }
        }
        return navEl
    };
    
    const navList = {
        tag: 'ul',
        props: {
            class: `navList`, 
            children: pages.map(name => createNavElement(name))
        }
    };

    return {
        tag: 'nav',
        props: {
            class: `navBar`, 
            children: [
                navBarHead,
                navList
            ]
        }
    }
}

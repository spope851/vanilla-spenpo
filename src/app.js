import { NavBar } from './components/nav.js';
import { StaticPage } from './pages/static.js';
import Router from './utils/router.js';
import { BrowserRouter } from './components/router.js';
import { Blog } from './pages/blog.js';
import { BlogPost } from './pages/blogpost.js';
import { Projects } from './pages/work.js';
import { Demo } from './components/demo/index.js';

const Route = ({ children, ...rest }) => {
    return {
        tag: 'div',
        props: {
            children: children.map(({ tag, props }) => ({
                tag,
                props: {
                    ...rest,
                    ...props,
                }
            }))
        }
    }
}

const routeProps = [
    {
        path: '/',
        slug: 'welcome'
    },
    {
        path: '/about',
        slug: 'about'
    },
    {
        path: '/now',
        slug: 'now'
    },
]

const routes = [
    ...routeProps.map(({ path, slug }) => ({ 
        tag: Route,
        props: {
            path, 
            children: [
                {
                    tag: StaticPage,
                    props: {
                        slug
                    }
                }
            ]
        }
    })),
    { 
        tag: Route,
        props: {
            path: '/projects', 
            children: [
                {
                    tag: Projects
                }
            ]
        }
    },
    { 
        tag: Route,
        props: {
            path: '/projects/:id', 
            children: [
                {
                    tag: Demo
                }
            ]
        }
    },
    { 
        tag: Route,
        props: {
            path: '/blog', 
            children: [
                {
                    tag: Blog
                }
            ]
        }
    },
    { 
        tag: Route,
        props: {
            path: '/blog/:id', 
            children: [
                {
                    tag: BlogPost
                }
            ]
        }
    }
]

export const App = () => {
    return {
        tag: 'div',
        props: {
            children: [
                { 
                    tag: NavBar, 
                    props: { 
                        active: Router.currentPath 
                    } 
                },
                {
                    tag: BrowserRouter,
                    props: {
                        children: routes,
                        key: 'root-router'
                    }
                },
            ]
        }
    }
};


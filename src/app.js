import { NavBar } from './components/nav.js';
import { StaticPage } from './pages/static.js';
import { Demo } from './components/demo/index.js';
import Router from './utils/router.js';
import { BrowserRouter } from './components/router.js';
import { Blog } from './pages/blog.js';
import { BlogPost } from './pages/blogpost.js';

const Route = ({
    children,
    // path
}) => {
    // console.log(`rendering ${path}`)
    
    return {
        tag: 'div',
        props: { children }
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
        path: '/work',
        slug: 'projects'
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
            path: '/demo', 
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


import { NavBar } from './components/nav.js';
import { StaticPage } from './pages/static.js';
import { Demo } from './components/demo/index.js';
import { Router } from './utils/router.js';
import { BrowserRouter } from './components/router.js';

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

const routes = [
    { 
        tag: Route,
        props: {
            path: '/', 
            children: [
                {
                    tag: StaticPage, 
                    props: {
                        slug: 'welcome'
                    }
                }
            ]
        }
    },
    { 
        tag: Route,
        props: {
            path: '/about', 
            children: [
                {
                    tag: StaticPage, 
                    props: {
                        slug: 'about'
                    }
                }
            ]
        }
    },
    { 
        tag: Route,
        props: {
            path: '/work', 
            children: [
                {
                    tag: StaticPage, 
                    props: {
                        slug: 'projects'
                    }
                }
            ]
        }
    },
    { 
        tag: Route,
        props: {
            path: '/now', 
            children: [
                {
                    tag: StaticPage, 
                    props: {
                        slug: 'now'
                    }
                }
            ]
        }
    },
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
                        children: routes
                    }
                },
            ]
        }
    }
};


import './styles.css';
import { NavBar } from './components/nav.js';
import Sven from './utils/sven.js';
import { Router } from './utils/router.js';
import { StaticPage } from './pages/static.js';
import { Nest } from './components/nest.js';

Sven.createRoot(document.getElementById('vanilla-spenpo-root'));

const routes = [
    { path: '/', tag: StaticPage, props: {
        slug: 'welcome'
    }},
    { path: '/about', tag: StaticPage, props: {
        slug: 'about'
    }},
    { path: '/work', tag: StaticPage, props: {
        slug: 'projects'
    }},
    { path: '/now', tag: StaticPage, props: {
        slug: 'now'
    }},
    { path: '/nest', tag: Nest },
];

const Body = {
    value: undefined,
    reEvaluate: (newPath) => {
        Body.value = routes.find(route => route.path === newPath)
    }
};

const renderPage = (path, isRerender = false) => {
    Body.reEvaluate(path)
    Sven.render({
        tag: 'div',
        props: {
            children: [
                { tag: NavBar, props: { active: path } },
                Body.value,
            ]
        }
    }, isRerender)
};

renderPage(Router.currentPath)

Router.subscribe((path) => renderPage(path, true));
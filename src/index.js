import './styles.css';
import { NavBar } from './components/nav.js';
import Sven from './utils/sven.js';
import { Router } from './utils/router.js';
import { StaticPage } from './pages/static.js';
import { Nest } from './components/nest.js';

Sven.createRoot(document.getElementById('vanilla-spenpo-root'));

const routes = [
    { path: '/', component: StaticPage, props: {
        slug: 'welcome'
    }},
    { path: '/about', component: StaticPage, props: {
        slug: 'about'
    }},
    { path: '/work', component: StaticPage, props: {
        slug: 'projects'
    }},
    { path: '/now', component: StaticPage, props: {
        slug: 'now'
    }},
    { path: '/nest', component: Nest },
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
        children: [
            { component: NavBar, props: { active: path } },
            Body.value,
        ]
    }, isRerender)
};

renderPage(Router.currentPath)

Router.subscribe((path) => renderPage(path, true));
import './styles.css';
import { NavBar } from './nav.js';
import { Sven } from './utils/render.js';
import { Router } from './utils/router.js';
import { StaticPage } from './pages/static.js';

Sven.createRoot(document.getElementById('vanilla-spenpo-root'))

const routes = [
    {path: '/', slug: 'welcome'},
    { path: '/about', slug: 'about'},
    { path: '/work', slug: 'projects'},
    { path: '/now', slug: 'now'},
]

Sven.render([
    NavBar(), 
    ...routes.map(route => StaticPage(route))
])

Router.notifySubscribers()
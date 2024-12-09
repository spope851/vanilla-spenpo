import './styles.css';
import { navBar } from './nav.js'
import { homePage } from './pages/home.js';
import { Router } from './router.js';
import { aboutPage } from './pages/about.js';

const SvenRouter = new Router([
    {
        name: "",
        component: [
            navBar,
            homePage
        ]
    },
    {
        name: "about",
        component: [
            navBar,
            aboutPage
        ]
    }
])

export { SvenRouter }

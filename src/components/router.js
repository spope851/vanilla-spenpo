import { Router } from '../utils/router.js';
import { useState } from '../utils/sven.js';

const getRoute = (routes, path) => {
    return routes.find(route => route.props.path === path)
}

export const BrowserRouter = ({ children }) => {
    console.log(children);
    
    const [body, setBody] = useState(getRoute(children, Router.currentPath))

    Router.subscribe((path) => {
        setBody(
            getRoute(children, path)
        )
    })

    return {
        tag: 'div',
        props: {
            children: [
                body,
            ]
        }
    }
};


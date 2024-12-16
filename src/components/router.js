import Router from '../utils/router.js';
import { useState } from '../utils/sven.js';

const getRoute = (routes, path) => {
    const mypath = path.split('?')[0]
    return routes.find(route => route.props.path === mypath)
}

export const BrowserRouter = ({ children, key }) => {
    const [body, setBody] = useState(getRoute(children, Router.currentPath))

    Router.subscribe((path) => {
        setBody(
            getRoute(children, path)
        )
    }, key)

    return {
        tag: 'div',
        props: {
            children: [
                body,
            ]
        }
    }
};


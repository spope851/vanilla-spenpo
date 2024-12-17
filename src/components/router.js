import Router from '../utils/router.js';
import { useState } from '../utils/sven.js';

const getRoute = (routes, path) => {
    const pathname = path.split('?')[0]
    return routes.find(route => {
        const regexString = route.props.path.split('/').map(segment => {
            if (segment.startsWith(":")) {
                // Convert wildcard segments to match any value
                return ".*"; // Match any characters
            }
            return segment; // Static segments remain unchanged
        }).join("/"); // Join back with slashes
    
        const regex = new RegExp(`^${regexString}$`); // Anchor to start and end of string
        return regex.test(pathname);
    })
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


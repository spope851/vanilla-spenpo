import { render } from "./render.js"

class Router { 
    constructor (routes) {
        this.routes = routes
        const pathname = window.location.pathname
        const pathlets = pathname.split('/')
        this.renderComponent(pathlets[1] || '')
    }

    renderComponent = (pathName) => {
        const currentRoute = this.routes.find(({ name }) => name === pathName)
        render(currentRoute.component)
    }

    push = (pathName) => {
        updateURL(pathName)
        this.renderComponent(pathName)
    }
}

const updateURL = (pathName) => {
    var newurl = window.location.protocol + "//" + window.location.host + "/" + pathName;
    window.history.pushState({path:newurl},'',newurl);
}

export {
    Router
}
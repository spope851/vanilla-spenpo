import { createElement } from "../utils/dom.js"
import { Router } from "../utils/router.js";

const LOADING = `<div class="loading"></div`

export const StaticPage = ({ path, slug }) => {
    let state;
    const content = createElement('div', '', [
        {
            name: "class",
            value: "content"
        }
    ])
    
    const fetchContent = async () => {
        content.innerHTML = LOADING
        const res = state || await fetch(`/api/page?slug=${slug}`).then(async res => {
            const page = await res.json()
            state = `<h2>${page.title.rendered}</h2>` + page.content.rendered
            return state
        })
        content.innerHTML = res
    }
    
    Router.subscribe(async (newPath) => {
        if (path === newPath) {
            await fetchContent()
        } else content.innerHTML = ''
    })

    return content
}

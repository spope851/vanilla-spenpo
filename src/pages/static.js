import { createElement } from "../utils/dom.js"
import { Router } from "../utils/router.js";

const LOADING = `<div class="loading"></div`

export const StaticPage = ({ path, slug }) => {
    const content = createElement('div', '', [
        {
            name: "class",
            value: "content"
        }
    ])
    content.innerHTML = LOADING

    const fetchContent = async () => fetch(`/api/page?slug=${slug}`).then(async res => {
            const page = await res.json()
            content.innerHTML = `<h2>${page.title.rendered}</h2>` + page.content.rendered
        }
    )
    
    Router.subscribe(async (newPath) => {
        if (path === newPath) {
            content.innerHTML = LOADING
            await fetchContent()
        } else content.innerHTML = ''
    })

    return content
}

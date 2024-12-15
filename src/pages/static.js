import { wrapPromise } from "../utils/sven.js";

const LOADING = `<div class="loading"></div`

export const StaticPage = ({ slug }) => {
    const innerHTML = wrapPromise(fetch(`/api/page?slug=${slug}`).then(async res => {
        const page = await res.json()
        return `<h2>${page.title.rendered}</h2>` + page.content.rendered
    }), `${slug}-page`)

    return {
        tag: 'div',
        props: {
                class: "content",
                innerHTML
        }
    }
}

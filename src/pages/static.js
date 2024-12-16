import { wrapPromise } from "../utils/sven.js";

const loadingState = `<div class="loading"></div>`

export const StaticPage = ({ slug }) => {
    const innerHTML = wrapPromise(async () => fetch(`/api/page?slug=${slug}`).then(async res => {
        const page = await res.json()
        return `<h2>${page.title.rendered}</h2>` + page.content.rendered
    }), `${slug}-page`, loadingState)

    return {
        tag: 'div',
        props: {
                class: "content",
                innerHTML,
        }
    }
}

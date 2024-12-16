import { wrapPromise } from "../utils/sven.js";

const loadingState = `<div class="loading"></div>`

export const StaticPage = ({ slug }) => {
    const post = wrapPromise(
        async () => fetch(`/api/page?slug=${slug}`).then(async res => {
            const page = await res.json()
            return page
        }),
        `${slug}-page`,
        loadingState
    )

    return {
        tag: 'div',
        props: {
                class: "content",
                children: [
                    {
                        tag: 'h2',
                        props: {
                            innerHTML: post.title.rendered
                        }
                    },
                    {
                        tag: 'div',
                        props: {
                            innerHTML: post.content.rendered,
                        }
                    }
                ]
        }
    }
}

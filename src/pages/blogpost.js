import { wrapPromise } from "../utils/sven.js";

const loadingState = `<div class="loading"></div>`

export const BlogPost = () => {
    const path = window.location.pathname
    const post = wrapPromise(
        async () => fetch(`/api${path}`).then(async res => {
            const page = await res.json()
            return page
        }),
        path,
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
                    },
                    {
                        tag: 'script',
                        props: {
                            src: 'https://introspective20s.com/wp-content/themes/twentytwentyfour-spenpo/includes/prism.js',
                            strategy: 'afterInteractive'
                        }
                    }
                ]
        }
    }
}

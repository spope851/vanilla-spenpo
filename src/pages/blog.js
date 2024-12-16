import { Link } from "../components/link.js";
import { navigate } from "../utils/router.js";
import { wrapPromise } from "../utils/sven.js";

const loadingState = `<div class="loading"></div>`

export const Blog = () => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const page = Number(params.get("page")) || 1
    const posts = wrapPromise(
        async () => fetch(`/api/blog${page ? `?page=${page}` : ""}`)
            .then(async res => res.json()),
        `blog-page-${page}`,
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
                            children: ["Blog"]
                        }
                    },
                    ...posts.data.map(({ id, title, excerpt, date }) => ({
                        tag: 'div',
                        props: {
                            children: [
                                {
                                    tag: 'div',
                                    props: {
                                        class: "blog-home-post",
                                        children: [
                                            {
                                                tag: Link,
                                                props: {
                                                    href: 'blog/' + id,
                                                    children: [{ tag: 'h3', props: { innerHTML: title.rendered } }],
                                                }
                                            },
                                            {
                                                tag: 'spen',
                                                props: {
                                                    children: [new Date(date).toDateString()]
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    tag: 'p',
                                    props: {
                                        innerHTML: excerpt.rendered
                                    }
                                }
                            ]
                        }
                    })),
                    {
                        tag: 'div',
                        props: {
                            class: "pagination-container",
                            children: [
                                {
                                    tag: 'div',
                                    props: {
                                        class: "pagination-buttons-container",
                                        children: [
                                            {
                                                tag: 'button',
                                                props: {
                                                    click: () => navigate(`/blog?page=${page - 1}`),
                                                    ...(page < 2 ? {disabled: true} : {}),
                                                    children: ["<"]
                                                }
                                            },
                                            {
                                                tag: 'span',
                                                props: {
                                                    children: [`page ${page} of ${posts.meta.totalPages}`]
                                                }
                                            },
                                            {
                                                tag: 'button',
                                                props: {
                                                    click: () => navigate(`/blog?page=${page + 1}`),
                                                    ...(page > posts.meta.totalPages - 1 ? {disabled: true} : {}),
                                                    children: [">"]
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    tag: 'div',
                                    props: {
                                        class: "pagination-count",
                                        children: [`${posts.data.length} of ${posts.meta.totalPosts} posts`]
                                    }
                                }
                            ]
                        }
                    },
                ]
        }
    }
}

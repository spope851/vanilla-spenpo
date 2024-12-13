import { Router } from "../utils/router.js"

export const Link = ({ href, title, children, active, ...props }) => ({
    tag: 'a',
    props: {
        href: `/${href}`,
        class: `spenpo-link-${href}${active && ' active'}`,
        click: (e) => {
            e.preventDefault()
            Router.navigate(`/${href}`)
        },
        children: [ ...children || title || href ],
        ...props
    },
})
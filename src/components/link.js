import { navigate } from "../utils/router.js"

export const Link = ({ href, title, children, active, ...props }) => ({
    tag: 'a',
    props: {
        href: `/${href}`,
        class: `spenpo-link${active ? ' active' : ''}`,
        click: (e) => {
            e.preventDefault()
            navigate(`/${href}`)
        },
        children: [ ...children || title || href ],
        ...props
    },
})
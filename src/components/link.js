import { Router } from "../utils/router.js"

export const Link = ({ href, title, attrs, children, active }) => {
    const elAttrs =
        {
            href:
            `/${href}`
        ,
            class:
            `spenpo-link-${href}${active && ' active'}`
        }

    return {
        tag: 'a', 
        text: title || href,
        attrs: { ...elAttrs, ...attrs },
        children,
        listeners:
            {
                // intercept click event to rerender the spa
                click:
                (e) => {
                    e.preventDefault()
                    Router.navigate(`/${href}`)
                }
            }
    }
}
import { Demo } from "../components/demo/index.js"
import { StaticPage } from "./static.js"

export const Projects = () => {

    return {
        tag: 'div',
        props: {
            children: [
                {
                    tag: StaticPage,
                    props: {
                        slug: 'projects'
                    }
                },
                {
                    tag: Demo
                }
            ]
        }
    }
}
import { Link } from "../link.js";
import { Color } from "./color.js";
import { Count } from "./count.js";
import { Nest } from "./nest.js";

const demos = [
    {
        name: 'color',
        Component: Color,
        description: "a button that changes to a random color"
    },
    {
        name: 'count',
        Component: Count,
        description: "this framework has state"
    },
    {
        name: 'nest',
        Component: Nest,
        description: "the framework nests elements efficiently"
    },
    
]

export const Demo = ({ id }) => {
    let demo = demos.find(d => d.name === id)
    if (!demo) demo = {
        Component: 'div',
        description: "choose one"
    }

    return {
        tag: 'div',
        props: {
            class: 'projects',
            children: [
                {
                    tag: 'div',
                    props: {
                        class: 'tabs',
                        children: demos.map(({ name }) => {
                            return {
                                tag: Link,
                                props: {
                                    href: `projects/${name}`,
                                    title: name,
                                    active: name === demo.name
                                }
                            }
                        })
                    }
                },
                {
                    tag: 'table',
                    props: {
                        class: "demo-table",
                        children: [
                            {
                                tag: "thead",
                                props: {
                                    children: [
                                        {
                                            tag: "th",
                                            props: {
                                                class: 'description',
                                                children: ["info"]
                                            }
                                        },
                                        {
                                            tag: "th",
                                            props: {
                                                class: 'demo',
                                                children: ["demo"]
                                            }
                                        }
                                    ]
                                }
                            },
                            {
                                tag: "tbody",
                                props: {
                                    children: [
                                        {
                                            tag: "tr",
                                            props: {
                                                children: [
                                                    {
                                                        tag: "td",
                                                        props: {
                                                            class: 'description',
                                                            children: [{
                                                                tag: 'p',
                                                                props: {
                                                                    children: [demo.description]
                                                                }
                                                            }]
                                                        }
                                                    },
                                                    {
                                                        tag: "td",
                                                        props: {
                                                            class: 'demo',
                                                            children: [
                                                                {
                                                                    tag: demo.Component
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
            ]
        }
    }
}
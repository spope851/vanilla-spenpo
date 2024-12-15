import { useState } from "../../utils/sven.js"

export const Count = () => {
    const [count, setCount] = useState(0)

    return {
        tag: 'div',
        props: {
            style: 'display: flex; gap: 10px',
            children: [
                `the count is ${count}`,
                {
                    tag: 'button',
                    props: {
                        click: () => setCount(count - 1),
                        children: ["-"]
                    }
                },
                {
                    tag: 'button',
                    props: {
                        click: () => setCount(count + 1),
                        children: ["+"]
                    }
                },
            ]
        },
    }
}
import { useState } from "../../utils/sven.js"

const getRandBaseST = () => Math.floor(Math.random() * 15).toString(16)

const getRandColor = () => `#${Array.from({ length: 6 }, getRandBaseST).join('')}`

export const Color = () => {
    const [color, setColor] = useState('#ffffff')

    return {
        tag: 'div',
        props: {
            children: [
                {
                    tag: 'button',
                    props: {
                        click: () => setColor(getRandColor()),
                        style: `background-color: ${color}`,
                        children: ["click me"]
                    }
                }
            ]
        },
    }
}
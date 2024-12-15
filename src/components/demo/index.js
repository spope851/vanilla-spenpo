import { Color } from "./color.js";
import { Count } from "./count.js";
import { Nest } from "./nest.js";

export const Demo = () => ({
    tag: 'div',
    props: {
        style: 'display: flex; flex-direction: column; gap: 20px; padding: 20px;',
        children: [
            {
                tag: Color
            },
            {
                tag: Count
            },
            {
                tag: Nest
            },
        ]
    }
})
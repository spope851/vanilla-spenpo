export const Nest = () => ({
    tag: 'div',
    props: {
        style: 'outline: solid red; padding: 20px; display: flex; gap: 20px;',
        children: [
            {
                tag: 'div',
                props: {
                    style: 'outline: solid blue; padding: 20px; flex: 1; display: flex; gap: 20px;',
                    children: [
                        {
                            tag: 'div',
                            props: {
                                style: 'outline: solid pink; padding: 20px; flex: 1;'
                            },
                        },
                        {
                            tag: 'div',
                            props: {
                                style: 'outline: solid purple; padding: 20px; flex: 1;'
                            },
                        }
                    ],
                },
            },
            {
                tag: 'div',
                props: {
                    style: 'outline: solid green; padding: 20px;'
                },
            }
        ]
    },
})
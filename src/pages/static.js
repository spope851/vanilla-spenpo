const LOADING = `<div class="loading"></div`

export const StaticPage = ({ slug }) => {
    let state;
    const content = {
        tag: 'div',
        props: {
                class: "content",
                DOMContentLoaded: async () => {
                    content.props.innerHTML = LOADING
                    
                    const res = state || await fetch(`/api/page?slug=${slug}`).then(async res => {
                        const page = await res.json()
                        console.log(page);
                        
                        state = `<h2>${page.title.rendered}</h2>` + page.content.rendered
                        return state
                    })
                    
                    content.props.innerHTML = res
                }
        },
    }
    
    return content
}

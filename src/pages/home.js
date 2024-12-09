const homePage = async () => fetch('/api/home').then(async res => {
        const page = await res.json()
        const content = document.createElement('div')
        content.setAttribute("class", "content")
        content.innerHTML = `<h2>${page.title.rendered}</h2>` + page.content.rendered
        return content
    }
)

export { homePage }
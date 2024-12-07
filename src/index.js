import './styles.css';

fetch('/api/home').then(async res => {
    const page = await res.json()
    const root = document.getElementById('vanilla-spenpo-root')
    root.innerHTML = `<h2>${page.title.rendered}</h2>` + page.content.rendered
})

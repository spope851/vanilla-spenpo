import mockPages from '../tests/mock/pages.json' with { type: "json" }

const ROOT = "https://introspective20s.com/wp-json/wp/v2/"
export default async function getPage(req, res) {
    const slug = req.query.slug
    if (req.headers.host.includes('localhost') && mockPages[slug]) {
        res.status(200).json(mockPages[slug]);
    } else {
        const page = await fetch(
            `${ROOT}${slug === 'now' ? 'posts?tags=28&per_page=1' : `pages?slug=${slug}`}`
        ).then(rez => rez.json())
        res.status(200).json(page[0]);
    }
}
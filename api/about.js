import mockPage from '../tests/mock/pages/about.json' with { type: "json" }

export default async function about(req, res) {
    if (req.headers.host.includes('localhost')) {
        res.status(200).json(mockPage);
    } else {
        const page = await fetch(
            `https://introspective20s.com/wp-json/wp/v2/pages?slug=about`
        ).then(rez => rez.json())
        res.status(200).json(page[0]);
    }
}
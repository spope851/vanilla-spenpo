export default async function home(_req, res) {
    const page = await fetch(
        `https://introspective20s.com/wp-json/wp/v2/pages?slug=welcome`
    ).then(rez => rez.json())
    res.status(200).json(page[0]);
}
export default async function blog(req, res) {
    const posts = await fetch(
        `https://introspective20s.com/wp-json/wp/v2/posts?page=${req.query.page || 1}`
    ).then(rez => rez.json())
    
    res.status(200).json(posts);
  }
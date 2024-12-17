export default async function blogpost(req, res) {
    const host = req.headers["host"]
    const id = req.query.id
    
    if (host.includes('localhost')) {
        import('../../../mock/sven/blog.js').then(module => {
            const mockPosts = module.default;
            let mock = mockPosts[1].find(post => post.id === Number(id))
            if (!mock) mock = mockPosts[2].find(post => post.id === Number(id))
            res.status(200).json(mock);
        });
    } else {
        const post = await fetch(
            `https://introspective20s.com/wp-json/wp/v2/posts/${id}`
        ).then(async rez => rez.json())

        res.status(200).json(post);
    }
  }
import mockPosts from '../tests/mock/blog.json' with { type: "json" }

const postsPerPage = 10

export default async function blog(req, res) {
    const page = req.query.page
    if (req.headers.host.includes('localhost') && mockPosts[page]) {
        res.status(200).json({
            data: mockPosts[page],
            meta: {
                totalPages: 2,
                totalPosts: 12
            }
        });
    } else {
        const posts = await fetch(
            `https://introspective20s.com/wp-json/wp/v2/posts?page=${req.query.page || 1}`
        ).then(async rez => {
            const data = await rez.json()
            const totalPosts = parseInt(rez.headers.get('X-WP-Total') || '0')
            const totalPages = Math.ceil(totalPosts / postsPerPage)

            return { data, meta: { totalPages, totalPosts }}
        })


        res.status(200).json(posts);
    }
  }
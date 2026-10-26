import BlogPost from '../components/BlogPost.jsx'
import { getSortedPosts, usePageMeta } from '../utils.js'

export default function Blog() {
  usePageMeta('Blog', 'All articles about technology, programming, and learning.')

  const posts = getSortedPosts()

  return (
    <section>
      <h1 className="page-title">Blog</h1>
      <p className="page-lead">Check My Personal Projects.</p>
      <div className="post-list">
        {posts.map((post) => (
          <BlogPost key={post.slug} post={post} />
        ))}
      </div>
    </section>
  )
}

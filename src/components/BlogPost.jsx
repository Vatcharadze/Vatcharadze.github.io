import { Link } from 'react-router-dom'
import { formatDate, getReadingTime } from '../utils.js'

// One post in a list: title, meta info, and short description.
// Set showReadingTime={false} to hide the reading time (used on the home page).
export default function BlogPost({ post, showReadingTime = true }) {
  return (
    <article className="post-item">
      <h3 className="post-title">
        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>
      <div className="post-meta">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span className="category">{post.category}</span>
        {showReadingTime && <span>{getReadingTime(post)} min read</span>}
      </div>
      <p className="post-description">{post.description}</p>
    </article>
  )
}

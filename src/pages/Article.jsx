import { Link, useParams } from 'react-router-dom'
import { posts } from '../data/posts.js'
import { formatDate, getReadingTime, usePageMeta } from '../utils.js'
import NotFound from './NotFound.jsx'

// Shows text that may be a plain string or a mix of strings and links.
function Inline({ content }) {
  if (typeof content === 'string') return content

  return content.map((part, index) => {
    if (typeof part === 'string') return part
    const isExternal = part.href.startsWith('http')
    return (
      <a
        key={index}
        href={part.href}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {part.text}
      </a>
    )
  })
}

// Turns one content block from posts.js into the right HTML element.
function Block({ block }) {
  switch (block.type) {
    case 'heading':
      return <h2>{block.text}</h2>
    case 'paragraph':
      return (
        <p>
          <Inline content={block.text} />
        </p>
      )
    case 'list':
      return (
        <ul>
          {block.items.map((item, index) => (
            <li key={index}>
              <Inline content={item} />
            </li>
          ))}
        </ul>
      )
    case 'code':
      return (
        <pre>
          <code>{block.code}</code>
        </pre>
      )
    default:
      return null
  }
}

export default function Article() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)

  usePageMeta(post ? post.title : 'Not found', post ? post.description : '')

  if (!post) return <NotFound />

  return (
    <article className="article">
      <Link to="/blog" className="back-link">&larr; Back to blog</Link>

      <header className="article-header">
        <h1>{post.title}</h1>
        <div className="post-meta">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="category">{post.category}</span>
          <span>{getReadingTime(post)} min read</span>
        </div>
      </header>

      <div className="article-body">
        {post.content.map((block, index) => (
          <Block key={index} block={block} />
        ))}
      </div>

      <footer className="article-footer">
        <Link to="/blog" className="back-link">&larr; Back to blog</Link>
      </footer>
    </article>
  )
}

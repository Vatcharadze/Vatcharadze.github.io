import { Link } from 'react-router-dom'
import { usePageMeta } from '../utils.js'

export default function NotFound() {
  usePageMeta('Page not found', 'This page could not be found.')

  return (
    <section className="intro">
      <h1>Page not found</h1>
      <p>The page you're looking for doesn't exist or may have moved.</p>
      <p>
        <Link to="/blog" className="text-link">Browse all posts</Link>
      </p>
    </section>
  )
}

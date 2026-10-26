import { Link } from 'react-router-dom'
import BlogPost from '../components/BlogPost.jsx'
import SocialLinks from '../components/SocialLinks.jsx'
import { profile } from '../data/profile.js'
import { getSortedPosts, usePageMeta } from '../utils.js'

export default function Home() {
  usePageMeta('Davit Vatcharadze', "A personal blog about technology, programming, and things I've learned.")

  const recentPosts = getSortedPosts().slice(0, 5)

  return (
    <>
      <section className="intro home-intro">
        <img
          className="profile-photo"
          src={profile.photo}
          alt={`Photo of ${profile.name}`}
          width="128"
          height="128"
        />
        <SocialLinks />
        <p>Davit Vatcharadze | DevOps Engineer</p>
        <h1>Check Out My Personal Projects.</h1>
      </section>

      <section aria-labelledby="recent-heading">
        <div className="section-header">
          <h2 id="recent-heading">Recent posts</h2>
          <Link to="/blog" className="text-link">View all posts</Link>
        </div>
        <div className="post-list">
          {recentPosts.map((post) => (
            <BlogPost key={post.slug} post={post} showReadingTime={false} />
          ))}
        </div>
      </section>
    </>
  )
}
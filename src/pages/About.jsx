import { usePageMeta } from '../utils.js'

export default function About() {
  usePageMeta('About', 'About the Davit Vatcharadze.')

  return (
    <section className="article">
      <h1 className="page-title">About</h1>
      <div className="article-body">
        <p>
        I'm a Computer Science student passionate about technology, programming, and DevOps. I enjoy learning new skills, exploring different technologies, and building projects that help me grow as a developer.
         I'm always looking for new challenges and opportunities to improve my knowledge and experience.
        </p>
        
        <h2>Get in touch</h2>
        <p>
          You can reach me at <a href="mailto:dato.vatcharadze@gmail.com">dato.vatcharadze@gmail.com</a>.
        </p>
      </div>
    </section>
  )
}

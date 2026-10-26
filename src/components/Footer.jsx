import SocialLinks from './SocialLinks.jsx'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
        <SocialLinks />
      </div>
    </footer>
  )
}
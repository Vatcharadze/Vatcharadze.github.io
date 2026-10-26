import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="site-name">
          Davit Vatcharadze
        </Link>
        <nav aria-label="Main navigation">
          <ul className="nav-links">
            <li>
              <NavLink to="/" end>Home</NavLink>
            </li>
            <li>
              <NavLink to="/blog">Blog</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

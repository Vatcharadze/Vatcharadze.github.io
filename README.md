# My Blog

A simple, minimalist personal blog built with React, Vite, and plain CSS.
No backend, no database, no extra libraries. The only dependency besides React is React Router, which handles the page links.

## Install and run

You need [Node.js](https://nodejs.org) (version 18 or newer).

```bash
npm install
npm run dev
```

Open the address shown in the terminal (usually http://localhost:5173).

## Build for production

```bash
npm run build
```

This creates a `dist` folder with the finished site. To preview it locally, run `npm run preview`.

When you host the site (Netlify, Vercel, GitHub Pages, etc.), configure the host to serve `index.html` for every path. Otherwise opening a link like `/blog/my-post` directly will show a 404.

## Folder structure

```
index.html            Page title and SEO metadata
public/               Static files (favicon)
src/
  main.jsx            Starts the app
  App.jsx             Page routes
  index.css           All styling
  utils.js            Small helpers (dates, reading time, page titles)
  components/
    Navbar.jsx        Top navigation
    Footer.jsx        Footer
    BlogPost.jsx      One post in a list
  pages/
    Home.jsx          Intro and recent posts
    Blog.jsx          All posts
    Article.jsx       A single article
    About.jsx         About page
    NotFound.jsx      Shown for unknown addresses
  data/
    posts.js          Your blog posts
```

## Add or edit a post

Open `src/data/posts.js`. Each post is an object in the `posts` list. Copy one, change its `slug`, `title`, `date` (format `YYYY-MM-DD`), `category`, `description`, and `content`, and it appears on the site automatically. Posts are sorted by date, and the reading time is calculated for you.

The `content` of a post is a list of blocks:

```js
{ type: 'heading',   text: 'A section title' }
{ type: 'paragraph', text: 'Some text.' }
{ type: 'paragraph', text: ['Text with ', { text: 'a link', href: 'https://example.com' }, '.'] }
{ type: 'list',      items: ['First item', 'Second item'] }
{ type: 'code',      code: 'echo "hello"' }
```

To delete a post, remove its object from the list.

## Make it yours

- Blog name: change "My Blog" in `src/components/Navbar.jsx`, `src/components/Footer.jsx`, `src/utils.js`, and `index.html`.
- Intro text: edit `src/pages/Home.jsx`.
- Biography: edit `src/pages/About.jsx`.
- SEO: update the `title`, `description`, and `author` in `index.html`.
- Colors and fonts: change the variables at the top of `src/index.css`.

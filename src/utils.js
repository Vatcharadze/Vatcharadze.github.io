import { useEffect } from 'react'
import { posts } from './data/posts.js'

// "2026-10-18" -> "October 18, 2026"
export function formatDate(dateString) {
  return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Returns all posts, newest first.
export function getSortedPosts() {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1))
}

// Text can be a plain string or a list of strings and links.
function inlineToText(content) {
  if (typeof content === 'string') return content
  return content.map((part) => (typeof part === 'string' ? part : part.text)).join('')
}

// Estimates reading time at about 200 words per minute.
export function getReadingTime(post) {
  const text = post.content
    .map((block) => {
      if (block.type === 'list') return block.items.map(inlineToText).join(' ')
      if (block.type === 'code') return block.code
      return inlineToText(block.text)
    })
    .join(' ')
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

// Sets the browser tab title and the meta description for each page.
export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | My Blog` : 'My Blog'
    const meta = document.querySelector('meta[name="description"]')
    if (meta && description) meta.setAttribute('content', description)
  }, [title, description])
}

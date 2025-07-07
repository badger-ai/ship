'use client'

import Link from 'next/link'

export default function Blog({ posts }) {
  return (
    <div className="section">
      <div className="container">
        <div className="section-title">
          <h1>Our Blog</h1>
          <p>Latest news, tips, and updates about shipping and logistics</p>
        </div>

        <div className="blog-grid">
          {posts.map((post) => (
            <article key={post.id} className="blog-card">
              <img src={post.image} alt={post.title} className="blog-image" />
              <div className="blog-content">
                <p className="blog-date">{post.date}</p>
                <h2 className="blog-title">{post.title}</h2>
                <p className="blog-excerpt">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="blog-read-more">
              
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

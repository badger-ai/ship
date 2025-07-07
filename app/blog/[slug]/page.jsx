export default function BlogPost({ params }) {
  const blogPosts = {
    "10-tips-for-safe-package-shipping": {
      title: "10 Tips for Safe Package Shipping",
      content: `
        <p>Shipping packages safely requires careful preparation and attention to detail. Here are our top 10 tips:</p>
        <ol>
          <li>Choose the right box size - not too big with empty space, not too small causing pressure</li>
          <li>Use quality packing materials - bubble wrap, packing peanuts, or air pillows</li>
          <li>Wrap items individually - especially fragile ones</li>
          <li>Fill empty spaces - to prevent movement during transit</li>
          <li>Use strong tape - reinforce all seams and edges</li>
          <li>Label clearly - include both "to" and "from" addresses</li>
          <li>Consider insurance - for valuable items</li>
          <li>Waterproof when necessary - for items sensitive to moisture</li>
          <li>Double-check restrictions - especially for international shipping</li>
          <li>Take photos - of contents before packing for documentation</li>
        </ol>
        <p>Following these tips will help ensure your packages arrive safely at their destination.</p>
      `,
      date: "May 15, 2023",
      image: "/blog1.jpg",
      author: "Jane Smith"
    },
    // Add similar content for other blog posts
  };

  const post = blogPosts[params.slug];

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="section">
      <div className="container">
        <article className="blog-post">
          <img src={post.image} alt={post.title} className="blog-post-image" />
          <div className="blog-post-meta">
            <p className="blog-post-date">{post.date}</p>
            <p className="blog-post-author">By {post.author}</p>
          </div>
          <h1 className="blog-post-title">{post.title}</h1>
          <div 
            className="blog-post-content" 
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </article>
      </div>
    </div>
  );
}
import Link from 'next/link';

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "10 Tips for Safe Package Shipping",
      excerpt: "Learn how to properly package your items to ensure they arrive safely at their destination.",
      date: "May 15, 2023",
      image: "/blog1.jpg",
      slug: "10-tips-for-safe-package-shipping"
    },
    {
      id: 2,
      title: "Understanding Shipping Costs",
      excerpt: "A comprehensive guide to how shipping costs are calculated and how you can save money.",
      date: "June 2, 2023",
      image: "/blog2.jpg",
      slug: "understanding-shipping-costs"
    },
    {
      id: 3,
      title: "International Shipping Made Easy",
      excerpt: "Everything you need to know about shipping packages internationally without hassle.",
      date: "June 18, 2023",
      image: "/blog3.jpg",
      slug: "international-shipping-made-easy"
    },
    {
      id: 4,
      title: "Tracking Your Packages: A Complete Guide",
      excerpt: "How to effectively use our tracking system to monitor your shipments in real-time.",
      date: "July 5, 2023",
      image: "/blog4.jpg",
      slug: "tracking-your-packages-guide"
    },
    {
      id: 5,
      title: "Eco-Friendly Shipping Options",
      excerpt: "Discover our green shipping initiatives and how you can reduce your carbon footprint.",
      date: "July 22, 2023",
      image: "/blog5.jpg",
      slug: "eco-friendly-shipping-options"
    }
  ];

  return (
    <div className="section">
      <div className="container">
        <div className="section-title">
          <h1>Our Blog</h1>
          <p>Latest news, tips, and updates about shipping and logistics</p>
        </div>
        
        <div className="blog-grid">
          {blogPosts.map(post => (
            <article key={post.id} className="blog-card">
              <img src={post.image} alt={post.title} className="blog-image" />
              <div className="blog-content">
                <p className="blog-date">{post.date}</p>
                <h2 className="blog-title">{post.title}</h2>
                <p className="blog-excerpt">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="blog-read-more">Read More →</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
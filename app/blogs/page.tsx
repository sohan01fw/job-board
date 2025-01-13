import Image from "next/image";
import Link from "next/link";

// Sample blog data
const blogs = [
  {
    id: 1,
    title: "How to Ace Your Next Job Interview",
    description:
      "Preparing for a job interview can be nerve-wracking, but with the right strategies, you can stand out from the crowd. Learn how to research the company, anticipate common questions, and present your best self during interviews. This guide provides actionable tips for each stage of the interview process, ensuring you walk in with confidence and leave a lasting impression.",
    imageUrl:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    author: "Jane Doe",
    date: "January 10, 2025",
  },
  {
    id: 2,
    title: "Top 10 In-Demand Tech Skills in 2025",
    description:
      "The tech industry is evolving rapidly, and staying up-to-date with the most sought-after skills is essential for success. From cloud computing and cybersecurity to machine learning and blockchain development, discover the top skills employers are looking for in 2025. This blog explores each skill's importance, practical applications, and resources to help you get started.",
    imageUrl:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    author: "John Smith",
    date: "January 8, 2025",
  },
  {
    id: 3,
    title: "Building a Standout Resume",
    description:
      "Creating a compelling resume is crucial in the competitive job market. This blog walks you through best practices for crafting a document that highlights your skills, experiences, and achievements. Learn how to tailor your resume for specific roles, choose the right format, and avoid common mistakes that could cost you an interview.",
    imageUrl:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    author: "Emily Clark",
    date: "January 5, 2025",
  },
];

export default function BlogsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">
        Latest Blog Posts
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              width={600}
              height={400}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2 hover:text-primary">
                <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
              </h2>
              <p className="text-muted-foreground mb-4">{blog.description}</p>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>By {blog.author}</span>
                <span>{blog.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

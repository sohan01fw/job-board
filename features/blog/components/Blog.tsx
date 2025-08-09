import Image from "next/image";
import Link from "next/link";
import { blogs } from "../data";

export default function Blog() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">
        Latest Blog Posts
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Link
            href={`/blogs/${blog.id}`}
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
                {blog.title}
              </h2>
              <p className="text-muted-foreground mb-4">{blog.description}</p>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>By {blog.author}</span>
                <span>{blog.date}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

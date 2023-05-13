import Layout from "@/components/layout";
import { readFileSync, readdirSync } from "fs";
import matter from "gray-matter";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";

interface Post {
  title: string;
  date: string;
  category: string;
  slug: string;
}

const Blog: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <Layout title="Blogs" seoTitle="Blogs">
      <h1 className="mb-6 text-lg font-semibold">Latest Posts:</h1>
      <div className="space-y-2 divide-y-2">
        {posts.map((post, index) => (
          <Link key={index} href={`/blog/${post.slug}`}>
            <div className="py-4">
              <span>{post.title}</span>
              <div>
                <span>
                  {post.date} / {post.category}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const blogPosts = readdirSync("./src/posts").map((file) => {
    const content = readFileSync(`./src/posts/${file}`, "utf-8");
    const [slug, _] = file.split(".");
    return { ...matter(content).data, slug };
  });

  return {
    props: { posts: blogPosts.reverse() },
  };
};

export default Blog;

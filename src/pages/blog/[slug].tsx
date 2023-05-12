import { readdirSync } from "fs";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import matter from "gray-matter";
import remarkHtml from "remark-html";
import { unified } from "unified";
import remarkParse from "remark-parse/lib";
import Layout from "@/components/layout";

const Post: NextPage<{ post: string; data: any }> = ({ post, data }) => {
  return (
    <Layout title={data.title} seoTitle={data.title}>
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: post }}
      />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const files = readdirSync("./src/posts").map((file) => {
    const [name, extension] = file.split(".");
    return { params: { slug: name } };
  });
  return {
    paths: files,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  //Read file using matter
  const { content, data } = matter.read(`./src/posts/${ctx.params?.slug}.md`);

  //Change to html using Markdown
  const { value } = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(content);
  return {
    props: { data, post: value },
  };
};

export default Post;

import client from "@/libs/server/client";
import FloatButton from "@/components/floating-button";
import Layout from "@/components/layout";
// import useCoords from "@/libs/client/useCoords";
import useInfiniteScroll from "@/libs/client/useInfiniteScroll";
import { Post, User } from "@prisma/client";
import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR, { SWRConfig } from "swr";
import useSWRInfinite, { unstable_serialize } from "swr/infinite";

interface PostWithUser extends Post {
  user: User;
  _count: {
    interests: number;
    answers: number;
  };
}

interface PostsResponse {
  posts: PostWithUser[];
  totalPage: number;
}

interface CountProps {
  interests: number;
  answers: number;
}

const Counts = ({ interests, answers }: CountProps) => {
  // const { data } = useSWR<PostsResponse>(`/api/posts`);

  return (
    <div className="mt-3 flex w-full space-x-5 border-b-2 border-t py-2.5 text-gray-700">
      <span className="flex items-center space-x-2 text-sm">
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>{interests}</span>
      </span>
      <span className="flex items-center space-x-2 text-sm">
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          ></path>
        </svg>
        <span>{answers}</span>
      </span>
    </div>
  );
};

const Community: NextPage<PostsResponse> = ({ posts }) => {
  // const { latitude, longitude } = useCoords();

  // const { data } = useSWR<PostsResponse>(
  //   latitude && longitude
  //     ? `/api/posts?latitude=${latitude}&longitude=${longitude}`
  //     : null
  // );

  // const { data, setSize } = useSWRInfinite<PostsResponse>(getKey);
  // const [posts, setPosts] = useState<PostWithUser[]>([]);

  // useEffect(() => {
  //   if (data) {
  //     setPosts([]);
  //     data.map((obj) => {
  //       setPosts((prev) => prev.concat(obj.posts));
  //     });
  //   }
  // }, [data]);

  // const page = useInfiniteScroll();

  // useEffect(() => {
  //   setSize(page);
  // }, [setSize, page]);

  return (
    <Layout title="Community" hasTabBar seoTitle="Community">
      <div className="space-y-8 px-5 py-5">
        {posts.map((post) => (
          <div key={post.id} className="flex flex-col items-start">
            <Link
              className="flex w-full flex-col items-start"
              href={`/community/${post.id}`}
            >
              <span className="flex items-center rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                Q&A
              </span>
              <div className="mt-2 text-gray-700">
                <span className="font-medium text-orange-500">Q. </span>
                {post.question}
              </div>
              <div className="mt-5 flex w-full items-center justify-between text-xs font-medium text-gray-500">
                <span>{post.user.name}</span>
                <span>{String(post.createdAt)}</span>
              </div>
              <Counts
                interests={post._count.interests}
                answers={post._count.answers}
              />
            </Link>
          </div>
        ))}
        <FloatButton href="/community/write">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            ></path>
          </svg>
        </FloatButton>
      </div>
    </Layout>
  );
};

export default Community;

export const getStaticProps: GetStaticProps = async () => {
  const posts = await client.post.findMany({
    take: 10,
    skip: 0,
    orderBy: [
      {
        createdAt: "desc",
      },
      {
        id: "desc",
      },
    ],
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      _count: {
        select: {
          interests: true,
          answers: true,
        },
      },
    },
  });
  const postCount = await client.post.count();
  return {
    props: {
      // ok: true,
      posts: JSON.parse(JSON.stringify(posts)),
      totalPage: Math.ceil(postCount / 10),
    },
  };
};

//------------SSR-------------//
// const communityPage: NextPage<PostsResponse> = ({ posts, totalPage }) => {
//   return (
//     <SWRConfig
//       value={{
//         fallback: {
//           [unstable_serialize(getKey)]: [{ ok: true, posts, totalPage }],
//         },
//       }}
//     >
//       <Community />
//     </SWRConfig>
//   );
// };

// const getKey = (pageIndex: number, previousPageData: PostsResponse) => {
//   if (pageIndex === 0) return `/api/posts?page=1`;
//   const page = pageIndex + 1;
//   if (page > previousPageData.totalPage) return null;
//   return `/api/posts?page=${page}`;
// };

// export const getServerSideProps: GetServerSideProps = async () => {
//   const posts = await client.post.findMany({
//     take: 10,
//     skip: 0,
//     orderBy: [
//       {
//         createdAt: "desc",
//       },
//       {
//         id: "desc",
//       },
//     ],
//     include: {
//       user: {
//         select: {
//           id: true,
//           name: true,
//           avatar: true,
//         },
//       },
//       _count: {
//         select: {
//           interests: true,
//           answers: true,
//         },
//       },
//     },
//   });
//   const postCount = await client.post.count();

//   return {
//     props: {
//       ok: true,
//       posts: JSON.parse(JSON.stringify(posts)),
//       totalPage: Math.ceil(postCount / 10),
//     },
//   };
// };

// export default communityPage;

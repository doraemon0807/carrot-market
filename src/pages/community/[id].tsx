import Avatar from "@/components/avatar";
import Button from "@/components/button";
import Layout from "@/components/layout";
import TextArea from "@/components/textarea";
import useMutation from "@/libs/client/useMutation";
import { cls } from "@/libs/client/utils";
import { Answer, Post, User } from "@prisma/client";
import type {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
  NextPageContext,
} from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR, { SWRConfig } from "swr";
import client from "@/libs/server/client";
import { withSsrSession } from "@/libs/server/withSession";

interface AnswerWithUser extends Answer {
  user: User;
}

interface PostWithUser extends Post {
  user: User;
  _count: {
    answers: number;
    interests: number;
  };
  answers: AnswerWithUser[];
}

interface CommunityPostResponse {
  // ok: boolean;
  post: PostWithUser;
  isInterested: boolean;
}

interface AnswerForm {
  answer: string;
}

interface AnswerResponse {
  ok: boolean;
  answer: Answer;
}

interface InterestResponse {
  ok: boolean;
  isInterested: boolean;
}

const Answers = () => {
  const router = useRouter();
  const { data } = useSWR<CommunityPostResponse>(
    router.query.id ? `/api/posts/${router.query.id}` : null
  );
  return (
    <>
      {data?.post.answers.map((answer) => (
        <div key={answer.id} className="flex items-start space-x-3">
          <Avatar
            id={answer.user.id + ""}
            imgId={answer.user.avatar}
            size="small"
          />
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="block text-sm font-medium text-gray-700">
                {answer.user.name}
              </span>
              <span className="block text-xs text-gray-500 ">
                {String(answer.createdAt)}
              </span>
            </div>
            <p className="mt-2 text-gray-700">{answer.answer}</p>
          </div>
        </div>
      ))}
    </>
  );
};

const Counts = () => {
  const router = useRouter();

  //API to toggle interest
  const [interest, { loading }] = useMutation<InterestResponse>(
    `/api/posts/${router.query.id}/interest`
  );

  const { data, mutate } = useSWR<CommunityPostResponse>(
    router.query.id ? `/api/posts/${router.query.id}` : null
  );

  const onInterestClick = () => {
    if (!data) return;
    mutate(
      (prev: any) => ({
        ...prev,
        post: {
          ...prev.post,
          _count: {
            ...prev.post._count,
            interests: prev.isInterested
              ? prev.post._count.interests - 1
              : prev.post._count.interests + 1,
          },
        },
        isInterested: !prev.isInterested,
      }),
      false
    );
    if (!loading) {
      interest({});
    }
  };

  return (
    <>
      <div className="mt-3 flex w-full space-x-5 border-b-[2px] border-t px-4 py-2.5  text-gray-700">
        <button
          onClick={onInterestClick}
          className="flex items-center space-x-2 text-sm"
        >
          <svg
            className={cls(
              "h-4 w-4",
              data?.isInterested ? "text-green-600" : ""
            )}
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
          <span>{data?.post._count.interests}</span>
        </button>
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
          <span>{data?.post._count.answers}</span>
        </span>
      </div>
    </>
  );
};

const CommunityPostDetail: NextPage<CommunityPostResponse> = ({ post }) => {
  const router = useRouter();

  //API to get the post info
  const { mutate } = useSWR<CommunityPostResponse>(
    router.query.id ? `/api/posts/${router.query.id}` : null
  );

  //API to post answers
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AnswerForm>({ mode: "onSubmit" });

  const [sendAnswer, { data: answerData, loading: answerLoading }] =
    useMutation<AnswerResponse>(`/api/posts/${router.query.id}/answer`);

  const onValid = (form: AnswerForm) => {
    if (answerLoading) return;
    sendAnswer(form);
  };

  useEffect(() => {
    if (answerData && answerData.ok) {
      reset(); //reset the form
      mutate();
    }
  }, [answerData, reset, mutate]);

  return (
    <Layout canGoBack seoTitle="Community Detail">
      <div>
        <span className="my-3 ml-4 inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
          Q&A
        </span>
        <div className="mb-3 flex cursor-pointer items-center space-x-3  border-b px-4 pb-3">
          <Avatar id={post.userId + ""} imgId={post?.user?.avatar} />
          <Link href={`/users/profile/${post.user.name}`}>
            <p className="text-sm font-medium text-gray-700">
              {post.user.name}
            </p>
            <p className="text-xs font-medium text-gray-500">
              View profile &rarr;
            </p>
          </Link>
        </div>
        <div>
          <div className="mt-2 px-4 text-gray-700">
            <span className="font-medium text-orange-500">Q. </span>
            {post.question}
          </div>
          <Counts />
        </div>
        <div className="my-5 space-y-5 px-4">
          <Answers />
        </div>
        <form onSubmit={handleSubmit(onValid)} className="px-4">
          <TextArea
            register={register("answer", {
              required: true,
              minLength: {
                message: "Answer must be minimum 5 letters.",
                value: 5,
              },
            })}
            placeholder="Answer this question!"
          />
          <span className="text-sm text-red-500">{errors.answer?.message}</span>
          <Button loading={answerLoading} text="Reply" />
        </form>
      </div>
    </Layout>
  );
};

// export const getServerSideProps = withSsrSession(async function ({
//   req,
// }: NextPageContext) {
//   const profile = await client.user.findUnique({
//     where: { id: req?.session.user?.id },
//   });
//   return {
//     props: {
//       profile: JSON.parse(JSON.stringify(profile)),
//     },
//   };
// });

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  if (!ctx.params?.id) {
    return {
      props: {},
    };
  }

  const cleanId = Number(ctx.params?.id);

  const post = await client.post.findUnique({
    where: {
      id: cleanId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      answers: {
        select: {
          answer: true,
          id: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
        take: 10,
      },
      _count: {
        select: {
          answers: true,
          interests: true,
        },
      },
    },
  });

  // const isInterested = Boolean(
  //   await client.interest.findFirst({
  //     where: {
  //       postId: cleanId,
  //       userId: post?.user?.id,
  //     },
  //     select: {
  //       id: true,
  //     },
  //   })
  // );

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
  };
};

export default CommunityPostDetail;

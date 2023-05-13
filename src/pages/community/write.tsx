import Button from "@/components/button";
import Layout from "@/components/layout";
import TextArea from "@/components/textarea";
import useCoords from "@/libs/client/useCoords";
import useMutation from "@/libs/client/useMutation";
import { Post } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface WriteForm {
  question: string;
}

interface WriteResponse {
  ok: boolean;
  post: Post;
}

const Write: NextPage = () => {
  const { latitude, longitude } = useCoords();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WriteForm>({
    mode: "onSubmit",
  });
  const [post, { loading, data }] = useMutation<WriteResponse>(`/api/posts`);
  const router = useRouter();

  const onValid = (data: WriteForm) => {
    if (loading) return;
    post({ ...data, latitude, longitude });
  };

  useEffect(() => {
    if (data && data.ok) {
      router.push(`/community/${data.post.id}`);
    }
  }, [data, router]);

  return (
    <Layout title="Post Your Question" canGoBack seoTitle="Post Question">
      <form onSubmit={handleSubmit(onValid)} className="space-y-4 px-4 py-10">
        <TextArea
          register={register("question", {
            required: true,
            minLength: {
              message: "Question must be more than 5 letters.",
              value: 5,
            },
          })}
          required
          placeholder="Ask a question!"
        />

        <span className="text-sm text-red-500">{errors.question?.message}</span>
        <Button loading={loading} text="Post" />
      </form>
    </Layout>
  );
};

export default Write;

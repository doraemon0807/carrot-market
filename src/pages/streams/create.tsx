import Layout from "@/components/layout";
import type { NextPage } from "next";
import Input from "@/components/input";
import TextArea from "@/components/textarea";
import Button from "@/components/button";
import { useForm } from "react-hook-form";
import useMutation from "@/libs/client/useMutation";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Stream } from "@prisma/client";

interface CreateForm {
  name: string;
  brand: string;
  price: string;
  description: string;
}

interface CreateResponse {
  ok: boolean;
  stream: Stream;
}

const Create: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<CreateForm>();

  //API to create a stream based on the submitted form
  const [createStream, { data, loading }] =
    useMutation<CreateResponse>(`/api/streams`);

  const onValid = (form: CreateForm) => {
    if (loading) return;
    createStream(form);
  };

  useEffect(() => {
    if (data && data.ok) {
      router.push(`/streams/${data?.stream.id}`);
    }
  }, [data, router]);

  return (
    <Layout title="Start Streaming" canGoBack>
      <form onSubmit={handleSubmit(onValid)} className="mt-4 space-y-2 px-4">
        <Input
          register={register("name", { required: true })}
          name="name"
          kind="text"
          label="Name"
        />
        <Input
          register={register("brand", { required: true })}
          name="brand"
          kind="text"
          label="Brand"
        />
        <Input
          register={register("price", { required: true, valueAsNumber: true })}
          name="price"
          kind="price"
          label="Price"
        />
        <TextArea
          register={register("description", { required: true })}
          name="price"
          label="Description"
        />
        <Button loading={loading} text="Start Streaming" />
      </form>
    </Layout>
  );
};

export default Create;

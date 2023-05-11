import Button from "@/components/button";
import Input from "@/components/input";
import Layout from "@/components/layout";
import TextArea from "@/components/textarea";
import useMutation from "@/libs/client/useMutation";
import { Product } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface UploadProductForm {
  name: string;
  brand: string;
  price: number;
  description: string;
  photo: FileList;
}

interface UploadProductMutation {
  ok: boolean;
  product: Product;
}

const Upload: NextPage = () => {
  const { register, handleSubmit, watch } = useForm<UploadProductForm>();

  const router = useRouter();

  //API to upload products to db
  const [uploadProduct, { loading, data }] =
    useMutation<UploadProductMutation>("/api/products");

  const onValid = async ({
    name,
    price,
    description,
    brand,
    photo,
  }: UploadProductForm) => {
    if (loading) return;
    if (photo && photo.length > 0) {
      const { uploadURL } = await (await fetch(`/api/files`)).json();
      const form = new FormData();
      form.append("file", photo[0], name);

      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: "POST",
          body: form,
        })
      ).json();
      uploadProduct({ name, price, description, brand, photoId: id });
    } else {
      uploadProduct({ name, price, description, brand });
    }
  };

  //Redirect to product page once product is uploaded
  useEffect(() => {
    if (data?.ok) {
      router.push(`/products/${data.product.id}`);
    }
  }, [data, router]);

  const photo = watch("photo");
  const [photoPreview, setPhotoPreview] = useState("");

  useEffect(() => {
    if (photo && photo.length > 0) {
      const file = photo[0];
      setPhotoPreview(URL.createObjectURL(file));
    }
  }, [photo]);

  return (
    <Layout title="Upload" canGoBack seoTitle="Upload">
      <form className="space-y-4 px-4" onSubmit={handleSubmit(onValid)}>
        <div>
          {photoPreview ? (
            <img src={photoPreview} className="h-46 w-full" />
          ) : (
            <label className="flex h-48 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-300 text-gray-600 hover:border-orange-500 hover:text-orange-500">
              <svg
                className="h-12 w-12"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                {...register("photo")}
                className="hidden"
                type="file"
                accept="image/*"
              />
            </label>
          )}
        </div>

        <Input
          register={register("name", { required: true })}
          name="name"
          label="Name"
          kind="text"
          required
        />

        <Input
          register={register("brand")}
          name="brand"
          label="Brand"
          kind="text"
        />

        <Input
          register={register("price", { required: true, valueAsNumber: true })}
          name="price"
          label="Price"
          kind="price"
          required
        />

        <TextArea
          register={register("description", { required: true })}
          label="Description"
          name="description"
          required
        />

        <Button loading={loading} text="Upload Product" />
      </form>
    </Layout>
  );
};

export default Upload;

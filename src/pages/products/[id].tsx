import Avatar from "@/components/avatar";
import Button from "@/components/button";
import Layout from "@/components/layout";
import { Product, User } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

interface ProductWishUser extends Product {
  user: User;
}

interface ItemDetailResponse {
  ok: boolean;
  product: ProductWishUser;
  relatedProducts: Product[];
}

const ItemDetail: NextPage = () => {
  const router = useRouter();

  const { data } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/products/${router.query.id}` : null
  );

  return (
    <Layout canGoBack>
      {!data ? (
        <div>Loading...</div>
      ) : (
        <div className="px-4 py-10">
          <div className="mb-8">
            <div className="mx-auto aspect-square w-full bg-slate-300" />
            <div className="my-2 flex items-center space-x-3 border-b py-3">
              <Avatar
                url={data.product.user.avatar}
                id={data.product.user.name}
              />
              <Link href={`/users/profile/${data.product.user.name}`}>
                <p className="text-sm font-medium text-gray-700">
                  {data.product.user.name}
                </p>
                <p className="cursor-pointer text-xs font-medium text-gray-500">
                  View profile &rarr;
                </p>
              </Link>
            </div>
            <div className="mt-10">
              <h1 className="text-3xl font-bold text-gray-900">
                {data.product.name}
              </h1>
              <span className="mt-3 block text-3xl text-gray-900">
                ${data.product.price}
              </span>
              <p className="my-6 text-gray-700">{data.product.description}</p>
              <div className="flex items-center justify-between space-x-2">
                <Button text="Talk to Seller" large />
                <button className="flex items-center justify-center rounded-md p-3 text-gray-400 hover:bg-gray-200 hover:text-gray-500">
                  <svg
                    className="h-6 w-6 "
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="">
            <h2 className="text-2xl font-bold text-gray-900">Similar items</h2>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {data.relatedProducts.map((product) => (
                <div key={product.id}>
                  <Link href={`/products/${product.id}`}>
                    <div className="mb-4 h-56 w-full rounded-lg bg-gray-300" />
                    <h3 className="-mb-1 text-gray-700">{product.name}</h3>
                    <span className="text-sm font-semibold text-gray-900">
                      ${product.price}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ItemDetail;

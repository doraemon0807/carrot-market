import FloatButton from "@/components/floating-button";
import Item from "@/components/item";
import Layout from "@/components/layout";
import useInfiniteScroll from "@/libs/client/useInfiniteScroll";
import { Product } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import useSWR, { SWRConfig } from "swr";
import useSWRInfinite, { unstable_serialize } from "swr/infinite";
import client from "@/libs/server/client";

export interface ProductWithCount extends Product {
  _count: {
    favorite: number;
  };
}

interface ProductsResponse {
  ok: boolean;
  products: ProductWithCount[];
  totalPage: number;
}

const Home: NextPage = () => {
  // const { data } = useSWR<ProductsResponse>("/api/products");

  const { data, setSize } = useSWRInfinite<ProductsResponse>(getKey);
  // const [products, setProducts] = useState<ProductWithCount[]>([]);

  // useEffect(() => {
  //   if (data) {
  //     setProducts([]);
  //     data.map((obj) => {
  //       setProducts((prev) => prev.concat(obj.products));
  //     });
  //   }
  // }, [data]);

  const page = useInfiniteScroll();

  useEffect(() => {
    setSize(page);
  }, [setSize, page]);

  return (
    <Layout title="Home" hasTabBar seoTitle="Home">
      <div className="flex flex-col space-y-5 py-5">
        {data?.map((items) =>
          items.products.map((product) => (
            <Item
              key={product.id}
              title={product.name}
              brand={product.brand}
              id={product.id}
              price={product.price}
              comments={12}
              favorite={product._count?.favorite || 0}
            />
          ))
        )}

        {/* {products?.map((product) => (
          <Item
            key={product.id}
            title={product.name}
            brand={product.brand}
            id={product.id}
            price={product.price}
            comments={12}
            favorite={product._count?.favorite || 0}
          />
        ))} */}
        <FloatButton href="/products/upload">
          <svg
            className="h-6 w-6"
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatButton>
      </div>
    </Layout>
  );
};

const getKey = (pageIndex: number, previousPageData: ProductsResponse) => {
  if (pageIndex === 0) return `/api/products?page=1`;
  const page = pageIndex + 1;
  if (page > previousPageData.totalPage) {
    return null;
  }
  return `/api/products?page=${page}`;
};

const homePage: NextPage<ProductsResponse> = ({ products, totalPage }) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          [unstable_serialize(getKey)]: [{ ok: true, products, totalPage }],
        },
      }}
    >
      <Home />
    </SWRConfig>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const products = (
    await client.product.findMany({
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
        _count: {
          select: {
            records: {
              where: {
                kind: "Favorite",
              },
            },
          },
        },
      },
    })
  ).map((product) => {
    return {
      ...product,
      _count: {
        favorite: product._count.records,
      },
    };
  });

  const productCount = await client.product.count();

  return {
    props: {
      ok: true,
      products: JSON.parse(JSON.stringify(products)),
      totalPage: Math.ceil(productCount / 10),
    },
  };
};

export default homePage;

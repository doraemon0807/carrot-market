import FloatButton from "@/components/floating-button";
import Item from "@/components/item";
import Layout from "@/components/layout";
import useInfiniteScroll from "@/libs/client/useInfiniteScroll";
import { Product } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

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

  const getKey = (pageIndex: number, previousPageData: ProductsResponse) => {
    if (pageIndex === 0) return `/api/products?page=1`;
    const page = pageIndex + 1;
    if (page > previousPageData.totalPage) {
      return null;
    }
    return `/api/products?page=${page}`;
  };

  const { data, setSize, isLoading } = useSWRInfinite<ProductsResponse>(getKey);
  const [products, setProducts] = useState<ProductWithCount[]>([]);

  useEffect(() => {
    if (data) {
      setProducts([]);
      data.map((obj) => {
        setProducts((prev) => prev.concat(obj.products));
      });
    }
  }, [data]);

  const page = useInfiniteScroll();

  useEffect(() => {
    setSize(page);
  }, [setSize, page]);

  return (
    <Layout title="Home" hasTabBar seoTitle="Home">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col space-y-5 py-5">
          {products?.map((product) => (
            <Item
              key={product.id}
              title={product.name}
              brand={product.brand}
              id={product.id}
              price={product.price}
              comments={12}
              favorite={product._count.favorite}
            />
          ))}
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
      )}
    </Layout>
  );
};

export default Home;

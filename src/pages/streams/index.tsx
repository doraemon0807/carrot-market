import FloatButton from "@/components/floating-button";
import Layout from "@/components/layout";
import useInfiniteScroll from "@/libs/client/useInfiniteScroll";
import { Stream } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import useSWRInfinite from "swr/infinite";

interface StreamResponse {
  ok: boolean;
  streams: Stream[];
  totalPage: number;
}

const Stream: NextPage = () => {
  const getKey = (pageIndex: number, previousPageData: StreamResponse) => {
    if (pageIndex === 0) return `/api/streams?page=1`;
    const page = pageIndex + 1;
    if (page > previousPageData.totalPage) return null;
    return `/api/streams?page=${page}`;
  };

  const { data, setSize, isLoading } = useSWRInfinite<StreamResponse>(getKey);
  const [streams, setStreams] = useState<Stream[]>([]);

  useEffect(() => {
    if (data) {
      setStreams([]);
      data.map((obj) => {
        setStreams((prev) => prev.concat(obj.streams));
      });
    }
  }, [data]);

  const page = useInfiniteScroll();

  useEffect(() => {
    setSize(page);
  }, [setSize, page]);

  return (
    <Layout title="Live Streams" hasTabBar>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-4 divide-y-2 pb-10 pt-5">
          {streams?.map((stream) => (
            <div key={stream.id} className="px-4 pt-4">
              <Link href={`/streams/${stream.id}`}>
                <div className="relative aspect-video w-full overflow-hidden rounded-md bg-slate-300 shadow-sm">
                  <Image
                    alt=""
                    fill
                    src={`https://videodelivery.net/${stream.cloudflareId}/thumbnails/thumbnail.jpg?height=270`}
                  />
                </div>
                <h3 className="mt-2 text-lg font-semibold text-gray-700">
                  {stream.name}
                </h3>
              </Link>
            </div>
          ))}

          <FloatButton href="/streams/create">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </FloatButton>
        </div>
      )}
    </Layout>
  );
};

export default Stream;

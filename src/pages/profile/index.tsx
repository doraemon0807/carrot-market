import { UserProp } from "@/components/auth";
import Avatar from "@/components/avatar";
import Layout from "@/components/layout";
import useUser, { ProfileResponse } from "@/libs/client/useUser";
import { cls } from "@/libs/client/utils";
import { withSsrSession } from "@/libs/server/withSession";
import { Kind, Record, Review, User } from "@prisma/client";
import type { GetServerSideProps, NextPage, NextPageContext } from "next";
import Link from "next/link";
import useSWR, { SWRConfig } from "swr";
import client from "@/libs/server/client";
import { Suspense, useEffect, useState } from "react";

interface ReviewWithUser extends Review {
  createdBy: User;
}

interface ReviewsResponse {
  ok: boolean;
  reviews: ReviewWithUser[];
}

// interface RecordResponse {
//   ok: boolean;
//   records: Record;
//   kind: Kind;
// }

const Reviews = () => {
  // const { data: reviewData } = useSWR<ReviewsResponse>("/api/reviews");
  const [url, setUrl] = useState("");
  useEffect(() => {
    setUrl("/api/reviews");
  }, []);
  const { data: reviewData } = useSWR<ReviewsResponse>(
    typeof window === "undefined" ? null : url
  );

  return (
    <>
      {reviewData?.reviews.map((review) => (
        <div key={review.id}>
          <div className="flex items-center space-x-4">
            <Avatar
              id={review?.createdBy?.id + ""}
              imgId={review?.createdBy?.avatar}
            />
            <div>
              <h4 className="pl-[2px] text-sm font-medium text-gray-900">
                {review?.createdBy.name}
              </h4>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={cls(
                      "h-5 w-5",
                      review.score > i ? "text-yellow-400" : "text-gray-300"
                    )}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p>{review?.review}</p>
          </div>
        </div>
      ))}
    </>
  );
};

const Miniprofile = () => {
  const [url, setUrl] = useState("");
  useEffect(() => {
    setUrl("/api/users/me");
  }, []);
  const { data, error } = useSWR<ProfileResponse>(
    typeof window === "undefined" ? null : url
  );
  return (
    <div className="flex items-center space-x-3">
      <Avatar
        id={String(data?.profile?.id)}
        size="large"
        imgId={data?.profile?.avatar || null}
      />
      <div className="flex flex-col">
        <span className="font-medium text-gray-900">{data?.profile?.name}</span>
        <Link href="/profile/edit">
          <span className="text-sm text-gray-500">Edit profile &rarr;</span>
        </Link>
      </div>
    </div>
  );
};

export function Profile() {
  // const { data: salesData } = useSWR<RecordResponse>(
  //   `/api/users/me/records?kind=Sale`
  // );
  // const { data: purchaseData } = useSWR<RecordResponse>(
  //   `/api/users/me/records?kind=Purchase`
  // );
  // const { data: favoriteData } = useSWR<RecordResponse>(
  //   `/api/users/me/records?kind=Favorite`
  // );

  //Refetch user info to update avatar URL
  // useUser();

  return (
    <Layout title="My Profile" hasTabBar seoTitle="Profile">
      <div className="px-4 py-5">
        <Suspense fallback="Loading mini profile...">
          <Miniprofile />
        </Suspense>
        <div className="mt-10 flex justify-around">
          <div className="flex flex-col items-center">
            <Link href="/profile/sold">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white">
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </div>
            </Link>
            <span className="mt-2 text-sm font-medium text-gray-700">Sold</span>
          </div>
          <div className="flex flex-col items-center">
            <Link href="/profile/bought">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white">
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
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  ></path>
                </svg>
              </div>
            </Link>
            <span className="mt-2 text-sm font-medium text-gray-700">
              Bought
            </span>
          </div>
          <div className="flex flex-col items-center">
            <Link href="profile/saved">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white">
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </div>
            </Link>
            <span className="mt-2 text-sm font-medium text-gray-700">
              Saved
            </span>
          </div>
        </div>
        <div className="mt-12">
          <Suspense fallback="Loading reviews...">
            <Reviews />
          </Suspense>
        </div>
      </div>
    </Layout>
  );
}

const profilePage: NextPage = () => {
  return (
    <SWRConfig
      value={{
        suspense: true,
      }}
    >
      <Profile />
    </SWRConfig>
  );
};

// export const getServerSideProps: GetServerSideProps = withSsrSession(
//   async function ({ req }: NextPageContext) {
//     const profile = await client.user.findUnique({
//       where: {
//         id: req?.session.user?.id,
//       },
//     });
//     return {
//       props: { profile: JSON.parse(JSON.stringify(profile)) },
//     };
//   }
// );

export default profilePage;

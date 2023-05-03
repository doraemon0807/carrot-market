import { useRouter } from "next/router";
import useSWR from "swr";
import { useEffect } from "react";
import { User } from "@prisma/client";

interface ProfileResponse {
  ok: boolean;
  profile: User;
}

export default function useUser() {
  const { data, error } = useSWR<ProfileResponse>("/api/users/me");
  const router = useRouter();

  useEffect(() => {
    //if user is logged in and go to enter -> go to home
    if (data && data.ok && router.pathname === "/enter") {
      router.replace("/");
    }
    //if user is not logged in and go to non-enter -> go to enter
    if (data && !data.ok && router.pathname !== "/enter") {
      router.replace("/enter");
    }
  }, [data, router]);

  return { user: data?.profile, isLoading: !data && !error };

  //   useEffect(() => {
  //     fetch("/api/users/me")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         if (!data.ok) {
  //           return router.replace("/enter");
  //         }
  //         setUser(data.profile);
  //       });
  //   }, []);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const data = await (await fetch("/api/users/me")).json();
  //       if (!data.ok) {
  //         return router.replace("/enter");
  //       }
  //       setUser(data.profile);
  //     };
  //     fetchData();
  //   }, [router]);
}

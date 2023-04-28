import { useRouter } from "next/router";
import useSWR from "swr";
import { useEffect } from "react";

export default function useUser() {
  const { data, error } = useSWR("/api/users/me");
  const router = useRouter();

  useEffect(() => {
    if (data && !data.ok) {
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

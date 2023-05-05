import Authorization from "@/components/auth";
import "@/styles/globals.css";
import { User } from "@prisma/client";
import type { AppProps } from "next/app";
import { useState } from "react";
import { SWRConfig } from "swr";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User>();
  const [userLoading, setUserLoading] = useState(false);

  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <Authorization setUser={setUser} setUserLoading={setUserLoading}>
        <Component {...pageProps} user={user} userLoading={userLoading} />
      </Authorization>
    </SWRConfig>
  );
}

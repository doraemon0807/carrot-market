import Authorization from "@/components/auth";
import "@/styles/globals.css";
import { User } from "@prisma/client";
import type { AppProps } from "next/app";
import { useState } from "react";
import { SWRConfig } from "swr";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User>();
  console.log("App is running");

  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <Authorization setUser={setUser}>
        <Component {...pageProps} user={user} />
      </Authorization>
    </SWRConfig>
  );
}

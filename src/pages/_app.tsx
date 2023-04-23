import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="mx-auto w-full max-w-xl font-Roboto">
      <Component {...pageProps} />
    </div>
  );
}

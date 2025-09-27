import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  // Example: read from .env.local
  console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

  return <Component {...pageProps} />;
}

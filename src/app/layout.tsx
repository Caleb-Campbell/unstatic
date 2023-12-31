import "~/styles/globals.css";
import { Inter } from "next/font/google";
import Header from "~/components/layoutComponents/Header";
import Head from "next/head";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "~/app/api/uploadthing/core";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Unstatic",
  description:
    "Unstatic: Simple, Agile Image Management. Streamline your website's visuals with ease. Our tool empowers seamless image updates, making your site ever-fresh and engaging.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <html>
        <body
          className={`h-screen bg-gradient-to-tr from-slate-400 to-slate-300 bg-no-repeat font-sans ${inter.variable}`}
        >
          <NextSSRPlugin
            /**
             * The `extractRouterConfig` will extract **only** the route configs
             * from the router to prevent additional information from being
             * leaked to the client. The data passed to the client is the same
             * as if you were to fetch `/api/uploadthing` directly.
             */
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          <main>{children}</main>
        </body>
      </html>
    </>
  );
}

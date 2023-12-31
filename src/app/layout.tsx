import "~/styles/globals.css";
import { Inter } from "next/font/google";
import Header from "~/components/layoutComponents/Header";
import Head from "next/head";

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
          <main>{children}</main>
        </body>
      </html>
    </>
  );
}

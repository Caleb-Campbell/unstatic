import "~/styles/globals.css";
import { Inter } from "next/font/google";
import Header from "~/components/layoutComponents/Header";

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
    <html lang="en">
      <main>
        <div
          className={`h-screen bg-gradient-to-tr from-slate-400 to-slate-600 bg-no-repeat font-sans ${inter.variable}`}
        >
          {children}
        </div>
      </main>
    </html>
  );
}

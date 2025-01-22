import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/utils/ReactQueryProvider";
import localFont from "next/font/local";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const monzoSans = localFont({
  src: [
    {
      path: "../../public/fonts/MonzoSansText-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/MonzoSansText-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/MonzoSansText-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/MonzoSansText-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/MonzoSansText-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/MonzoSansText-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-monzo",
});

const brSonoma = localFont({
  src: [
    {
      path: "../../public/fonts/BRSonoma-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/BRSonoma-ExtraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/BRSonoma-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/BRSonoma-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/BRSonoma-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/BRSonoma-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/BRSonoma-Thin.otf",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--font-br-sonoma",
});

export const metadata: Metadata = {
  title: "Raiz B2B",
  description: "Raiz B2B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest"></link>
      </head>

      <body
        className={`${inter.variable}  ${monzoSans.variable} ${brSonoma.variable} `}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

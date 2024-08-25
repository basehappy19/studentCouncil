import { Inter } from "next/font/google";
import { ReactNode } from "react";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ["latin"] });
import { Providers } from "./context/Providers";

export const metadata = {
  title: `หน้าแรก ${process.env.NEXT_PUBLIC_APP_TITLE}`,
  description: "สภานักเรียนโรงเรียนภูเขียว",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  
  return (
    <html lang="en">
      <Script
        src="https://kit.fontawesome.com/5134196601.js"
        crossorigin="anonymous"
      ></Script>
      <body className={inter.className}>
        <Providers>
          <NextTopLoader color="#331fed" />
            {children}
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}

import { Inter } from "next/font/google";
import { ReactNode } from "react";
import NextTopLoader from "nextjs-toploader";
import "@/app/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "@/app/layouts/Footer";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackButton from "@/app/layouts/BackButton";
const inter = Inter({ subsets: ["latin"] });
import { Providers } from "@/app/context/Providers";

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
          <BackButton />
            {children}
          <Footer />
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}

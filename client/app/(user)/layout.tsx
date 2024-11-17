import Footer from "@/app/layouts/Footer";
import BackButton from "@/app/layouts/BackButton";
import type { Metadata } from "next";

export const metadata : Metadata = {
  title: `หน้าแรก ${process.env.NEXT_PUBLIC_APP_TITLE}`,
  description: "สภานักเรียนโรงเรียนภูเขียว",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <>
        <BackButton />
          {children}
        <Footer />
    </>
  );
}

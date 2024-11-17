import NavbarSecondary from "../../layouts/NavbarSecondary";
import { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata : Metadata = {
  title: `หน้าแรก ${process.env.NEXT_PUBLIC_APP_TITLE}`,
  description: "สภานักเรียนโรงเรียนภูเขียว",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {

  return (
    <>
      <NavbarSecondary />
      {children}
    </>
  );
}

import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "./context/Theme-provider";
import { Providers } from "./context/Providers";

const prompt = Prompt({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "thai"],
  display: "swap",
  variable: "--font-prompt",
});

export const metadata: Metadata = {
  title: `หน้าแรก ${process.env.NEXT_PUBLIC_APP_TITLE}`,
  description: "สภานักเรียนโรงเรียนภูเขียว",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <GoogleAnalytics gaId="G-0Z020L9EB5" /> */}
      <body className={`${prompt.className} ${prompt.variable}`}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <NextTopLoader color="#331fed" />
            {children}
            <ToastContainer />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}

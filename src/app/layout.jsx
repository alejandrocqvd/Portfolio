import "../globals.css";

import { Inter } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";

import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Alejandro Cardona",
  description: "Alejandro Cardona's Portfolio.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body className={inter.className}>
        <ViewTransitions>
          <Navbar />
          {children}
        </ViewTransitions>
      </body>
    </html>
  );
}
import "../globals.css";

import { Spline_Sans, Spline_Sans_Mono } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";

import Background from "@/components/Background";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";

const sans = Spline_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = Spline_Sans_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata = {
  title: "Alejandro Cardona",
  description: "Alejandro Cardona, software engineer and Computer Science student at the University of Calgary.",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0D0E10" },
    { media: "(prefers-color-scheme: light)", color: "#F2F4F5" },
  ],
};

// Runs before first paint so the stored theme/mono choice never flickers, and the intro plays once per session.
const displayScript = `(function(){var d=document.documentElement;try{var s=localStorage,t=s.getItem("theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";d.dataset.theme=t;if(s.getItem("mono")==="1")d.dataset.mono="";}catch(e){d.dataset.theme="dark"}try{if(sessionStorage.getItem("intro"))d.dataset.intro="skip";else sessionStorage.setItem("intro","1")}catch(e){d.dataset.intro="skip"}if(/Mac|iPhone|iPad/.test(navigator.platform))d.dataset.os="mac";})()`;

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning className={`${sans.variable} ${mono.variable}`}>
        <head>
          <link rel="icon" href="/favicon.ico" />
          <script dangerouslySetInnerHTML={{ __html: displayScript }} />
        </head>

        <body className="min-h-screen">
          <a
            href="#main"
            className="fixed left-4 top-4 z-50 -translate-y-16 rounded-control bg-surface px-3 py-2 text-sm transition-transform focus:translate-y-0"
          >
            Skip to content
          </a>
          <Loader />
          <Background />
          <Navbar />
          <div className="page-vt">
            <main id="main">{children}</main>
            <Footer />
          </div>
        </body>
      </html>
    </ViewTransitions>
  );
}

import "../globals.css";

import localFont from "next/font/local";
import { ViewTransitions } from "next-view-transitions";

import Background from "@/components/Background";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import TransitionClicks from "@/components/TransitionClicks";

// The site font: JetBrains Mono (variable 100–800, upright and italic), self-hosted from public/fonts/hello.
// Exposed as --font-sans, which the body and Tailwind's font-sans read; the stack falls back to system monospace.
const jetBrainsMono = localFont({
  src: [
    { path: "../../public/fonts/hello/JetBrainsMono-VariableFont_wght.woff2", weight: "100 800", style: "normal" },
    { path: "../../public/fonts/hello/JetBrainsMono-Italic-VariableFont_wght.woff2", weight: "100 800", style: "italic" },
  ],
  variable: "--font-sans",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
});

export const metadata = {
  title: "Alejandro Cardona",
  description: "Alejandro Cardona, software engineer and Computer Science student at the University of Calgary.",
};

// Pages are static and refreshed at most every 5 minutes, which keeps the footer's "now" data (src/lib/now.js) current.
export const revalidate = 300;

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0D0E10" },
    { media: "(prefers-color-scheme: light)", color: "#F2F4F5" },
  ],
};

// Runs before first paint so the stored theme never flickers.
const displayScript = `(function(){var d=document.documentElement;try{var s=localStorage,t=s.getItem("theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";d.dataset.theme=t;}catch(e){d.dataset.theme="dark"}if(/Mac|iPhone|iPad/.test(navigator.platform))d.dataset.os="mac";})()`;

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning className={jetBrainsMono.variable}>
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
          <TransitionClicks />
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

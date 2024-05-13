import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ExitModal } from "@/components/modal/exit-modal";
import { HeartsModal } from "@/components/modal/hearts-modal";
import { PracticeModal } from "@/components/modal/practice-modal";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lingo",
  description:
    "Learning a language on Duolingo is completely free, but you can remove ads and support free education with Super. First 2 weeks on us! Learn more ...",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className} suppressHydrationWarning={true}>
          <Toaster />
          <ExitModal />
          <HeartsModal />
          <PracticeModal />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

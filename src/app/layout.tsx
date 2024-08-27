import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Faire's Localized Next.js Starter Kit",
  description: "A fast, build-time approach to localization in Next.js",
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body
          className={inter.className}
          style={{ margin: 0, width: "100%", height: "100dvh" }}
        >
          {children}
        </body>
      </Providers>
    </html>
  );
}

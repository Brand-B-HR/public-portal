import type { Metadata } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const withBasePath = (path: string) => `${basePath}${path}`;

export const metadata: Metadata = {
  title: "Brand B HR - Empowering Businesses with Smart HR Solutions",
  description:
    "An integrated HR management platform designed to streamline your workforce operations from recruitment to employee management in one stop shop.",
  keywords: "HR management platform, recruitment, employee management, HR solutions, workforce management",
  icons: {
    icon: withBasePath("/favicon.ico"),
    shortcut: withBasePath("/favicon.ico"),
    apple: withBasePath("/logo.png"),
  },
  openGraph: {
    title: "Brand B HR - Smart HR Solutions",
    description:
      "An integrated HR management platform designed to streamline your workforce operations from recruitment to employee management in one stop shop.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const withBasePath = (path: string) => `${basePath}${path}`;

export const metadata: Metadata = {
  title: "Brand B — Smart HR Solutions for Modern Businesses",
  description:
    "Brand B provides end-to-end HR solutions including recruitment, payroll, training, compliance, and employee management for modern businesses.",
  keywords: "HR solutions, payroll, recruitment, employee management, HR software",
  icons: {
    icon: withBasePath("/favicon.ico"),
    shortcut: withBasePath("/favicon.ico"),
    apple: withBasePath("/logo.png"),
  },
  openGraph: {
    title: "Brand B — Smart HR Solutions",
    description: "End-to-end HR solutions for modern businesses",
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

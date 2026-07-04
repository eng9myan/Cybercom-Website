import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CyberCom Suite",
  description: "Every module. One plane.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}

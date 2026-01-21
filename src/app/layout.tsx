import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StyledComponentsRegistry } from "@/lib/registry";
import { FarcasterProvider } from "@/components/providers/FarcasterProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "dickbutt.info",
  description: "The official dickbutt website",
  openGraph: {
    images: ["https://dickbutt.gold/assets/branding/dickbuttog.png"],
  },
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": "https://dickbutt.gold/assets/branding/dickbuttog.png",
    "fc:frame:image:aspect_ratio": "1.91:1",
    "fc:frame:button:1": "Open App",
    "fc:frame:button:1:action": "launch_frame",
    "fc:frame:button:1:target": "https://dickbutt.gold",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StyledComponentsRegistry>
          <FarcasterProvider>
            {children}
          </FarcasterProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

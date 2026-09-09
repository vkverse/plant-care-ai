import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {title:"Sprout — Plant health coach",description:"Understand what your plant needs and why."};
export const viewport: Viewport = {width:"device-width",initialScale:1,themeColor:"#193426"};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}

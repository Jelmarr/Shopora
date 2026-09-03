import "@/global.css";
import { Toaster } from "sileo";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { AppProviders } from "./providers/AppProviders";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <AppProviders>
          <Toaster position="top-center" />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}

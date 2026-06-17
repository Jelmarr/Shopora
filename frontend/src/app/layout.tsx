import "@/src/global.css";
import { Toaster } from "sileo";
import { AppProviders } from "./components/providers/AppProviders";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

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

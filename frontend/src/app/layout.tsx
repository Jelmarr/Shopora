import "@/src/global.css";
import { Toaster } from "sileo";
import { AppProviders } from "./components/providers/AppProviders";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="">
        <AppProviders>
          <Toaster position="top-center" />
          <main className="flex justify-center mx-auto my-0">{children}</main>
        </AppProviders>
      </body>
    </html>
  );
}

import "@/app/global.css";
import { Toaster } from "sileo";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <header>My Website Header</header>
        <Toaster position="bottom-right" />
        <main>{children}</main>
        <footer>My Website Footer</footer>
      </body>
    </html>
  );
}

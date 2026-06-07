import { Toaster } from "sileo";
import Sidebar from "@/src/components/Sidebar/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Sidebar />
      <Toaster position="top-center" />
      <main className="flex justify-center mx-auto my-0">{children}</main>
    </section>
  );
}

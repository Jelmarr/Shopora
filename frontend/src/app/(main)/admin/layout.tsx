import Sidebar from "@/components/Sidebar/Sidebar";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar />
      <main className="transition-[margin-left] duration-300 ml-0 lg:ml-(--sidebar-w)">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}

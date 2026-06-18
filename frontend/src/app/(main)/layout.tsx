import Sidebar from "@/src/components/Sidebar/Sidebar";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar />
      <main
        style={{
          marginLeft: "var(--sidebar-w)",
          transition: "margin-left 300ms ease",
        }}
      >
        <div className="max-w-270 mx-auto">{children}</div>
      </main>
    </div>
  );
}

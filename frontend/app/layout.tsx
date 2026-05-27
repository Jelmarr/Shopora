export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>My Website Header</header>
        <main>{children}</main> {/* Page content injects here */}
        <footer>My Website Footer</footer>
      </body>
    </html>
  );
}

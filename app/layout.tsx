import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto flex min-h-screen w-160 flex-col gap-7 bg-white p-10 shadow-md">
          <header className="h-10">
            <Link href={"/"} className="text-xl font-bold">
              📚 ONEBITE BOOKS
            </Link>
          </header>
          <main>{children}</main>

          <footer className="pt-30 text-gray-500">제작 @미야옹</footer>
        </div>
        {modal}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}

import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Expatia — страны для жизни",
  description: "Интерактивный выбор страны под ваш профиль: семья, пара, одиночка, пенсионер.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <header className="border-b bg-white">
          <nav className="container-nice flex h-16 items-center gap-6">
            <Link href="/" className="font-bold text-lg">Expatia</Link>
            <div className="ml-auto flex gap-4 text-sm">
              <Link href="/countries">Страны</Link>
              <Link href="/compare">Сравнить</Link>
              <Link href="/profile">Профиль</Link>
            </div>
          </nav>
        </header>
        <main className="container-nice py-8">{children}</main>
        <footer className="border-t py-8 text-sm text-gray-500">
          <div className="container-nice">© {new Date().getFullYear()} Expatia • MVP</div>
        </footer>
      </body>
    </html>
  );
}

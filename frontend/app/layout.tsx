import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata = { title: 'TransitFlow — Грузовые перевозки по СНГ', description: 'Надёжная доставка грузов по Казахстану, России и СНГ. Отслеживание онлайн.' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ru"><body className="antialiased">{children}</body></html>
}

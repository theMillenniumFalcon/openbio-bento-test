import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/sections/header';
import KanbanBoardContextProvider from '@/providers/kanban-board-context-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kanban Board',
  description: 'Simple and Accessible Kanban Board Layout',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script async src="https://cdn.splitbee.io/sb.js"></script>
      </head>
      <body className={inter.className}>
        <KanbanBoardContextProvider>
          <Header />
          {children}
        </KanbanBoardContextProvider>
      </body>
    </html>
  );
}

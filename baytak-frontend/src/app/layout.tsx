// app/layout.tsx
import InitCookie from '@/components/InitCookie';
import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Baytak',
  description: 'Unit search and management app',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <InitCookie />
      <body>{children}</body>
    </html>
  );
}

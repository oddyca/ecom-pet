import React from 'react';
import './globals.css';

import { Inter } from 'next/font/google';
import Providers from './providers';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'eCom | NextJS e-commerce store',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

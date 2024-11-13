import './globals.css'

import Header from '@/components/header/header.js';
import Footer from '@/components/footer/footer';

export const metadata = {
  title: 'NextJS Course App',
  description: 'Your first NextJS app!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header></Header>
        {children}
        <Footer/>
      </body>
    </html>
  );
}

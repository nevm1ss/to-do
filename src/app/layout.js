import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='py-10 bg-gray-950 h-screen'>{children}</body>
    </html>
  );
}

import './globals.css';

export const metadata = {
  title: 'Interactive Task Tracker',
  description: 'ADV101 Prefinal Laboratory Activity',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

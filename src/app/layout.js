import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./style/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CRUD NextJS Drizzle MySQL",
  description: "Aprender a crear un FullStack con NextJS Drizzle MySQL",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}

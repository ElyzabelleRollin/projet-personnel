//Imports:
import { Averia_Libre, Carattere } from "next/font/google";
import "./globals.css";
import Navigation from "./_components/global/navigation";

//Averia Libre font:
const averiaLibre = Averia_Libre({
  weight: ["300", "400", "700"],
  variable: "--font-averia-libre",
  subsets: ["latin"],
});

//Carattere font:
const carattere = Carattere({
  weight: ["400"],
  variable: "--font-carattere",
  subsets: ["latin"],
});

//Metadata:
export const metadata = {
  title: "Plume partagée",
  description: "Créateur d'histoires collaboratives",
};

//Root layout:
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${averiaLibre.variable} ${carattere.variable} antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}

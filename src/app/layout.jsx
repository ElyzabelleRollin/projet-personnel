import { Averia_Libre, Carattere } from "next/font/google";
import "./globals.css";
import Navigation from "./_components/global/navigation";

const averiaLibre = Averia_Libre({
  weight: ["300", "400", "700"],
  variable: "--font-averia-libre",
  subsets: ["latin"],
});
const carattere = Carattere({
  weight: ["400"],
  variable: "--font-carattere",
  subsets: ["latin"],
});



export const metadata = {
  title: "Plume partagée",
  description: "Créateur d'histoires collaboratives",
};

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

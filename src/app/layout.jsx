import { Averia_Libre, Varela_Round } from "next/font/google";
import "./globals.css";
import Navigation from "./_components/global/navigation";

const averiaLibre = Averia_Libre({
  weight: ["300", "400", "700"],
  variable: "--font-averia-libre",
  subsets: ["latin"],
});

const varelaRound = Varela_Round({
  weight: ["400"],
  variable: "--font-varela-round",
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
        className={`${averiaLibre.variable} ${varelaRound.variable} antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}

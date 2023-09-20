import "./globals.css";
import { Nunito } from "next/font/google";
import ClientOnly from "./Components/ClientOnly";
import Navbar from "./Components/Navbar/Navbar";
import ResigterModal from "./Components/Modals/ResigterModal";
import ToasterProvider from "./Providers/ToasterProvider";

export const metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

const font = Nunito({
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <ResigterModal />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}

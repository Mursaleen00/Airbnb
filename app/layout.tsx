import "./globals.css";
import { Nunito } from "next/font/google";

import ResigterModal from "./Components/Modals/ResigterModal";
import LoginModal from "./Components/Modals/LoginModal";
import RentModal from "./Components/Modals/RentModal";

import ClientOnly from "./Components/ClientOnly";
import Navbar from "./Components/Navbar/Navbar";
import ToasterProvider from "./Providers/ToasterProvider";
import getCurrentUser from "./Actions/getCurrentUser";


export const metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

const font = Nunito({
  subsets: ["latin"],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let currentuser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RentModal />
          <LoginModal />
          <ResigterModal />
          <Navbar currentUser={currentuser} />
        </ClientOnly>
        <div className="pb-20 pt-28">
          
        </div>
        {children}
      </body>
    </html>
  );
}

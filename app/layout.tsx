import "./globals.css";
import { Nunito } from "next/font/google";
import ClientOnly from "./Components/ClientOnly";
import Navbar from "./Components/Navbar/Navbar";
import ResigterModal from "./Components/Modals/ResigterModal";
import ToasterProvider from "./Providers/ToasterProvider";
import LoginModal from "./Components/Modals/LoginModal";
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

  const currentUser = await getCurrentUser();

  
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <ResigterModal />
          <Navbar currentUser={currentUser}/>
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}

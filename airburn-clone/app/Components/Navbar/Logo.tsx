"use client;";
import img from "next/image";
import { useRouter } from "next/navigation";

function Logo() {
  const router = useRouter;

  return (
    <>
      <img
        className="hidden md:block cursor-pointer"
        height="100"
        width="100"
        src="/images/logo.png"
        alt="Logo"
      />
    </>
  );
}

export default Logo;

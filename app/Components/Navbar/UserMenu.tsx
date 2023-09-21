"use client";

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItems from "./MenuItems";
import useRegisterModal from "@/app/Hooks/useRegisterModal";
import useLoginModal from "@/app/Hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { safeUser } from "@/app/Types/intex";


interface UserMenuProps {
  currentUser?: safeUser | null;
}


const UserMenu: React.FC<UserMenuProps> = ({
  currentUser
}) => {
  const registerModal = useRegisterModal();
  const loginModel = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <>
      <div className="relative">
        <div className="flex flex-row items-center gap-3">
          <div
            // onClick={() => {}}
            className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          >
            Airbnb your home
          </div>
          <div
            onClick={toggleOpen}
            className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          >
            <AiOutlineMenu />
            <div className="hidden md:block">
              <Avatar src={currentUser?.image}/>
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
            <div className="flex flex-col cursor-pointer">
              {currentUser ? (
                <>
                  <MenuItems onClick={() => { }} label="My trips" />
                  <MenuItems onClick={() => { }} label="My favorite" />
                  <MenuItems onClick={() => { }} label="My reservation" />
                  <MenuItems onClick={() => { }} label="My properties" />
                  <MenuItems onClick={() => { }} label="Airbnb my home" />
                  <hr />
                  <MenuItems onClick={() => signOut()} label="Logout" />
                </>
              ) : (
                <>
                  <MenuItems onClick={loginModel.onOpen} label="Login" />
                  <MenuItems onClick={registerModal.onOpen} label="Signup" />
                </>
              )}
            </div>
          </div>
        )}
      </div >
    </>
  );
};

export default UserMenu;

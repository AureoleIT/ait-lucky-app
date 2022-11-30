import React, { useState } from "react";

// Components
import UserAvatar from "./UserAvatar";
import Menu from "./Menu";

// Icons
import MenuIcon from "public/Icons/menu";
import Link from "next/link";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false); //True: Menu will be displayed, False: Menu will be hidden

  function handleOpenMenu() {
    setShowMenu(!showMenu);
  }

  return (
    <>
      <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
      <div className="w-full bg-[#40BEE5]">
        <div className="flex justify-between items-center px-[20px] py-[15px] w-full max-w-6xl mx-auto">
          <button onClick={handleOpenMenu}>
            <MenuIcon />
          </button>
          <h1 className="text-2xl font-extrabold text-white">AIT LUCKY APP</h1>
          <UserAvatar />
        </div>
      </div>
    </>
  );
}

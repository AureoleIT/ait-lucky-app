import React, { useState } from "react";

// Components
import UserAvatar from "./UserAvatar";
import Menu from "./Menu";

// Icons
import MenuIcon from "public/Icons/menu";

// Firebase
import { auth } from "src/firebase";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false); //True: Menu will be displayed, False: Menu will be hidden
  const [ userData, setUserData ] = useState({})

  const context = auth.onAuthStateChanged((user) => {//Hiện tại chỉ lưu thông tin của các user đăng nhập/đăng kí thông qua GG
    if(user) setUserData(user);
  });

  function handleOpenMenu() {
    setShowMenu(!showMenu);
  }

  return (
    <>
      <Menu showMenu={showMenu} setShowMenu={setShowMenu} user={userData} />
      <div className="w-full bg-[#40BEE5]">
        <div className="flex justify-between items-center px-[20px] py-[15px] w-full max-w-6xl mx-auto">
          <button onClick={handleOpenMenu}>
            <MenuIcon />
          </button>
          <h1 className="text-2xl font-extrabold text-white">AIT LUCKY APP</h1>
          <UserAvatar avatar={userData.photoURL} />
        </div>
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";

// Components
import UserAvatar from "./UserAvatar";
import Menu from "./Menu";

// Icons
import MenuIcon from "public/Icons/menu";

// Firebase
import { auth } from "src/firebase";

import {
  getDatabase,
  ref,
  set,
  child,
  get,
  orderByKey,
  query,
  orderByChild,
  equalTo,
  update,
  onValue
} from "firebase/database";
import { auth } from "src/firebase";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false); //True: Menu will be displayed, False: Menu will be hidden
  const [ userData, setUserData ] = useState({})

  const context = auth.onAuthStateChanged((user) => {//Hiện tại chỉ lưu thông tin của các user đăng nhập/đăng kí thông qua GG
    setUserData(user);
  });

  const [userData, setUserData] = useState();
  const db = getDatabase();
  

  function handleOpenMenu() {
    run();
    setShowMenu(!showMenu);
  }

  function fetchDb(user) {
    // get orderbychild - have conditions
    const que = query(ref(db, "users"), orderByChild("email"), equalTo(user.email));
    onValue(que, (snapshot) => {
        const record = snapshot.val() ?? [];
        const values = Object.values(record);

        updateUser(values[0]);
        console.log("header", userData);
    }
    );
}

function updateUser(user) {
  setUserData(user);
  console.log(user);
}

function run() {
  auth.onAuthStateChanged((user) => {
    fetchDb(user);
  })
}

useEffect(() => {
  
}, [])

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

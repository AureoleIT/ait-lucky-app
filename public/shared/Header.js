import React, { useEffect, useState } from "react";

// Components
import UserAvatar from "./UserAvatar";
import Menu from "./Menu";

// Redux
import { useUserPackageHook } from "public/redux/hooks";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false); //True: Menu will be displayed, False: Menu will be hidden
  const [userData, setUserData] = useState({})
  const currentUser = useUserPackageHook();
  useEffect(() => {
    setUserData(currentUser)
  }, [])

  const defaultAvatar = "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"


  return (
    <>
      <Menu showMenu={showMenu} setShowMenu={setShowMenu} userData={userData} setUserData={setUserData} defaultAvatar={defaultAvatar} />
      <div className="w-full bg-[#40BEE5]">
        <div className="flex justify-between items-center px-[20px] py-[15px] w-full max-w-6xl mx-auto">
          <button onClick={(e) => {setShowMenu(!showMenu)}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white font-bold">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
            </svg>
          </button>
          <a href="/admin/dashboard-admin" className="text-2xl font-extrabold text-center text-white">AIT LUCKY APP</a>
          <UserAvatar avatar={userData.pic || defaultAvatar} />
        </div>
      </div>
    </>
  );
}

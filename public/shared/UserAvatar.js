import Link from "next/link";
import Image from "next/image"
import React from "react";

export default function UserAvatar({ avatar }) {
  const myLoader = ({src, width, quality}) => {
    return avatar
  }

  return (
    <Link href="/auth/setting">
      <div className="w-[40px] h-[40px]">
        <Image
          loader={myLoader}
          src={"avatar.png"}
          alt="User's avatar"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
      </div>
    </Link>
  );
}

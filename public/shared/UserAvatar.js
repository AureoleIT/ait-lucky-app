import Link from "next/link";
import React from "react";

export default function UserAvatar({ avatar }) {
  return (
    <Link href="/auth/setting">
      <div className="w-[40px] h-[40px]">
        <img
          src={avatar}
          alt=""
          className="rounded-full w-[40px] h-[40px] object-cover"
        />
      </div>
    </Link>
  );
}

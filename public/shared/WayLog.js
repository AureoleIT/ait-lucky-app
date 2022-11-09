import React from "react";

export default function WayLog({title, action, path}) {
  return (
    <p className="text-sm font-normal mt-2 pt-1">
      {title}
      <a
        href={path}
        className="font-bold transition duration-200 ease-in-out"
      >
        {action}
      </a>
    </p>
  );
}

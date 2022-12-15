import React from "react";

export default function Title({
  title,
  fontSize = "text-[36px]",
  fontWeight = "font-[900]",
}) {
  return (
    <h1
      className={`${fontWeight} uppercase text-[#004599] ${fontSize} text-center mb-5`}
    >
      {title}
    </h1>
  );
}

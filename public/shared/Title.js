import React from "react";

export default function Title({
  title,
  fontSize = "text-[36px]",
  fontWeight = "font-[900]",
  margin = "mb-5",
  isUpperCase = true,
  isUnderLine = false,
}) {
  return (
    <h1
      className={`${fontWeight} ${isUpperCase ? "uppercase" : ""} ${isUnderLine ? "underline" : ""} text-[#004599] ${fontSize} text-center ${margin}`}
    >
      {title}
    </h1>
  );
}

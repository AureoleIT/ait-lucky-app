import { TEXT } from "public/colors";
import React from "react";

export default function Privacy() {
  return (
    <div className="w-1/2 max-w-sm items-center flex mb-3">
      <label className="inline-flex items-center cursor-pointer">
        <input
          id="checkbox"
          type="checkbox"
          className={`form-checkbox border-0 rounded border-[${TEXT}] w-5 h-5 ease-linear transition-all duration-150`}
        />
        <span className={`ml-2 text-sm font-semibold text-[${TEXT}]`}>
          Tôi đã đọc và đồng ý với các{" "}
          <a
            href="#pablo"
            className={`text-[${TEXT}] font-bold`}
            // onClick={(e) => e.preventDefault()} --handle logic open privavy display
          >
            điều khoản và điều kiện
          </a>
        </span>
      </label>
    </div>
  );
}

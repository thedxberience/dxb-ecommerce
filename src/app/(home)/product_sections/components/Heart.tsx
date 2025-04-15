"use client";
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const Heart = () => {
  const [active, setActive] = useState(false);

  const handleClickHeart = () => {
    setActive(!false);
  };
  return (
    <div onClick={handleClickHeart} className="w-6 h-6">
      {active ? <FaHeart /> : <FaRegHeart />}
    </div>
  );
};

export default Heart;

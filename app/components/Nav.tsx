import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <>
      <div className="flex justify-center border">
        <Link href="/">Home</Link>
        <Link href="about">About</Link>
      </div>
    </>
  );
};

export default Nav;

import Link from "next/link";
import React from "react";
import { GraduationCap } from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex justify-between px-6 py-3">
      <Link
        href={"/"}
        className="flex items-center gap-2 hover:bg-slate-300 duration-200 p-2 rounded-md"
      >
        <GraduationCap /> Learnify
      </Link>
    </div>
  );
};

export default Navbar;

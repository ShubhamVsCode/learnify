import Link from "next/link";
import React from "react";
import { FilePlus2 } from "lucide-react";

const Sidebar = () => {
  return (
    <div>
      <Link
        href={"/course/create"}
        className="flex items-center gap-2 hover:bg-slate-300 duration-200 p-2 rounded-md"
      >
        <FilePlus2 /> Course Create
      </Link>
    </div>
  );
};

export default Sidebar;

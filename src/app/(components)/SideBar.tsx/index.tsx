"use client";
import { Menu } from "lucide-react";
import React from "react";

const Sidebar = () => {
  return (
    <div>
      <div className="flex gap-3 md:justify-normal justify-between items-center pt-8">
        <div className="logo">Logo</div>
        <h1 className="font-extrabold text-2xl">Edard</h1>
        <button
          className="md:hidden p-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={() => {}}
        >
          <Menu className="w-4 h-4" size={24} />
        </button>
      </div>
      <div className="flex-grow mt-8">{/* links here */}</div>
      <div className="footer">
        <p className="text-gray-500 text-xs text-center"> &copy; 2025</p>
      </div>
    </div>
  );
};

export default Sidebar;

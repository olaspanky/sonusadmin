import React from "react";
import Tables from "../Tables2";
import Search from "../Search";
import Image from "next/image";
import left from "../../../../public/assets/arrow-left.svg"
import right from "../../../../public/assets/arrow-right.svg"

export default function Home({ onAddCompanyClick }) {
    
  return (
    <div className="mt-9 p-9">
      <div className="w-[40%] mt-9">
        <ul className="flex w-full gap-20">
          <li className="text-primary">Users</li>
          <li>Notifications</li>
          <li>Send email</li>
        </ul>

      </div>

      <div className="border w-full my-1"></div>


      <div className="bg-white flex flex-col py-1 mt-9 rounded-md ">
        <div className="flex justify-between items-center px-2">
          <div className="flex items-center gap-5 my-3">
            <div>
              <h1>Users</h1>
            </div>
            <div className="w-96">
            {" "}
            <Search />
          </div>
          </div>

          <div>
            <button         onClick={onAddCompanyClick}
 className="rounded-md p-3 px-3 bg-primary text-white">Add New Company</button>
          </div>
         
        </div>
        <div className="border w-full my-3"></div>
        <div className="">
        <Tables />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button className="p-2 border border-primary rounded-md">
            <Image src={left} height={20} width={20} alt=""/>
        </button>
        <button className="p-2 text-white bg-primary flex gap-2 items-center rounded-md">
            <p>Next Page</p>
            <Image src={right} height={20} width={20} alt=""/>
        </button>
      </div>
    </div>
  );
}

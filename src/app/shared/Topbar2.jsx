// import { usePathname } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import bell from "../../../public/assets/bell.png";
// import pfp from "../../../public/assets/pfp.png";
// import logo from "../../../public/assets/white_logo.png";
// import home from "../../../public/assets/home.svg";
// import logout from "../../../public/assets/logout.png";
// import Menu from "../components/Menu";
// import Search from "../components/Search";
// import { useDispatch, useSelector } from "react-redux";

// const Sidebar = ({ title, icon, subItems }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const user = useSelector((state) => state.user);

//   const toggleSubMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleLogout = () => {
//     const currentUser = UserPool.getCurrentUser();

//     if (currentUser) {
//       currentUser.signOut();
//       dispatch(clearUser());
//       //console.log("User logged out successfully");
//       router.push("/");
//     } else {
//       //console.log("No user to log out");
//     }
//   };

//   return (
//     <div className="w-full shadow-md max-h-9 ">
//       <div
//         className={`bg-white text-black flex gap-5 items-center justify-items-end py-2 w-full px-2 lg:px-9 ${
//           isOpen ? "overflow-hidden" : ""
//         }`}
//       >
//         {/* Left side */}
//         <div
//           className={`flex items-center w-full ${isOpen ? "hidden" : "flex"}`}
//         >
//           {/* Logo or site title */}

//           {/* Search bar */}
//           <div className="relative w-full flex items-center">
//             <Search />
//           </div>
//         </div>

//         {/* Right side */}
//         <div
//           className={`flex justify-between   lg:gap-9 items-center w-full ${
//             isOpen ? "hidden" : "flex"
//           }`}
//         >
//           <div className="flex hiiden lg:block justify-center">
//             <Image alt="alt" src={bell} />
//           </div>
//           {/* Reset password button */}
//           <button className="text-xs hidden px-5 lg:flex py-3 lg:mr-0 lg:text-md bg-primary text-white rounded-md">
//             Reset Password
//           </button>

//           {/* User profile */}
//           <div className=" items-center hidden lg:flex ">
//             {/* Profile picture */}
//             <div className="relative w-10 h-10 rounded-full overflow-hidden">
//               <Image alt="alt" src={pfp} layout="fill" objectFit="cover" />
//             </div>

//             {/* User details */}
//             <div className="lg:text-sm text-xs ml-1">
//               <p className="lg:font-semibold text-black">
//                 Pharm {user.currentUser?.username?.slice(0, 15) ?? "Guest"}
//               </p>
//               <p className="text-gray-400">Managing Director</p>
//             </div>
//           </div>
//         </div>

//         {/* this is the small screen menu */}

//         <div className="block lg:hidden py-auto">
//           {/* Hamburger menu */}
//           <div className="lg:hidden">
//             <button onClick={toggleSubMenu}>
//               <svg
//                 className="h-6 w-6 text-gray-500 cursor-pointer"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 {isOpen ? (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 ) : (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16m-7 6h7"
//                   />
//                 )}
//               </svg>
//             </button>
//           </div>

//           <div
//             className={`h-[100vh] w-[100vw] lg:block ${isOpen ? "" : "hidden"}`}
//           >
//             <div className=" flex h-full  flex-col shadow-xl shadow-primary bg-gradient-to-b from-primary via-secondary to-tetiary">
//               <div className="flex justify-center my-5">
//                 {" "}
//                 <Image alt="alt" src={logo} />{" "}
//               </div>

//               <div>
//                 <li className="relative transition">
//                   <div className="relative m-2 flex items-center gap-2  rounded-xl  py-3 pl-5 text-sm text-white">
//                     <Image alt="alt" src={home} />
//                     <h1 className="text-lg font-semibold">Homepage</h1>
//                   </div>
//                 </li>
//               </div>

//               <div className='my-2 max-h-[60%] overflow-auto no-scrollbar custom-scrollbar'>
//     <Menu/>
//     </div>

//               <div className="flex flex-col justify-center items-center ">
               
//                 <div
//                   className="relative m-2 flex items-center gap-2 rounded-xl  py-3 text-sm text-white "
//                   onClick={handleLogout}
//                 >
//                   <Image alt="alt" src={logout} />
//                   <h1 className="text-lg text-white opacity-50 font-semibold">
//                     Logout
//                   </h1>
//                 </div>
//               </div>

//               <div className="">
//                 <div className="w-full border border-gray-200 opacity-5"></div>
                
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

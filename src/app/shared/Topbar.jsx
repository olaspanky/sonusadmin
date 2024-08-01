import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import bell from "../../../public/assets/bell.svg";
import pfp from "../../../public/assets/pfp.svg";
import logo from "../../../public/assets/logo.svg";
import home from "../../../public/assets/home.svg";
import logout from "../../../public/assets/logout.svg";
import Menu from "../components/Menu";
import Search from "../components/Search";
import { useDispatch, useSelector } from "react-redux";
import UserPool from "../UserPool";
import { selectUser, clearUser } from "../store/slice/userSlice";
import { useRouter } from "next/navigation";
import { selectUserData, setUserData } from '../store/slice/userdataslice';
import Cookies from 'js-cookie';
import { useSession } from "next-auth/react";
import { getGeolocation } from "../utilities/getGeolocation";



const Sidebar = ({ title, icon, subItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user);
  //console.log("user:",user.currentUser?.username)
  const userId = user.currentUser?.username
  //console.log("user is:", userId)
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  //console.log("user data is:", userData)
  // const companyName = userData?.user?.['CompanyName'];
  //console.log("sub is:", sub)
  
  //console.log("company is:", companyName)
  const { data: session } = useSession();
  

  const subscription = session?.user?.subscription;
  const name = session?.user?.name;
  const role = session?.user?.role;
  const location = session?.user?.location;
  
  const existingCookie = Cookies.get("atc");
  
  if (!existingCookie) {
    // Set the cookie if it doesn't exist
    Cookies.set("atc", JSON.stringify(subscription));
    console.log("Cookie 'atc' set successfully.");
    console.log("Cookie 'atc' is .", );
  } else {
    console.log("Cookie 'atc' already exists.");
  }
  
  console.log("User data is", session);
  console.log("Subscription is", subscription);
  console.log("already exists is", existingCookie);
  console.log("location is ", location);






  const toggleSubMenu = () => {
    setIsOpen(!isOpen);
  };

  const router = useRouter();

  const handleSignOut = async () => {
    try {
      // Use navigator.sendBeacon to ensure sign out request is sent
      const email = session?.user?.email;
      if (email) {
        navigator.sendBeacon('/api/update-isloggedin', JSON.stringify({ email, isLoggedIn: false }));
      }

      // Clear deviceId from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem('deviceId');
      }

      // Clear cookies
      Cookies.remove('atc');
      Cookies.remove('auth_token');

      // Sign out the user from AWS Amplify
      await signOut({ redirect: false, callbackUrl: '/' });

      // Redirect to home page
      router.push('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  

//   const jsonString = "[\"J01 Antibacterials for systemic use\",\"S02 Otologicals\",\"D08 Antiseptics and disinfectants\",\"H03 Thyroid therapy\",\"A07 Antidiarrheals, intestinal antiinflammatory/antiinfective agents\"]";

// // Option 1: Using JSON.parse()
// const jsonArray = JSON.parse(jsonString);

// //console.log(jsonArray); // Output: ["J01 Antibacterials for systemic use", "S02 Otologicals", ...]

// // Option 2: Using regular expression (more robust for malformed JSON)
// const regex = /\[(.*?)\]/; // Matches strings enclosed in square brackets
// const match = jsonString.match(regex);

// if (match) {
//   const stringValues = match[1].split('","'); // Split on comma with quotes
//   const jsonArray = stringValues.map(value => value.slice(1, -1)); // Remove leading and trailing quotes
//   //console.log("jsonarrayis",jsonArray); // Output: same as Option 1
// } else {
//   console.error("Invalid JSON format");
// }
  
  

  

  return (
    <div className="w-full shadow-md max-h-20 ">
      <div
        className={`bg-white text-black flex gap-5 items-center justify-items-end py-2 w-full px-2 lg:px-9 ${
          isOpen ? "overflow-hidden" : ""
        }`}
      >
        {/* Left side */}
        <div
          className={`flex items-center w-full ${isOpen ? "hidden" : "flex"}`}
        >
          {/* Logo or site title */}

          {/* Search bar */}
          <div className="relative w-full flex items-center">
            <Search />
          </div>
         
        </div>

        {/* Right side */}
        <div
          className={`flex justify-end lg:gap-2 items-center w-full ${
            isOpen ? "hidden" : "flex"
          }`}
        >
          <div className="flex hiiden lg:block justify-center">
            <Image alt="alt" src={bell} />
          </div>
          {/* Reset password button */}

          {/* User profile */}
          <div className=" items-center hidden lg:flex border border-white pl-3 border-l-black ">
            {/* Profile picture */}
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image alt="alt" src={pfp} layout="fill" objectFit="cover" />
            </div>

            {/* User details */}
            <div className="lg:text-sm text-xs ml-1">
              
              
              <p className="text-gray-400">{role}</p>
              <p className="text-gray-400">{name}</p>
            </div>
          </div>
        </div>

        {/* this is the small screen menu */}

        <div className="block lg:hidden py-auto">
          {/* Hamburger menu */}
          <div className="lg:hidden">
            <button onClick={toggleSubMenu}>
              <svg
                className="h-6 w-6 text-gray-500 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>

          <div
            className={`h-[100vh] w-[100vw] lg:block ${isOpen ? "" : "hidden"}`}
          >
            <div className=" flex w- h-full  flex-col shadow-xl shadow-primary bg-gradient-to-b from-primary via-secondary to-tetiary">
              <div className="flex justify-center my-5">
                {" "}
                <Image alt="alt" src={logo} />{" "}
              </div>

              <div>
                <li className="relative transition">
                  <div className="relative m-2 flex items-center gap-2  rounded-xl  py-3 pl-5 text-sm text-white">
                    <Image alt="alt" src={home} />
                    <h1 className="text-lg font-semibold">Homepage</h1>
                  </div>
                </li>
              </div>

              <div className="my-2 max-h-[60%] overflow-auto custom-scrollbar">
                <Menu />
              </div>

              <div className="flex flex-col justify-center items-center ">
                {/* <div
                  className="relative m-2 flex items-center gap-2 rounded-xl  py-3  text-sm text-white "
                  onClick={handleLogout}
                >
                  <Image alt="alt" src={logout} />
                  <h1 className="text-lg text-white opacity-50 font-semibold">
                    Logout
                  </h1>
                </div> */}
                  <button
              className="flex items-center gap-2 rounded-xl  py-3 pl-5 text-sm text-white"
              onClick={handleSignOut}
            >
              <Image alt="alt" src={logout} />
              <h1 className="text-lg text-white opacity-50 font-semibold">
                Logout
              </h1>
            </button>
              </div>

              <div className="">
                <div className="w-full border border-gray-200 opacity-5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
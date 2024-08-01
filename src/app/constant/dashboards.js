import { usePathname } from "next/navigation";

import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import UserPool from "../UserPool";
import { selectUser, clearUser } from "../store/slice/userSlice";
import { useRouter } from "next/navigation";
import { selectUserData, setUserData } from '../store/slice/userdataslice';


const Sidebar = ({ title, icon, subItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const username = useSelector((state) => state.user);
  const userId = username
  const dispatch = useDispatch();
    const userData = JSON.parse(localStorage.getItem("userData1"));

  //console.log("user data is:", userData)
  const companyName = userData?.user?.['CompanyName'];
  //console.log("company data is:", companyName)




  const toggleSubMenu = () => {
    setIsOpen(!isOpen);
  };

  const router = useRouter();

  const handleLogout = () => {
    const currentUser = UserPool.getCurrentUser();

    if (currentUser) {
      currentUser.signOut();
      dispatch(clearUser());
      //console.log("User logged out successfully");
      router.push("/");
    } else {
      //console.log("No user to log out");
    }
  };

  useEffect(() => {
    if (!userId) {
      console.error("User ID is undefined");
      // Handle the case where the user is not authenticated
      return;
    }
  
    //console.log("userId:", userId);
  
    const fetchData = async (userId) => {
      try {
        const response = await fetch(`/api/users/${userId}`);
  
        if (response.ok) {
          const data = await response.json();
          //console.log("Data:", data);
          dispatch(setUserData(data));

          
          // Handle the data...
        } else {
          console.error("Failed to fetch user data. Status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
  
    // Example usage:
    fetchData(userId);
  
  }, [userId]);
  
  

  

  return (
    <div className=" ">
   
    </div>
  );
};

export default Sidebar;



"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import google from "../../public/assets/google.png";
import mi from "../../public/assets/mi.png";
import logo from "../../public/assets/login_logo.svg";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "./UserPool";
import { useDispatch } from "react-redux";
import { setUser } from "./store/slice/userSlice";
import Cookies from "js-cookie";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAutoSignOut from './components/useAutoSignOut';
import PasswordModal from "./components/PasswordModal"; // Import the PasswordModal component
import { getDeviceIdentifier } from './components/getDeviceIdentifier';


const CustomAlert = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [message]);

 

  const alertClass = type === "success" ? "text-primary text-xl" : "text-red-500";

  return (
    <div className={`p-3 ${alertClass} ${isVisible ? "slide-in border bg-white mt-5" : "slide-out"}`}>
      {message}
    </div>
  );
};

export default function Home() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [signInText, setSignInText] = useState("Sign in");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility
  const [deviceId, setDeviceId] = useState(null);


  const showAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => {
      setAlertMessage("");
      setAlertType("");
    }, 3000);
  };

  const { data: session } = useSession();
  if(session && session.user){
    const email = session?.user?.email;
  }


  // useEffect(() => {
  //   const id = getDeviceIdentifier();
  //   setDeviceId(id);
  //   console.log("Device ID set to", id);
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { deviceId, browserName, deviceName, deviceDevice } = getDeviceIdentifier();
    console.log("Device info:", deviceId, browserName, deviceName,  deviceDevice);
    console.log("deviceid is", deviceId);

    if (!deviceId) {
      showAlert("Unable to identify device.", "error");
      return;
    }
    console.log("deviceid is", deviceId);

   

    setIsLoading(true);
    setSignInText("Signing in...");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        deviceId,
        browserName,
        deviceName,
        deviceDevice
      });

      if (res.error) {
        if (res.error === "You are already logged in on another device.") {
          setError("You are logged in on another device.");
          showAlert(res.error, "error");
        } else {
          setError(res.error);
          showAlert(res.error, "error");
        }
        setIsLoading(false);
        setSignInText("Sign in");
        return;
      }

      if (res.ok) {
        showAlert("Logged in successfully!", "success");
        router.push("/pbr/home2");
      } else {
        setError("Failed to sign in");
        showAlert("Failed to sign in!", "error");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setError("An error occurred while signing in");
      showAlert("An error occurred while signing in!", "error");
    } finally {
      setIsLoading(false);
      setSignInText("Sign in");
    }
  };

  const handleForgotPasswordClick = () => {
    setIsModalOpen(true);
  };

  return (
    <main className="flex max-h-[100vh] flex-col items-center justify-between bg-white font-custom2">
      <CustomAlert message={alertMessage} type={alertType} />
      <PasswordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> {/* Add the PasswordModal component */}
      <div className="w-full flex flex-row">
        <div className="items-start justify-start hidden  bg-contain bg-no-repeat bg-center lg:flex flex-col gap-5 w-[50%] px-20 p-9">
         
          <div>
            <h1 className="text-3xl font-extrabold">PBR Life Sciences Sonos Admin Dashboards</h1>
          </div>
        
        </div>
        <div className="md:p-[5rem] flex flex-col justify-center items-center px-2 w-full lg:w-auto">
          <div className="flex flex-col md:gap-5 my-10 justify-center">
            <div className="mb-9 md:hidden">
              <Image alt="alt" src={logo} />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold">
                Welcome To PBR Life Sciences Admin Dasboards
              </h1>
            </div>
            <form onSubmit={handleSubmit}>
              <section className="my-9 flex flex-col gap-9 w-full">
              
              <Link href="/pbr/settings3">
                      <button className="bg-primary py-3 w-full text-white px-3 rounded-md text-center">
Continue to Sonos Admin Dasboard                    </button>
                    </Link>


              </section>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

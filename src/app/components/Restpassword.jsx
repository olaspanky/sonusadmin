// EnterOtp.js

import React, { useState, useEffect } from "react";
import awsconfig from "../aws-exports";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import UserPool from "../UserPool";
import { Amplify } from "aws-amplify";
import { Auth } from 'aws-amplify';
import Image from "next/image";
import logo from "../../../public/assets/login_logo.svg";
import { resetPassword } from 'aws-amplify/auth';


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
    <div
      className={`p-3   ${alertClass} ${
        isVisible ? "slide-in border bg-white mt-5 " : "slide-out"
      }`}
    >
      {message}
    </div>
  );
};



Amplify.configure(awsconfig);

function ConfirmSignup() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Define state variable for OTP input
  const [otp, setOtp] = useState("486693");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(""); 

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const showAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => {
      setAlertMessage("");
      setAlertType("");
    }, 3000); 
  };
  // Handle OTP input change
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };
  // Handle confirmation of sign-up
  const handleConfirmSignup = async (e) => {
    setLoading(true);
    e.preventDefault();
    const email = localStorage.getItem("userEmail")
    try {
      await confirmSignUp({username: email, confirmationCode: otp});
      router.push("/pbr/settings");
      setLoading(false);
      //console.log("Sign-up confirmed successfully");
      showAlert("otp succesful in successfully!", "success");
    } catch (error) {
      setLoading(false);
      console.error("Error confirming sign-up:", error);
      showAlert("Error confirming sign-up.", "error");
    }
  };


  return (
    <main className="flex max-h-[100vh] flex-col items-center justify-between bg-white  font-custom2">
    <CustomAlert message={alertMessage} type={alertType} />

    <div className=" w-full flex flex-row">
      <div className="items-start justify-start hidden bg-bgImage bg-contain bg-no-repeat bg-center lg:flex flex-col gap-5 w-[50%] px-20  p-9">
        <div className="mb-9">
          {" "}
          <Image alt="alt" src={logo} />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold">VERSUS&#8482;</h1>
        </div>
        <div>
          <p className="text-md text-gray-600">
            Access user-friendly analysis and visualization of anonymised{" "}
            <br /> dispensing data collected from the retail pharmacies.
          </p>
        </div>
      </div>

      <div className="md:p-[5rem] px-2 lg:pt-0  w-full lg:w-auto">
        <div className="flex flex-col md:gap-5 my-10">
          <div className="mb-9 md:hidden">
            {" "}
            <Image alt="alt" src={logo} />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold">
              Welcome To VERSUS&#8482;
            </h1>
          </div>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Confirm Account
              </h1>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Enter Otp
                </label>
                <input
                  type="text"
                  name="otp"
                  value={otp}
                  onChange={handleOtpChange}
                  placeholder="Input OTP"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <button onClick={handleConfirmSignup}>confirm</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>



    
  );
}

export default ConfirmSignup;

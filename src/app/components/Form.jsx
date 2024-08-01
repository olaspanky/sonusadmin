// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Dropdown2 from "./Dropdown2";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// const CustomAlert = ({ message, type }) => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     if (message) {
//       setIsVisible(true);
//       const timeoutId = setTimeout(() => {
//         setIsVisible(false);
//       }, 3000);

//       return () => clearTimeout(timeoutId);
//     }
//   }, [message]);

//   const alertClass =
//     type === "success" ? "text-primary text-xl" : "text-red-500";

//   return (
//     <div
//       className={`p-3   ${alertClass} ${
//         isVisible ? "slide-in border bg-white mt-5 " : "slide-out"
//       }`}
//     >
//       {message}
//     </div>
//   );
// };

// const SignUp = () => {
//   const [error, setError] = useState("");
//   const [alertMessage, setAlertMessage] = useState("");
//   const [alertType, setAlertType] = useState("");

//   const showAlert = (message, type) => {
//     setAlertMessage(message);
//     setAlertType(type);
//     setTimeout(() => {
//       setAlertMessage("");
//       setAlertType("");
//     }, 3000);
//   };

//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [subscription, setSubscription] = useState([]);
//   const [name, setName] = useState("");
//   const [company, setCompany] = useState("");
//   const [role, setRole] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!name || !email || !password || !subscription) {
//       setError("All fields are necessary.");
//       return;
//     }
  
//     try {
//       const resUserExists = await fetch("/api/userExists", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email }),
//       });
  
//       if (!resUserExists.ok) {
//         throw new Error(`Failed to check user existence. Status: ${resUserExists.status}, StatusText: ${resUserExists.statusText}`);
//       }
  
//       const dataUserExists = await resUserExists.json();
  
//       if (dataUserExists.user) {
//         setError("User already exists.");
//         return;
//       }
  
//       const res = await fetch("/api/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//           subscription,
//           company,
//           role
//         }),
//       });
  
//       const data = await res.json();
//       console.log('API Response:', data); // Log the response data for debugging
  
//       if (res.ok && data.success) {
//         const form = e.target;
        
//         router.push("/");
//       } else {
//         setError(data.message || "User registration failed.");
//       }
//     } catch (error) {
//       console.log("Error during registration: ", error.message);
//       setError(error.message);
//     }
//   };
  
  

//   const handleDropdownChange = (selected) => {
//     setSubscription(selected);
//   };

//   return (
//     <main className="flex max-h-[100vh] flex-col items-center justify-between ">
//       <CustomAlert message={alertMessage} type={alertType} />

//       <div className=" w-full flex flex-row">
//         <div className="items-start justify-start hidden bg-bgImage bg-contain bg-no-repeat bg-center md:flex flex-col gap-5 w-[50%] px-20  p-9">
//           <div className="mb-9"></div>
//           <div>
//             <h1 className="text-3xl font-extrabold">VERSUS&#8482;</h1>
//           </div>
//           <div>
//             <p className="text-md text-gray-600">
//               Access user-friendly analysis and visualization of anonymised{" "}
//               <br /> dispensing data collected from the retail pharmacies.
//             </p>
//           </div>
//         </div>

//         <div className="p-20 w-1/2">
//           <div className="flex flex-col gap-5 my-10">
//             <div>
//               <h1 className="text-5xl font-extrabold">
//                 Welcome To VERSUS&#8482;
//               </h1>
//             </div>

//             <section className=" my-9 flex flex-col gap-9 w-[90%]">
//               <div className=" flex flex-col gap-5">
//                 <form onSubmit={handleSubmit}>
//                   <div className="flex flex-col">
//                     <label
//                       htmlFor="email"
//                       className="text-gray-700 font-semibold mb-1"
//                     >
//                       Email Address
//                     </label>
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                       className="border border-gray-300 w-full rounded-md py-3 px-3 focus:outline-none focus:border-blue-500 "
//                     />
//                   </div>
//                   <div className="flex flex-col">
//                     <label
//                       htmlFor="company"
//                       className="text-gray-700 font-semibold mb-1"
//                     >
//                       Company Name
//                     </label>
//                     <input
//                       type="text"
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                       required
//                       className="border border-gray-300 w-full rounded-md py-3 px-3 focus:outline-none focus:border-blue-500 "
//                     />
//                   </div>
//                   <div className="flex flex-col">
//                     <label
//                       htmlFor="role"
//                       className="text-gray-700 font-semibold mb-1"
//                     >
//                       Role
//                     </label>
//                     <input
//                       type="text"
//                       value={role}
//                       onChange={(e) => setRole(e.target.value)}
//                       required
//                       className="border border-gray-300 w-full rounded-md py-3 px-3 focus:outline-none focus:border-blue-500 "
//                     />
//                   </div>
//                   <div className="flex flex-col">
//                     <label
//                       htmlFor="company"
//                       className="text-gray-700 font-semibold mb-1"
//                     >
//                       Username
//                     </label>
//                     <input
//                       type="text"
//                       value={company}
//                       onChange={(e) => setCompany(e.target.value)}
//                       required
//                       className="border border-gray-300 w-full rounded-md py-3 px-3 focus:outline-none focus:border-blue-500 "
//                     />
//                   </div>

//                   <Dropdown2
//                     selectedOption={subscription}
//                     setSelectedOptions={handleDropdownChange}
//                   />

//                   <div className="flex flex-col">
//                     <label
//                       htmlFor="password"
//                       className="text-gray-700 font-semibold mb-1"
//                     >
//                       Password
//                     </label>
//                     <div className=" flex flex-row border justify-between border-gray-300 rounded-md py-3 px-3 focus:outline-none focus:border-blue-500">
//                       <input
//                         type={showPassword ? "text" : "password"}
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                         className="w-full outline-none"
//                       />
//                       <button
//                         type="button"
//                         className=" focus:outline-none "
//                         onClick={() => setShowPassword(!showPassword)}
//                       >
//                         {showPassword ? (
//                           <VisibilityOffIcon />
//                         ) : (
//                           <VisibilityIcon />
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>

//               <section className="flex flex-col my-9 w-full ">
//                 <button
//                   className="bg-primary py-3 text-white px-3 rounded-md "
//                   onClick={handleSubmit}
//                 >
//                   Sign Up
//                 </button>
//                 <div>
//                   <p>Dont have an account yet? Contact us</p>
//                 </div>
//               </section>
//             </section>
//           </div>
//         </div>
//       </div>
//     </main>

//     //     <div>
//     //       <h1>Login</h1>

//     //     </div>
//   );
// };

// export default SignUp;


import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Dropdown2 from "./Dropdown2";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

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

  const alertClass =
    type === "success" ? "text-primary text-xl" : "text-red-500";

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

const SignUp = () => {
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

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [subscription, setSubscription] = useState([]);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !subscription) {
      showAlert("All fields are necessary.", "error");
      return;
    }

    try {
      const resUserExists = await fetch("/api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!resUserExists.ok) {
        throw new Error(`Failed to check user existence. Status: ${resUserExists.status}, StatusText: ${resUserExists.statusText}`);
      }

      const dataUserExists = await resUserExists.json();

      if (dataUserExists.user) {
        showAlert("User already exists.", "error");
        return;
      }

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          subscription,
          company,
          role
        }),
      });

      const data = await res.json();
      console.log('API Response:', data); // Log the response data for debugging

      if (res.ok && data.success) {
        showAlert("User registered successfully!", "success");
        router.push("/");
      } else {
        showAlert(data.message || "User registration failed.", "error");
      }
    } catch (error) {
      console.log("Error during registration: ", error.message);
      showAlert(error.message, "error");
    }
  };

  const handleDropdownChange = (selected) => {
    setSubscription(selected);
  };

  return (
    <main className="flex max-h-[100vh] flex-col items-center justify-between ">
      <CustomAlert message={alertMessage} type={alertType} />

      <div className=" w-full flex flex-row">
        <div className="items-start justify-start hidden bg-bgImage bg-contain bg-no-repeat bg-center md:flex flex-col gap-5 w-[50%] px-20  p-9">
          <div className="mb-9"></div>
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

        <div className="p-20 w-1/2">
          <div className="flex flex-col gap-5 my-10">
            <div>
              <h1 className="text-5xl font-extrabold">
                Welcome To VERSUS&#8482;
              </h1>
            </div>

            <section className=" my-9 flex flex-col gap-9 w-[90%]">
              <div className=" flex flex-col gap-5">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col">
                    <label
                      htmlFor="email"
                      className="text-gray-700 font-semibold mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border border-gray-300 w-full rounded-md py-3 px-3 focus:outline-none focus:border-blue-500 "
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="company"
                      className="text-gray-700 font-semibold mb-1"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="border border-gray-300 w-full rounded-md py-3 px-3 focus:outline-none focus:border-blue-500 "
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="role"
                      className="text-gray-700 font-semibold mb-1"
                    >
                      Role
                    </label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                      className="border border-gray-300 w-full rounded-md py-3 px-3 focus:outline-none focus:border-blue-500 "
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="company"
                      className="text-gray-700 font-semibold mb-1"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      required
                      className="border border-gray-300 w-full rounded-md py-3 px-3 focus:outline-none focus:border-blue-500 "
                    />
                  </div>

                  <Dropdown2
                    selectedOption={subscription}
                    setSelectedOptions={handleDropdownChange}
                  />

                  <div className="flex flex-col">
                    <label
                      htmlFor="password"
                      className="text-gray-700 font-semibold mb-1"
                    >
                      Password
                    </label>
                    <div className=" flex flex-row border justify-between border-gray-300 rounded-md py-3 px-3 focus:outline-none focus:border-blue-500">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full outline-none"
                      />
                      <button
                        type="button"
                        className=" focus:outline-none "
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </button>
                    </div>
                  </div>
                  <section className="flex flex-col my-9 w-full ">
                    <button
                      className="bg-primary py-3 text-white px-3 rounded-md "
                      type="submit"
                    >
                      Sign Up
                    </button>
                    <div>
                      <p>Dont have an account yet? Contact us</p>
                    </div>
                  </section>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUp;

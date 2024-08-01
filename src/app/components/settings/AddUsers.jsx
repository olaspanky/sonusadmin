import React, { useState } from "react";
import Dropdown2 from "../Dropdown2";
import * as yup from 'yup';
import { useFormik } from 'formik';
import { selectUserData, setUserData } from '../../store/slice/userdataslice';
import { useDispatch, useSelector } from "react-redux";


const validationSchema = yup.object({
  CompanyName: yup.string().required("Company Name is required"),
  Email: yup.string().email("Invalid email address").required("Email is required"),
  Location: yup.string().required("Company Location is required"),
  AdminName: yup.string().required("Admin Name is required"),
  Telephone: yup.string().required("Contact Number is required"),
  email2: yup.string().email("Invalid email address"),
  subscription: yup.array().min(1, "Subscription Type is required"),
  subscriptionYear: yup.string(),
  therapyArea1: yup.string(),
  therapyArea2: yup.string(),
  numOfUsers: yup.number(),
  password: yup.string(),
  confirmPassword: yup.string(),
  userId: yup.string().required("User ID is required"),
});


const AddUsers = ({ onBackClick }) => {
  const user = useSelector((state) => state.user);
  const userId = user.currentUser?.username
  const company = user.currentUser?.company
  //console.log("user id to add:", userId)
  //console.log("Comapny is:", company)

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorModalMessage, setErrorModalMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      CompanyName: "",
      Email: "",
      Location: "",
      AdminName: "",
      Telephone: "",
      email2: "",
      subscription: [],
      subscriptionYear: "",
      therapyArea1: "",
      therapyArea2: "",
      numOfUsers: "",
      password: "",
      confirmPassword: "",
      userId: userId    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch("https://versusapi-2.onrender.com/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          // Handle success (e.g., show a success message)
          //console.log("Data submitted successfully");
        } else {
          // Handle errors (e.g., show an error message)
          const errorResponse = await response.json();
          const errorMessage = errorResponse.error || "Failed to submit data";
          
          // Log the error
          console.error(errorMessage);

          // Set the error message and show the modal
          setErrorModalMessage(errorMessage);
          setIsErrorModalVisible(true);
        }
      } catch (error) {
        // Log network errors
        console.error("Error submitting data:", error);
      }
    },
  });




  const [formData, setFormData] = useState({
    CompanyName: "",
    Email: "",
    Location: "",
    AdminName: "",
    Telephone: "",
    email2: "",
    subscription: [],
    subscriptionYear: "",
    therapyArea1: "",
    therapyArea2: "",
    numOfUsers: "",
    password: "",
    confirmPassword: "",
    userId:""
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

 const handleDropdownChange = (selected) => {
    formik.setFieldValue("subscription", selected);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch("http://localhost:3000/api/userss", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (response.ok) {
  //       // Handle success (e.g., show a success message)
  //       //console.log("Data submitted successfully");
  //     } else {
  //       // Handle errors (e.g., show an error message)
  //       console.error("Failed to submit data");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting data:", error);
  //   }
  // };
  
  
  return (
    <div className="bg-white text-[#333333] p-9">
      <div className="container mx-auto my-8">
        <h1 className="text-2xl font-bold mb-4">Create Company Account</h1>
        <div className="border w-full my-3 mb-20"></div>

        <form onSubmit={formik.handleSubmit}>
          {/* Company Information */}
          <div className="flex gap-9 w-full ">
            <div className="mb-4 w-full">
              <label htmlFor="companyName" className="block font-semibold mb-2">
                Company Name
              </label>
              <input
                type="text"
                id="CompanyName"
                className="w-full p-2 border rounded-md"
                value={formik.values.CompanyName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                />
                {formik.touched.CompanyName && formik.errors.CompanyName ? (
              <div className="text-red-600">{formik.errors.CompanyName}</div>
            ) : null}
            </div>

            <div className="mb-4 w-full">
              <label htmlFor="email" className="block font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="Email"
                className="w-full p-2 border rounded-md"
                value={formik.values.Email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}

                />
                {formik.touched.Email && formik.errors.Email ? (
              <div className="text-red-600">{formik.errors.Email}</div>
            ) : null}
            </div>
          </div>

          {/* Company Location */}
          <div className="mb-4">
            <label
              htmlFor="companyLocation"
              className="block font-semibold mb-2"
            >
              Company Location
            </label>
            <input
              type="text"
              id="Location"
              className="w-full p-2 border h-20 rounded-md"
              value={formik.values.Location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}            />
               {formik.touched.Location && formik.errors.Location ? (
              <div className="text-red-600">{formik.errors.Location}</div>
            ) : null}
          </div>

          {/* Admin Information */}

          <div className="flex items-center">
            <h1>Admin</h1>
            <div className="border w-full my-9"></div>
          </div>

          <div className="flex gap-9 w-full ">
            <div className="mb-4 w-full">
              <label htmlFor="adminName" className="block font-semibold mb-2">
                Major Admin Name
              </label>
              <input
                type="text"
                id="AdminName"
                className="w-full p-2 border rounded-md"
                value={formik.values.AdminName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}            />
                 {formik.touched.AdminName && formik.errors.AdminName ? (
                <div className="text-red-600">{formik.errors.AdminName}</div>
              ) : null}
            </div>

            <div className="mb-4 w-full">
              <label
                htmlFor="contactNumber"
                className="block font-semibold mb-2"
              >
                Contact Number
              </label>
              <input
                type="tel"
                id="Telephone"
                className="w-full p-2 border rounded-md"
                value={formik.values.TelephonectNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}            />
                 {formik.touched.Telephone && formik.errors.Telephone ? (
                <div className="text-red-600">{formik.errors.Telephone}</div>
              ) : null}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="adminEmail" className="block font-semibold mb-2">
              Email Address
            </label>
            <input type="email2" id="email2" className="w-full p-2 border" 
             value={formik.values.email2}
             onChange={formik.handleChange}
              onBlur={formik.handleBlur}            />
               {formik.touched.email2 && formik.errors.email2 ? (
              <div className="text-red-600">{formik.errors.email2}</div>
            ) : null}
          </div>

          {/* Subscription Information */}
          <div className="flex items-center">
            <h1>Subscription</h1>
            <div className="border w-full my-9"></div>
          </div>
          <div className="flex gap-9 w-full ">
            <div className="mb-4 w-full">
              <label
                htmlFor="subscriptionType"
                className="block font-semibold mb-2"
              >
                Subscription Type
              </label>
              <Dropdown2
                selectedOptions={formik.values.subscription}
                setSelectedOptions={handleDropdownChange}
              />
               {formik.touched.subscription && formik.errors.subscription ? (
              <div className="text-red-600">{formik.errors.subscription}</div>
            ) : null}           </div>

            <div className="mb-4 w-full">
              <label
                htmlFor="yearsOfAccess"
                className="block font-semibold mb-2"
              >
                Years of Access to Subscription
              </label>
              <select
                id="yearsOfAccess"
                className="w-full p-2 border rounded-md"
              >
                {/* Add year options here */}
              </select>
            </div>
          </div>

          {/* Additional Information */}
          <div className="flex gap-9 w-full ">
            <div className="mb-4 w-full">
              <label htmlFor="therapyArea" className="block font-semibold mb-2">
                Within the selected years, when do you want to receive it{" "}
              </label>
              <select id="therapyArea" className="w-full p-2 border rounded-md">
                {/* Add therapy area options here */}
              </select>
            </div>
            <div className="mb-4 w-full">
              <label htmlFor="therapyArea" className="block font-semibold mb-2">
                Select Therapy Area
              </label>
              <select id="therapyArea" className="w-full p-2 border rounded-md">
                {/* Add therapy area options here */}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="numOfUsers" className="block font-semibold mb-2">
              Input Number of Users
            </label>
            <input
              type="number"
              id="numOfUsers"
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Password */}

          <div className="flex items-center">
            <h1>User Identification Number</h1>
            <div className="border w-full my-9"></div>
          </div>
          <div className="flex gap-9 w-full ">
            <div className="mb-4 w-full">
              <label
                htmlFor="password"
                className="block font-semibold mb-2 rounded-md"
              >
                User ID
              </label>
              <h1>{userId}</h1>
                 {formik.touched.userId && formik.errors.userId ? (
                <div className="text-red-600">{formik.errors.userId}</div>
              ) : null}
            </div>

            <div className="mb-4 w-full">
              <label
                htmlFor="confirmPassword"
                className="block font-semibold mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          {isErrorModalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsErrorModalVisible(false)}>
              &times;
            </span>
            <p>{errorModalMessage}</p>
          </div>
        </div>
      )}

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onBackClick}
              className="p-2 rounded-md border border-primary text-primary"
            >
              <h1>Back</h1>{" "}
            </button>
            <button type="submit" className="p-2 px-9 text-white bg-primary flex gap-2 items-center rounded-md">
              <h1>Save</h1>{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUsers;

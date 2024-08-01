// components/PasswordForm.js
import { useState } from 'react';
import Image from "next/image";
import logo from "../../../public/assets/login_logo.svg";



const PasswordForm = ({ onPasswordSubmit }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onPasswordSubmit(password);
  };

  return (
    <main className="flex w-full bg-[#f6f6f6] flex-col items-center justify-between  font-custom2">

    <form onSubmit={handleSubmit}>


<div className=" w-full   flex flex-row">
       

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
            <form onSubmit={handleSubmit}>
              <section className=" my-9 flex flex-col gap-9 ">
                <div className=" flex flex-col gap-5">
                  <div className="flex flex-col">
                   <h1>ADMIN lOGIN</h1>
                  </div>
                  <div className='flex flex-col gap-3'>
                  <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full border-gray-300 rounded-md py-3 px-3 focus:outline-none focus:border-blue-500"

        />
      </label>
                  </div>

                  <button                     className="bg-primary py-3 text-white px-3 rounded-md "
 onClick={handleSubmit}>Submit</button>

                 
                </div>

                

          
              </section>
            </form>
          </div>
        </div>
      </div>


     
      
    </form>
    </main>

  );
};

export default PasswordForm;

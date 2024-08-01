"use client"
import React  from 'react'
import {useState} from "react"
import Image from 'next/image'
import google from "../../public/assets/google.png"
import mi from "../../public/assets/mi.png"
import logo from "../../public/assets/logo.png"
import { useRouter } from 'next/navigation'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import Amplify from 'aws-amplify'; // Correct import statement
import awsExports from './aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { createContext, useContext, useState } from 'react';



Amplify.configure({
  Auth: {
      region: awsExports.REGION,
      userPoolId: awsExports.USER_POOL_ID,
      userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID
  }
})

const Login =()=> {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for error message
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sign in using Amplify Auth
      const user = await Auth.signIn(email, password);

      // If successful, handle the sign-in response
      //console.log('Sign in success:', user);
      // Get the current session
      const session = await Auth.currentSession();

      // Extract the access token
      const accessToken = session.getAccessToken().getJwtToken();

      // Dispatch the access token to the Redux store
      dispatch(setAccessToken(accessToken));

      //console.log('Access Token:', accessToken);
    } catch (err) {
      // If unsuccessful, handle the error
      console.error('Sign in error:', err);
      setError(err.message || 'An error occurred');
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   //console.log('Email:', email);
  //   //console.log('Password:', password);
  //   const user = new CognitoUser({
  //     Username: email,
  //     Pool: UserPool
  //   })

  //   const authDetails = new AuthenticationDetails({
  //     Username: email,
  //     Password: password,
  //   })

  //   user.authenticateUser(authDetails, {
  //     onSuccess: (data)=> {
  //       //console.log("onSuccess:", data)
  //     },
  //     onFailure: (err)=> {
  //       console.error("onFailure:", err)
  //       setError(err.message || 'An error occurred'); 
  //     },
  //     newPasswordRequired: (data)=> {
  //       //console.log("newPasswordRequired:", data)
  //     }
  //   })

  
  // };

  return (
    <Authenticator>

    <main className="flex max-h-[100vh] flex-col items-center justify-between ">
     <div className=' w-full flex flex-row'>

      <div className='items-start justify-start hidden bg-bgImage bg-contain bg-no-repeat bg-center md:flex flex-col gap-5 w-[50%] px-20  p-9'>
        <div className='mb-9'> <Image alt="alt" src={logo}/></div>
        <div><h1 className='text-3xl font-extrabold'>VERSUS&#8482;</h1></div>
        <div><p className='text-md text-gray-600'>Access user-friendly analysis and visualization of anonymised <br/> dispensing data collected from the retail pharmacies.</p></div>
      </div>




      <div className='p-[5rem] '>
        <div className='flex flex-col gap-5 my-10'>
            <div><h1 className='text-5xl font-extrabold'>Welcome To VERSUS&#8482;</h1></div>
            <form onSubmit={handleSubmit}>

            <section className=' my-9 flex flex-col gap-9 w-[90%]'>
            {error && ( 
        <div className="text-red-500 text-sm">{error}</div>
      )}
              <div className=' flex flex-col gap-5'>
  <div className='flex flex-col'>
    <label htmlFor='email' className='text-gray-700 font-semibold mb-1'>Email Address</label>
    <input
      type="email"
     value={email}
     onChange={(e) => setEmail(e.target.value)}
     required
      className='border border-gray-300 w-full rounded-md py-3 px-3 focus:outline-none focus:border-blue-500 '
    />
  </div>

  <div className='flex flex-col'>
    <label htmlFor='password' className='text-gray-700 font-semibold mb-1'>Password</label>
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      className='border border-gray-300 rounded-md py-3 px-3 focus:outline-none focus:border-blue-500'
    />

    <div className='flex items-center justify-between mt-2'>
      <div className='flex items-center'>
        <input type='checkbox' id='remember' className='mr-2' />
        <label htmlFor='remember' className='text-sm text-gray-700'>Remember me</label>
      </div>

      <div>
        <p className='text-sm text-gray-700'>Forgotten Password</p>
      </div>
    </div>
  </div>
  </div>

  <section className='flex flex-col my-9 w-full '>
  <button className='bg-primary py-3 text-white px-3 rounded-md ' onClick={handleSubmit}>
      Sign in
  </button>
  <div><p>Dont have an account yet? Contact us</p></div>
</section>

<div className='text-center'><h1>Or</h1></div>

<div className='flex gap-3 justify-between'>
  <div className='flex gap-2 border border-gray-300 px-3 py-3 rounded-md'>
    <Image alt="alt"  src={google}/>
    <p>Sign in with Google</p></div>
  <div className='flex gap-2 border border-gray-300 px-3 py-3 rounded-md'>
  <Image alt="alt"  src={mi}/>

    <p>Sign in with Google</p></div>
</div>
</section>
</form>



        </div>
      </div>

     </div>
    </main>
    </Authenticator>

  )
}


export default Login;

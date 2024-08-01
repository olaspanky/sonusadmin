"use client"
import React, { useState, useEffect } from "react";
import Sidebar from "@/app/shared/Sidebarapp";
import Topbar from "@/app/shared/Topbar";
import Users from "../../components/settings/Users2";
import AddUsers from "../../components/settings/AddUsers";
import withAuth from '@/app/utilities/withAuth'
import "@aws-amplify/ui-react/styles.css";
import { useDispatch, useSelector } from 'react-redux';
import { setAllUserData, setError } from '../../store/slice/dataSlice';
import PasswordForm from "@/app/components/Password";
import Layout2 from "@/app/shared/Layout2";

const Home = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const handlePasswordSubmit = (password) => {
    // Check if the entered password is correct
    if (password === 'PbrAdmin2024') { 
      setAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const dispatch = useDispatch();
  const { allUserData, error } = useSelector((state) => state.alldata);

  const [currentView, setCurrentView] = useState("Users");

  const toggleView = () => {
    setCurrentView(currentView === "Users" ? "AddUsers" : "Users");
  };

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch('localhost:3000/api/users');

  //     if (response.ok) {
  //       const data = await response.json();
  //       //console.log('All User Data:', data);
  //       setAllUserData(data);
  //       dispatch(setAllUserData(data));
  //     } else {
  //       console.error('Failed to fetch all user data. Status:', response.status);
  //       dispatch(setError('Failed to fetch user data'));
  //     }
  //   } catch (error) {
  //     console.error('Error fetching user data:', error);
  //   }
  // };

  // useEffect(() => {
  //   // Reset authentication status when the component mounts
  //   setAuthenticated(false);
  //   // Fetch data
  //   fetchData();
  // }, []);

  return (
    <Layout2>
    <main className="flex w-full">
      {authenticated ? (
        <div className="z-40 hidden lg:block bg-white  h-96 sticky top-0   max-h-[1080px]">
        </div>
      ) : (
        <div className="flex w-full  bg-black h-[100vh]">
        <PasswordForm onPasswordSubmit={handlePasswordSubmit} />
        </div>
      )}

      <section className="w-full">
        {authenticated && (
          <div className="flex-flex-col">
            {currentView === "Users" ? (
              <Users onAddCompanyClick={toggleView} />
            ) : (
              <AddUsers onBackClick={toggleView} />
            )}
          </div>
        )}
      </section>
    </main>
    </Layout2>
  );
};

export default withAuth(Home);

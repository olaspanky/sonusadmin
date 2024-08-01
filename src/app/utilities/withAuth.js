import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slice/userSlice';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import Loading from "../components/Loading3"


const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { data: session, status } = useSession();

    const [isLoading, setIsLoading] = useState(true);

    console.log("session is", session)

    

    // If session status is loading, return a loading indicator or message
    if (status === "loading") {
      return (  <div className="flex justify-center items-center w-full h-screen">
      <Loading/>
    </div>
      )
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;

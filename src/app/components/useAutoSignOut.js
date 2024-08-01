import { useEffect, useRef } from 'react';
import { signOut } from 'aws-amplify/auth';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const useAutoSignOut = (signOutHandler, timeout = 1800000) => { // 300000 ms = 5 minutes
  const router = useRouter();
  const timer = useRef(null);

  const resetTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(signOutHandler, timeout);
  };

  useEffect(() => {
    const events = ['mousemove'];

    const handleActivity = () => {
      resetTimer();
    };

    events.forEach(event => window.addEventListener(event, handleActivity));

    resetTimer(); // Set initial timer

    return () => {
      events.forEach(event => window.removeEventListener(event, handleActivity));
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [signOutHandler, timeout]);

  return null;
};

export default useAutoSignOut;


// import { useEffect, useRef } from 'react';

// const useAutoSignOut = (signOutHandler, timeout = 300000) => { // 300000 ms = 5 minutes
//   const timer = useRef(null);

//   const resetTimer = () => {
//     if (timer.current) {
//       clearTimeout(timer.current);
//     }
//     timer.current = setTimeout(signOutHandler, timeout);
//   };

//   const handleVisibilityChange = () => {
//     if (document.visibilityState === 'hidden') {
//       signOutHandler();
//     }
//   };

//   useEffect(() => {
//     const handleActivity = () => {
//       resetTimer();
//     };

//     const events = ['mousemove', 'keydown', 'click', 'touchstart'];
//     events.forEach(event => window.addEventListener(event, handleActivity));
//     document.addEventListener('visibilitychange', handleVisibilityChange);

//     resetTimer(); // Set initial timer

//     return () => {
//       events.forEach(event => window.removeEventListener(event, handleActivity));
//       document.removeEventListener('visibilitychange', handleVisibilityChange);
//       if (timer.current) {
//         clearTimeout(timer.current);
//       }
//     };
//   }, [signOutHandler, timeout]);

//   return null;
// };

// export default useAutoSignOut;

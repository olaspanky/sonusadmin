

// // "use client";
// // import React, { useEffect, useState } from 'react';
// // import Sidebar from './Sidebarapp';
// // import Topbar from './Topbar';
// // import { Amplify } from 'aws-amplify';
// // import awsconfig from '../aws-exports';
// // import '@aws-amplify/ui-react/styles.css';
// // import withAuth from '../utilities/withAuth';
// // import TimeMe from 'timeme.js';
// // import { useSession } from "next-auth/react";

// // Amplify.configure(awsconfig);

// // const Layout2 = ({ children }) => {
// //   const [accumulatedTime, setAccumulatedTime] = useState(0);
// //   const { data: session } = useSession();

// //   useEffect(() => {
// //     // Initialize TimeMe.js
// //     TimeMe.setIdleDurationInSeconds(30);
// //     TimeMe.setCurrentPageName('my-home-page');
// //     TimeMe.initialize();
// //     TimeMe.startTimer();

// //     // Load accumulated time from localStorage on component mount
// //     const storedTime = localStorage.getItem('accumulatedTime');
// //     if (storedTime) {
// //       setAccumulatedTime(parseInt(storedTime, 10));
// //     }

// //     // Function to update accumulated time
// //     const updateAccumulatedTime = () => {
// //       const timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
// //       const newAccumulatedTime = accumulatedTime + timeSpentOnPage;
// //       setAccumulatedTime(newAccumulatedTime);
// //       localStorage.setItem('accumulatedTime', newAccumulatedTime.toString());
// //       TimeMe.resetAllRecordedPageTimes();
// //     };

// //     // Update accumulated time every 8 minutes (480000 milliseconds)
// //     const timeUpdateInterval = setInterval(updateAccumulatedTime, 60000);

// //     // Sync with database every 10 minutes (600000 milliseconds)
// //     const syncWithDatabase = async () => {
// //       const timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
// //       const newAccumulatedTime = accumulatedTime + timeSpentOnPage;

// //       if (newAccumulatedTime > 0) {
// //         // Get user email from session (replace this with actual method to get email)
// //         const email = session?.user?.email;
// //         console.log("email session is", email);

// //         // Send accumulated time to backend
// //         try {
// //           const response = await fetch('/api/updateSession', {
// //             method: 'POST',
// //             headers: {
// //               'Content-Type': 'application/json',
// //             },
// //             body: JSON.stringify({ email, timeSpent: newAccumulatedTime }),
// //           });

// //           if (response.ok) {
// //             // Reset accumulated time after sending to database
// //             setAccumulatedTime(0);
// //             localStorage.setItem('accumulatedTime', '0');
// //           } else {
// //             console.error('Failed to update session duration.');
// //           }
// //         } catch (error) {
// //           console.error('Error sending accumulated time to database: ', error);
// //         }
// //       }
// //     };

// //     const databaseSyncInterval = setInterval(syncWithDatabase, 24000);

// //     // Pause/Resume timer based on visibility
// //     const handleVisibilityChange = () => {
// //       if (document.hidden) {
// //         TimeMe.stopTimer();
// //       } else {
// //         TimeMe.startTimer();
// //       }
// //     };

// //     document.addEventListener('visibilitychange', handleVisibilityChange);

// //     // Cleanup on component unmount
// //     return () => {
// //       clearInterval(timeUpdateInterval);
// //       clearInterval(databaseSyncInterval);
// //       document.removeEventListener('visibilitychange', handleVisibilityChange);
// //       TimeMe.resetAllRecordedPageTimes();
// //     };
// //   }, [accumulatedTime]);

// //   return (
// //     <div className='max-w-[100vw] flex justify-center items-center font-custom'>
// //       <div className='flex gap-0 h-auto w-full'>
// //         <div className='z-40 hidden lg:block bg-white h-96 sticky top-0 w-[370px] max-h-[1080px]'>
// //           <Sidebar />
// //         </div>
// //         <div className='bg-gray-100 flex flex-col text-sm w-full font-light h-full'>
// //           <div className='z-30 sticky top-0'>
// //             <Topbar />
// //           </div>
// //           <div className='z-20 mt-2 px-3 lg:px-9 bg-[#f6f6f6] h-auto custom-scrollbar'>
// //             {children}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default withAuth(Layout2);


"use client";
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebarapp';
import Topbar from './Topbar';
import { Amplify } from 'aws-amplify';
import awsconfig from '../aws-exports';
import '@aws-amplify/ui-react/styles.css';
import withAuth from '../utilities/withAuth';
import TimeMe from 'timeme.js';
import { useSession } from "next-auth/react";

Amplify.configure(awsconfig);

const Layout2 = ({ children }) => {
  

  return (
    <div className='max-w-[100vw] flex justify-center items-center font-custom'>
      <div className='flex gap-0 h-auto w-full'>
        <div className='z-40 hidden lg:block bg-white h-96 sticky top-0 w-[370px] max-h-[1080px]'>
          <Sidebar />
        </div>
        <div className='bg-gray-100 flex flex-col text-sm w-full font-light h-full'>
          <div className='z-30 sticky top-0'>
            <Topbar />
          </div>
          <div className='z-20 mt-2 px-3 lg:px-9 bg-[#f6f6f6] h-auto custom-scrollbar'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Layout2);


// "use client";
// import React, { useEffect, useState } from 'react';
// import Sidebar from './Sidebarapp';
// import Topbar from './Topbar';
// import { Amplify } from 'aws-amplify';
// import awsconfig from '../aws-exports';
// import '@aws-amplify/ui-react/styles.css';
// import withAuth from '../utilities/withAuth';
// import TimeMe from 'timeme.js';
// import { useSession } from "next-auth/react";

// Amplify.configure(awsconfig);

// const Layout2 = ({ children }) => {
//   const [accumulatedTime, setAccumulatedTime] = useState(0);
//   const [dailyTimeSpent, setDailyTimeSpent] = useState(0);
//   const { data: session } = useSession();

//   useEffect(() => {
//     // Initialize TimeMe.js
//     TimeMe.setIdleDurationInSeconds(30);
//     TimeMe.setCurrentPageName('my-home-page');
//     TimeMe.initialize();
//     TimeMe.startTimer();

//     // Load accumulated time from localStorage on component mount
//     const storedTime = localStorage.getItem('accumulatedTime');
//     if (storedTime) {
//       setAccumulatedTime(parseInt(storedTime, 10));
//     }

//     // Load daily time from localStorage on component mount
//     const storedDailyTime = localStorage.getItem('dailyTimeSpent');
//     const storedDate = localStorage.getItem('dailyTimeDate');
//     const today = new Date().toISOString().split('T')[0];

//     if (storedDate === today && storedDailyTime) {
//       setDailyTimeSpent(parseInt(storedDailyTime, 10));
//     } else {
//       localStorage.setItem('dailyTimeSpent', '0');
//       localStorage.setItem('dailyTimeDate', today);
//     }

//     // Function to update accumulated time
//     const updateAccumulatedTime = () => {
//       const timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
//       const newAccumulatedTime = accumulatedTime + timeSpentOnPage;
//       const newDailyTimeSpent = dailyTimeSpent + timeSpentOnPage;
      
//       setAccumulatedTime(newAccumulatedTime);
//       setDailyTimeSpent(newDailyTimeSpent);

//       localStorage.setItem('accumulatedTime', newAccumulatedTime.toString());
//       localStorage.setItem('dailyTimeSpent', newDailyTimeSpent.toString());
      
//       TimeMe.resetAllRecordedPageTimes();
//     };

//     // Update accumulated time every 8 minutes (480000 milliseconds)
//     const timeUpdateInterval = setInterval(updateAccumulatedTime, 60000);

//     // Sync with database every 10 minutes (600000 milliseconds)
//     const syncWithDatabase = async () => {
//       const timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
//       const newAccumulatedTime = accumulatedTime + timeSpentOnPage;
//       const newDailyTimeSpent = dailyTimeSpent + timeSpentOnPage;

//       if (newAccumulatedTime > 0 || newDailyTimeSpent > 0) {
//         // Get user email from session (replace this with actual method to get email)
//         const email = session?.user?.email;
//         console.log("email session is", email);

//         // Send accumulated time to backend
//         try {
//           // Call the original updateSession endpoint
//           const response1 = await fetch('/api/updateSession', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ email, timeSpent: newAccumulatedTime }),
//           });

//           if (!response1.ok) {
//             console.error('Failed to update session duration.');
//           }

//           // Call the new updateSession endpoint
//           const response2 = await fetch('/api/newUpdateSession', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ email, timeSpent: newDailyTimeSpent }),
//           });

//           if (response2.ok) {
//             // Reset accumulated time after sending to database
//             setAccumulatedTime(0);
//             setDailyTimeSpent(0);

//             localStorage.setItem('accumulatedTime', '0');
//             localStorage.setItem('dailyTimeSpent', '0');
//           } else {
//             console.error('Failed to update daily session duration.');
//           }
//         } catch (error) {
//           console.error('Error sending accumulated time to database: ', error);
//         }
//       }
//     };

//     const databaseSyncInterval = setInterval(syncWithDatabase, 240000);

//     // Pause/Resume timer based on visibility
//     const handleVisibilityChange = () => {
//       if (document.hidden) {
//         TimeMe.stopTimer();
//       } else {
//         TimeMe.startTimer();
//       }
//     };

//     document.addEventListener('visibilitychange', handleVisibilityChange);

//     // Cleanup on component unmount
//     return () => {
//       clearInterval(timeUpdateInterval);
//       clearInterval(databaseSyncInterval);
//       document.removeEventListener('visibilitychange', handleVisibilityChange);
//       TimeMe.resetAllRecordedPageTimes();
//     };
//   }, [accumulatedTime, dailyTimeSpent, session]);

//   return (
//     <div className='max-w-[100vw] flex justify-center items-center font-custom'>
//       <div className='flex gap-0 h-auto w-full'>
//         <div className='z-40 hidden lg:block bg-white h-96 sticky top-0 w-[370px] max-h-[1080px]'>
//           <Sidebar />
//         </div>
//         <div className='bg-gray-100 flex flex-col text-sm w-full font-light h-full'>
//           <div className='z-30 sticky top-0'>
//             <Topbar />
//           </div>
//           <div className='z-20 mt-2 px-3 lg:px-9 bg-[#f6f6f6] h-auto custom-scrollbar'>
//             {children}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default withAuth(Layout2);

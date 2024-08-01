import { useEffect, useRef, useState } from 'react';
import { createEmbeddingContext } from 'amazon-quicksight-embedding-sdk';
import Loading from '../Loading';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';import Menu from "../components/Menu"
import BrandShare from "./brand_share/BrandShare"


function App() {
  const dashboardRef = useRef([]);
  const [dashboardId, setDashboardId] = useState('YOUR_DASHBOARD1_ID');
  const [embeddedDashboard, setEmbeddedDashboard] = useState(null);
  const [dashboardUrl, setDashboardUrl] = useState(null);
const [embeddingContext, setEmbeddingContext] = useState(null);
   const [loading, setLoading] = useState(true);  
  const atc2 = [
  'A10 Drugs used in diabetes',
  'J05 Antivirals for systemic use',   'C02 Antihypertensives', 'A10 Drugs used in diabetes', 'L01 Anti-neoplastic agents', 'C01 Cardiac therapy']

  

  const atc2String = atc2.join(',');
  const [showDashboard, setShowDashboard] = useState(false); // Toggle visibility

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetch(`https://ar2qhujbfgipevxg67pxzajoei0rrivg.lambda-url.eu-central-1.on.aws/?dashboardId=${'6e24bf7f-e78c-49b9-aa84-c78ba306c783'}`
      ).then((response) => response.json()
      ).then((response) => {
 setDashboardUrl(response.EmbedUrl)
        setLoading(false)      })
    }, 10);
    return () => clearTimeout(timeout);
  }, []);

  const createContext = async () => {
    const context = await createEmbeddingContext();
    setEmbeddingContext(context);
  }

  useEffect(() => {
    if (dashboardUrl) { createContext() }
  }, [dashboardUrl])

  useEffect(() => {
    if (embeddingContext) { embed(); }
  }, [embeddingContext])

  const embed = async () => {

    const options = {
      url: dashboardUrl,
      container: dashboardRef.current,

    };

    const newEmbeddedDashboard = await embeddingContext.embedDashboard(options);
    setEmbeddedDashboard(newEmbeddedDashboard);
  };

  useEffect(() => {
    if (embeddedDashboard) {
      embeddedDashboard.navigateToDashboard(dashboardId, {})
    }
  }, [dashboardId])


  const changeDashboard = async (e) => {
    const selectedDashboardId = e.target.value;
    setDashboardId(selectedDashboardId);
  
    // Specify the allowed dashboard IDs
    const allowedDashboardIds = [
      "8cadbbac-5c8c-4d6b-bdb7-fa957307e9ec",
      "70ff0838-a669-4c34-ba38-f3e6c7f8c54d",
      "da865c6a-f2e8-4854-947d-8da74ec4abfa"
    ];
  
    // Toggle the visibility based on whether the selectedDashboardId is in the allowedDashboardIds array
    setShowDashboard(allowedDashboardIds.includes(selectedDashboardId));
  }

  return (
    <>
      <main className=''>
        <div className='flex justify-between items-center my-5'>
          <div className=''><h1 className='text-4xl font-extrabold '>Market Size Model Analytics Dashboard :</h1></div>
          <div className='bg-white flex flex-col p-2 px-2 gap-2 font-semibold rounded-md border border-gray-50 shadow-md'>
            <h1 className='text-3xl text-gray-500'>132,564 </h1>
            <p className='text-black'>n=Total patient encountered</p>
          </div>
        </div>
        {/* <select
  id='dashboard'
  value={dashboardId}
  onChange={changeDashboard}
  className='p-3 rounded-md my-5 border border-gray-300 focus:outline-none focus:border-primary transition duration-300 ease-in-out'
>
  <option className='hidden' value="996fd4fe-40f8-4ebf-9abd-08814f988896">Go Dashboard</option>
  <option value="a57b497c-0d68-4454-be0f-730f15fb4236">Display Dashboard</option>
  <option value="a57b497c-0d68-4454-be0f-730f15fb4236">Display Dashboard</option>
  <option value="a57b497c-0d68-4454-be0f-730f15fb4236">Display Dashboard</option>

</select> */}

        <div className='flex my-5 gap-3'>
          {/* Button 1 */}
          <button
            onClick={() => changeDashboard({ target: { value: "996fd4fe-40f8-4ebf-9abd-08814f988896" } })}
            className='flex-1 p-3 rounded-md border border-gray-300 focus:outline-none focus:border-primary transition duration-300 ease-in-out'
          >
            Go to Dashboard
          </button>
          {/* Button 2 */}
          <button
            onClick={() => changeDashboard({ target: { value: "da865c6a-f2e8-4854-947d-8da74ec4abfa" } })}
            className='flex-1 p-3 rounded-md border border-gray-300 focus:outline-none focus:border-primary transition duration-300 ease-in-out'
          >
            Brand Ranking Dashboard
          </button>
          <button
            onClick={() => changeDashboard({ target: { value: "70ff0838-a669-4c34-ba38-f3e6c7f8c54d" } })}
            className='flex-1 p-3 rounded-md border border-gray-300 focus:outline-none focus:border-primary transition duration-300 ease-in-out'
          >
            Brand Ranking Dashboard
          </button>
          <button
            onClick={() => changeDashboard({ target: { value: "8cadbbac-5c8c-4d6b-bdb7-fa957307e9ec" } })}
            className='flex-1 p-3 rounded-md border border-gray-300 focus:outline-none focus:border-primary transition duration-300 ease-in-out'
          >
            Brand SKU Dashboard
          </button>
          {/* Add more buttons if needed */}
        </div>


        {/* Toggle the visibility based on the showDashboard state */}
        <div className={`h-[100vh] ${showDashboard ? '' : 'hidden'}`} ref={dashboardRef} />

        <Menu changeDashboard={changeDashboard} />
       <BrandShare/>
      </main>
    </>
  );
}

export default App;


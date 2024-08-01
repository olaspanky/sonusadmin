import { useEffect, useState } from 'react';
import { createEmbeddingContext } from 'amazon-quicksight-embedding-sdk';
import Loading from '../Loading';
import { selectUserData } from '../../store/slice/userdataslice';
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

function App() {
  const [dashboardId, setDashboardId] = useState('6e24bf7f-e78c-49b9-aa84-c78ba306c783');
  const [dashboardUrl, setDashboardUrl] = useState(null);
  const [embeddingContext, setEmbeddingContext] = useState(null);
 const [loading, setLoading] = useState(true);
  const router = useRouter()  

      useEffect(() => {
          const userDataFromCookie = Cookies.get("userData1");
    const userData =
      typeof userDataFromCookie !== "undefined"
        ? JSON.parse(userDataFromCookie)
        : [];

    const jsonArray = JSON.parse(userData);
    //console.log("washed array is ", jsonArray); // Output: ["J01 Antibacterials for systemic use", "S02 Otologicals", ...]
    //console.log("Retrieved data from cookie:", userData);
    const atc2 = jsonArray;

  



if(atc2){
    let atc2String = '';    let atc2_1string = '';
    let atc2_2string = '';
    let atc2_3string = '';
    let atc2_4string = '';
    let atc2_5string = '';
    let atc2_6string = '';
    let atc2_7string = '';
  
    // Calculate chunk size
    const chunkSize = Math.ceil(atc2.length / 8);
    
    // Split the array into five chunks
    const chunk1 = atc2.slice(0, chunkSize);
    const chunk2 = atc2.slice(chunkSize, chunkSize * 2);
    const chunk3 = atc2.slice(chunkSize * 2, chunkSize * 3);
    const chunk4 = atc2.slice(chunkSize * 3, chunkSize * 4);
    const chunk5 = atc2.slice(chunkSize * 4, chunkSize * 5);
    const chunk6 = atc2.slice(chunkSize * 5, chunkSize * 6);
    const chunk7 = atc2.slice(chunkSize * 6, chunkSize * 7);
    const chunk8 = atc2.slice(chunkSize * 7);
    
    // Join each chunk into strings
      atc2String = chunk1.join(',');
      atc2_1string = chunk2.join(',');
      atc2_2string = chunk3.join(',');
      atc2_3string = chunk4.join(',');
      atc2_4string = chunk5.join(',');
      atc2_5string = chunk6.join(',');
      atc2_6string = chunk7.join(',');
      atc2_7string = chunk8.join(',');
  
      //console.log("atc2String : ",atc2String);
      //console.log("atc2_1string : ",atc2_1string);
      //console.log("atc2_2string : ",atc2_2string);
      //console.log("atc2_3string : ",atc2_3string);
      //console.log("atc2_4string : ",atc2_4string);
      //console.log("atc2_5string : ",atc2_5string);
      //console.log("atc2_6string : ",atc2_6string);
      //console.log("atc2_7string : ",atc2_7string);
  
      if(atc2_7string.length == 0){
        atc2_7string = atc2String
        if(atc2_6string.length == 0){
          atc2_6string = atc2String
          if(atc2_5string.length == 0){
            atc2_5string = atc2String
            if(atc2_4string.length == 0){
              atc2_4string = atc2String
              if(atc2_3string.length == 0){
                atc2_3string = atc2String
                if(atc2_2string.length == 0){
                  atc2_2string=atc2String
                  if(atc2_1string.length == 0){
                    atc2_1string = atc2String
                  }
                }
              }
            }
          }
        }
      }
  
  
        const timeout = setTimeout(() => {
          fetch(`https://ar2qhujbfgipevxg67pxzajoei0rrivg.lambda-url.eu-central-1.on.aws/?dashboardId=${dashboardId}&atc2=${atc2String}&atc2_1=${atc2_1string}&atc2_2=${atc2_2string}&atc2_3=${atc2_3string}&atc2_4=${atc2_4string}&atc2_5=${atc2_5string}&atc2_6=${atc2_6string}&atc2_7=${atc2_7string}`
          // fetch(`https://45cremxqhft77cxalzqpfnnjiu0arpwo.lambda-url.eu-central-1.on.aws/?dashboardId=7db85091-b869-4f78-95b5-8a04c96b70ed`
          ).then((response) => response.json()
          ).then((response) => {
            setDashboardUrl(response.EmbedUrl)
            setLoading(false);
          })
        }, 10);
          return () => clearTimeout(timeout);
      } else {
        router.push("/pbr/home2")
      } 
      }, []);
      

  const createContext = async () => {
    const context = await createEmbeddingContext();
    setEmbeddingContext(context);
  };

  useEffect(() => {
    if (dashboardUrl) {
      createContext();
    }
  }, [dashboardUrl]);

  useEffect(() => {
    if (embeddingContext) {
      embed();
    }
  }, [embeddingContext]);

  const embed = async () => {
    // Use an iframe to render the embedded dashboard
    const iframe = document.createElement('iframe');
    iframe.src = dashboardUrl;
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.title = 'QuickSight Dashboard';

    // Replace the existing container with the iframe
    const container = document.getElementById('dashboard');
    container.innerHTML = '';
    container.style.overflow = 'hidden'; // Hide the scrollbar
    container.appendChild(iframe);
  };

  return (
    <>
      <main>
        {loading ? <Loading /> : <></>}
        <div className='h-[1500px]' id="dashboard" />
      </main>
    </>
  );
}

export default App;
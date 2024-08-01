
import { useEffect, useRef, useState } from 'react';
import { createEmbeddingContext } from 'amazon-quicksight-embedding-sdk';
import Loading from './Loading';

 function App() {
  const dashboardRef = useRef([]);
  const [dashboardId, setDashboardId] = useState('YOUR_DASHBOARD1_ID');
  const [embeddedDashboard, setEmbeddedDashboard] = useState(null);
  const [dashboardUrl, setDashboardUrl] = useState(null);
const [embeddingContext, setEmbeddingContext] = useState(null);
   const [loading, setLoading] = useState(true);  
  const atc2 = [
  'A10 Drugs used in diabetes',
  'J05 Antivirals for systemic use',   
  'C02 Antihypertensives', 
  'A10 Drugs used in diabetes', 
  'L01 Anti-neoplastic agents', 
  'C01 Cardiac therapy']

  

  const atc2String = atc2.join(',');

  const dashboard = process.env.NEXT_PUBLIC_DASHBOARD_ID2;

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetch(`https://ar2qhujbfgipevxg67pxzajoei0rrivg.lambda-url.eu-central-1.on.aws/?dashboardId=${"8334b4a1-66a2-46cc-a385-0d63c80ed353"}`
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
    const dashboardId = e.target.value
    setDashboardId(dashboardId)
  }

  return (
    <>
     
      <main>
     
        
 { loading ? <Loading /> : <></> }
        <div className='' ref={dashboardRef} />      </main>
    </>
  );
};

export default App
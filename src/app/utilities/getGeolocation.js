// // utils/getGeolocation.js
// import axios from 'axios';

// export const getGeolocation = async (ip) => {
//   try {
//     const response = await axios.get(`http://ip-api.com/json/${ip}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching geolocation data:', error);
//     return null;
//   }
// };

// utils/getGeolocation.js
import axios from 'axios';

export const getGeolocation = async (ip) => {
  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    const { country, regionName: state } = response.data;
    return { country, state };
  } catch (error) {
    console.error('Error fetching geolocation data:', error);
    return null;
  }
};

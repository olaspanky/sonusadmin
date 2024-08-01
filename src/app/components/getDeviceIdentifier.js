// import { v4 as uuidv4 } from 'uuid';

// export function getDeviceIdentifier() {
//   let deviceId = localStorage.getItem("deviceId");
//   if (!deviceId) {
//     deviceId = uuidv4();  
//     localStorage.setItem("deviceId", deviceId);
//   }
//   return deviceId;
// }
import { v4 as uuidv4 } from 'uuid';
import DeviceDetector from 'device-detector-js';

export function getDeviceIdentifier() {
  const deviceDetector = new DeviceDetector();
  const userAgent = navigator.userAgent;
  const device = deviceDetector.parse(userAgent);

  const browserName = device.client.name || 'Unknown browser';
  const deviceName = device.os.name || 'Unknown device';
  const deviceDevice = device.device.type || 'Unknown device';

  let deviceId = localStorage.getItem("deviceId");
  if (!deviceId) {
    deviceId = uuidv4();  
    localStorage.setItem("deviceId", deviceId);
  }

  return { deviceId, browserName, deviceName, deviceDevice };
}

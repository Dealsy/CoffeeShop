import { useState } from "react";

const useTrackLocation = () => {
  const [locationErrorMsg, setLocationErrorMsg] = useState("");
  const [latLong, setLatLong] = useState("");

  const success = (postion) => {
    const latitude = postion.coords.latitude;
    const longitude = postion.coords.longitude;

    setLatLong(`${latitude}, ${longitude}`);
    setLocationErrorMsg("");
  };

  const error = () => {
    setLocationErrorMsg("Unable to retrieve your location");
  };

  const handleTrackLocation = () => {
    if (!navigator.geolocation) {
      setLocationErrorMsg("Geolocation is not supported by your browser");
    } else {
      //   status.textContent = "Locating…";
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return { latLong, handleTrackLocation, locationErrorMsg };
};

export default useTrackLocation;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IPDetailsComponent = ({ ipAddress }) => {
  const [details, setDetails] = useState({
    ip: '',
    location: '',
    timezone: '',
    isp: '',
  });

  const fetchIPDetails = async () => {
    try {
      const API_URL = process.env.REACT_APP_IP_API_URL;
      const API_KEY = process.env.REACT_APP_IP_API_KEY;
      const response = await axios.get(`${API_URL}?apiKey=${API_KEY}&ipAddress=${ipAddress}`);

      const { ip, location, isp } = response.data;
      setDetails({
        ip,
        location: `${location.city}, ${location.region}, ${location.country}`,
        timezone: location.timezone,
        isp,
      });
    } catch (error) {
      console.error('Failed to fetch IP details:', error);
    }
  };

  useEffect(() => {
    if (ipAddress) {
      fetchIPDetails();
    }
  }, [ipAddress]);

  return (
    <div className="ip-details">
      <p><strong>IP Address:</strong> {details.ip}</p>
      <p><strong>Location:</strong> {details.location}</p>
      <p><strong>Timezone:</strong> {details.timezone}</p>
      <p><strong>ISP:</strong> {details.isp}</p>
    </div>
  );
};

export default IPDetailsComponent;
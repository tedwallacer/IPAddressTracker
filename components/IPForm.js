import React, { useState } from 'react';

const IPAddressForm = ({ onSearch }) => {
  const [ipAddress, setIpAddress] = useState('');

  const handleInputChange = (event) => {
    setIpAddress(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 
    onSearch(ipAddress); 
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter IP Address"
          value={ipAddress}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Check IP</button>
      </form>
    </div>
  );
};

export default IPAddress Form;
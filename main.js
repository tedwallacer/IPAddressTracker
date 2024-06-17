import 'dotenv/config';
import fetch from 'node-fetch';

const ipInputField = document.getElementById('ipInput');
const submitButton = document.getElementById('submitBtn');
const ipAddressDisplay = document.querySelector('.ip-address');
const locationDisplay = document.querySelector('.location');
const timezoneDisplay = document.querySelector('.timezone');
const ispDisplay = document.querySelector('.isp');

const fetchIPDetails = async (ipAddress) => {
  const apiKey = process.env.IP_STACK_ACCESS_KEY;
  const apiUrl = `http://api.ipstack.com/${ipAddress}?access_key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Failed to fetch IP details');

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

const updateUI = (data) => {
  if (!data) {
    alert('Failed to fetch IP details. Please try again later.');
    return;
  }

  ipAddressDisplay.textContent = data.ip || 'N/A';
  locationDisplay.textContent = `${data.city}, ${data.region_name}, ${data.country_name}` || 'N/A';
  timezoneDisplay.textContent = `UTC ${data.location.timezone}` || 'N/A';
  ispDisplay.textContent = data.isp || 'N/A';
};

const handleFormSubmit = async (event) => {
  event.preventDefault();

  const ipAddress = ipInputField.value.trim();
  if (!ipAddress) {
    alert('Please enter an IP address');
    return;
  }

  const ipDetails = await fetchIPDetails(ipAddress);
  updateUI(ipDetails);
};

submitButton.addEventListener('click', handleFormSubmit);
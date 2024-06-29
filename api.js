const axios = require('axios');
require('dotenv').config();

const CURRENT_IP_API_URL = 'https://api.ipify.org?format=json';
const IP_GEOLOCATION_API_URL = 'https://geo.ipify.org/api/v1';
const GEO_IP_API_KEY = process.env.API_KEY;

function logEvent(message, level = 'info') {
    const logLevel = level.toUpperCase();
    console.log(`[${new Date().toISOString()}] - ${logLevel} - ${message}`);
}

async function fetchPublicIPAddress() {
    try {
        const response = await axios.get(CURRENT_IP_API_URL);
        return response.data.ip;
    } catch (error) {
        logEvent('Error fetching public IP address: ' + error, 'error');
        return null;
    }
}

async function fetchGeolocationDetails(ipAddress) {
    try {
        const requestUrl = `${IP_GEOLOCATION_API_URL}?apiKey=${GEO_IP_API_KEY}&ipAddress=${ipAddress}`;
        const response = await axios.get(requestUrl);
        return response.data;
    } catch (error) {
        logEvent('Error fetching geolocation details: ' + error, 'error');
        return null;
    }
}

async function displayCurrentIPGeolocation() {
    const publicIP = await fetchPublicIPAddress();
    if (!publicIP) {
        logEvent('Failed to fetch public IP address.', 'error');
        return;
    }

    const geolocationDetails = await fetchGeolocationDetails(publicIP);
    if (!geolocationDetails) {
        logEvent('Failed to fetch geolocation details for IP: ' + publicIP, 'error');
        return;
    }

    logEvent('Geolocation Details: ' + JSON.stringify(geolocationDetails), 'info');
}

module.exports = {
    fetchPublicIPAddress,
    fetchGeolocationDetails,
    displayCurrentIPGeolocation
};
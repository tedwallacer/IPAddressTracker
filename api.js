const axios = require('axios');
require('dotenv').config();

const API_BASE_URL = 'https://api.ipify.org?format=json';
const GEOLOCATION_BASE_URL = 'https://geo.ipify.org/api/v1';
const API_KEY = process.env.API_KEY;

async function fetchCurrentIP() {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data.ip;
    } catch (error) {
        console.error('Error fetching IP Address:', error);
        return null;
    }
}

async function fetchIPDetails(ipAddress) {
    try {
        const url = `${GEOLOCATION_BASE_URL}?apiKey=${API_KEY}&ipAddress=${ipAddress}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching IP Details:', error);
        return null;
    }
}

async function getCurrentIPDetails() {
    const currentIP = await fetchCurrentIP();
    if (!currentIP) {
        console.log('Failed to fetch current IP Address.');
        return;
    }

    const ipDetails = await fetchIPDetails(currentIP);
    if (!ipDetails) {
        console.log('Failed to fetch details for IP Address:', currentIP);
        return;
    }

    console.log('IP Details:', ipDetails);
}

module.exports = {
    fetchCurrentIP,
    fetchIPDetails,
    getCurrentIPDetails
};
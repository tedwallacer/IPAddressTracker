const axios = require('axios');
require('dotenv').config();

const API_BASE_URL = 'https://api.ipify.org?format=json';
const GEOLOCATION_BASE_URL = 'https://geo.ipify.org/api/v1';
const API_KEY = process.env.API_KEY;

function logMessage(message, type = 'info') {
    const messageType = type.toUpperCase();
    console.log(`[${new Date().toISOString()}] - ${messageType} - ${message}`);
}

async function fetchCurrentIP() {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data.ip;
    } catch (error) {
        logMessage('Error fetching IP Address: ' + error, 'error');
        return null;
    }
}

async function fetchIPDetails(ipAddress) {
    try {
        const url = `${GEOLOCATION_BASE_URL}?apiKey=${API_KEY}&ipAddress=${ipAddress}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        logMessage('Error fetching IP Details: ' + error, 'error');
        return null;
    }
}

async function getCurrentIPDetails() {
    const currentIP = await fetchCurrentIP();
    if (!currentIP) {
        logMessage('Failed to fetch current IP Address.', 'error');
        return;
    }

    const ipDetails = await fetchIPDetails(currentIP);
    if (!ipDetails) {
        logMessage('Failed to fetch details for IP Address: ' + currentIP, 'error');
        return;
    }

    logMessage('IP Details: ' + JSON.stringify(ipDetails), 'info');
}

module.exports = {
    fetchCurrentIP,
    fetchIPDetails,
    getCurrentIPDetails
};
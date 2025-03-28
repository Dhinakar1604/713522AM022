const axios = require("axios");

const BASE_URL = "http://20.244.56.144/test";

const fetchData = async (endpoint) => {
    try {
        const response = await axios.get(`${BASE_URL}/${endpoint}`);
        return response.data.numbers;
    } catch (error) {
        console.error(`Error fetching ${endpoint} numbers:`, error.message);
        return [];
    }
};

module.exports = fetchData;

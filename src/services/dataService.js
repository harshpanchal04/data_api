const axios = require('axios');
const fs = require('fs');
const path = require('path');

const DATA_URL = 'https://microsoftedge.github.io/Demos/json-dummy-data/256KB.json';
const DATA_FILE_PATH = path.join(__dirname, "..","data", 'data.json');


async function fetchAndStoreData() 
{
    try
    {
        const response = await axios.get(DATA_URL);
        const data = response.data;
        await fs.promises.writeFile(DATA_FILE_PATH, JSON.stringify(data,null,2));
        console.log("Data fetched and stored successfully");
    } catch (error) {
        console.error("here !");
        console.error("Error fetching data", error.message);
    }
}

async function readData()
{
    try
    {
        const data = await fs.promises.readFile(DATA_FILE_PATH,'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading data", error.message);
        return [];
    }
}


module.exports = {
    fetchAndStoreData,
    readData
}
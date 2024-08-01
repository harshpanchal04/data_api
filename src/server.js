const express = require('express');
const routes = require('./routes/api');
const {fetchAndStoreData} = require('./services/dataService');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api',routes);

fetchAndStoreData();

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
});
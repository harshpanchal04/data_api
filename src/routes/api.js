const express = require('express');
const {readData} = require('../services/dataService');  

const router = express.Router();

router.get('/data', async (req, res) => {
    try{
        let data = await readData();
        const { sortBy , filterBy , filterValue } = req.body;

        if(filterBy && filterValue)
        {
            data = data.filter(item => item[filterBy].toLowerCase().includes(filterValue.toLowerCase())
        );
        }

        if(sortBy)
        {
            data = data.sort((a,b) => {
                if(sortBy === 'version')
                    {
                        return a.version - b.version;   
                    }
                else if(sortBy === 'name')
                    {
                        return a.name.localeCompare(b.name);
                    }
                return 0;   
            }); 
        }
        
        res.json(data);
    } catch (error) {
            console.error("Error reading data", error.message);
            res.status(500).send("Internal Server Error");
        }
});

module.exports = router;
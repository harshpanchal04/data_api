const express = require('express');
const {readData} = require('../services/dataService');  

const router = express.Router();

router.get('/data', async (req, res) => {
    try{
        let data = await readData();
        const { sortBy , sortOrder , filterBy , filterValue } = req.body;

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
                else if (sortBy === 'id') {
                    return a.id.localeCompare(b.id);
                }
                return 0;   
            }); 
        }

        if(sortOrder === 'desc')
        {
            data = data.reverse();
        }
        
        res.json(data);
    } catch (error) {
            console.error("Error reading data", error.message);
            res.status(500).send("Internal Server Error");
        }
});

module.exports = router;
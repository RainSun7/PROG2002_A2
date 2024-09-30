var dbcon = require("../crowdfunding_db");
var connection = dbcon.getconnection();
	connection.connect();
var express = require('express');
var router = express.Router();

router.get("/AllFundraiser", (req, res)=>{
	connection.query("SELECT * FROM FUNDRAISER WHERE active = 1", (err, records,fields)=> {
		 if (err){
			 console.error("Error getting fundraiser!");
		 }else{
			 res.send(records);
		 }
	})
})

router.get("/AllCategory", (req, res) => {
    connection.query("SELECT * FROM CATEGORY", (err, records,fields) => {
        if (err) {
            console.error("Error getting category!", err);
        } else {
            res.send(records);
        }
    });
});

router.get("/SearchCondition", (req, res) => {
    const { ORGANIZER,CITY,CATEGORY, ACTIVE } = req.query;
    const params = [];
    let query = "SELECT * FROM FUNDRAISER WHERE 1=1";
    if (ORGANIZER) {
        query += " AND ORGANIZER = ?";  
        params.push(ORGANIZER); 
    }
    if (CITY) {
        query += " AND CITY = ?";  
        params.push(CITY); 
    }
    if (CATEGORY) {
        query += " AND CATEGORY_ID = ?";
        params.push(CATEGORY);
    }
    if (ACTIVE) {
        query += " AND ACTIVE = ?";
        params.push(ACTIVE === '1' ? '1' : '0');
    }
    connection.query(query, params, (err, records) => {
        if (err) {
            console.error("Error getting fundraiser info!", err);
        }
        res.send(records);
    });
});

router.get("/SearchFundraiser/:id", (req, res) => {
    connection.query("select * from FUNDRAISER where FUNDRAISER_ID=" + req.params.id, (err, records,fields)=> {
        if (err) {
            console.error("Error Getting fundraiser info!", err);
        } else {
            res.send(records[0]);
        }
    });
});

module.exports = router;
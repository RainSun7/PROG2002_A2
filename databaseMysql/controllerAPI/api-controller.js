var dbcon = require("../crowdfunding_db");
var connection = dbcon.getconnection();
	connection.connect();
var express = require('express');
var router = express.Router();

router.get("/Home", (req, res)=>{
	connection.query("SELECT * FROM FUNDRAISER WHERE active = 1", (err, records,fields)=> {
		 if (err){
			 console.error("Error getting fundraiser!");
		 }else{
			 res.send(records);
		 }
	})
})

router.get("/Search", (req, res) => {
    connection.query("SELECT * FROM CATEGORY", (err, records,fields) => {
        if (err) {
            console.error("Error getting category!", err);
        } else {
            res.send(records);
        }
    });
});

router.get("/Search111", (req, res) => {
    connection.query("SELECT * FROM CATEGORY", (err, records,fields) => {
        if (err) {
            console.error("Error getting category!", err);
        } else {
            res.send(records);
        }
    });
});

router.get("/fundraiser/:id", (req, res) => {
    const fundraiserId = req.params.id;
    connection.query("SELECT * FROM FUNDRAISER WHERE id = ?", [fundraiserId], (err, records) => {
        if (err) {
            console.error("Error Getting fundraiser info!", err);
        } else {
            res.send(records[0]);
        }
    });
});

module.exports = router;
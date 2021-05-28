// Setup empty JS object to act as endpoint for all routes
projectData = {};


// Express to run server and routes
const express = require('express');


// Start up an instance of app
const app = express();


/* Dependencies */
/* Middleware*/
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
const { static } = require("express");


// Initialize the main project folder
app.use(express.static('website'));


// Spin up the server
const port = 8000;
app.listen(port, listening);


// Callback to debug
function listening(){
    console.log(`Now running port: ${port}`);
};


// Initialize all route with a callback function
app.get("/all", getRoute);


// Callback function to complete GET '/all'
function getRoute(req,res){
    res.send(projectData);

    //clearing saved data
    projectData={};
};


// Post Route
app.post("/add", postRoute);


//Callback fucntion to complete POST '/add'
function postRoute(req,res){
    console.log(req.body);
    projectData = req.body;
    console.log(projectData);
};


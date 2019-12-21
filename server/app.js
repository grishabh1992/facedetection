const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
var app = express();
//Configuring express server
app.use(bodyparser.json({limit: '50mb', extended: true}));
app.use(cors())
//MySQL details
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Hrhk@1234',
    database: 'facedetection',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('Connection Established Successfully');
    else
        console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
});

//Establish the server connection
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}..`));

//Creating GET Router to fetch all the image details from the MySQL Database
app.get('/images', (req, res) => {
    mysqlConnection.query('SELECT * FROM images', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Router to INSERT/POST a image's detail
app.post('/upload', (req, res) => {
    let bodyObject = req.body;
    // console.log(bodyObject);
    // var sql = 'INSERT INTO `images` (`image`) VALUES ';
    // var sql = 'INSERT INTO images (`image`) VALUES ?';
    var sql2 = 'INSERT INTO `facedetection`.`images` (`image`) VALUES (?);'
    mysqlConnection.query(sql2,[bodyObject.image], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
        res.send(err);
    })
});

//learnerAddOrEdit store prosedure
    // CREATE DEFINER=`root`@`localhost` PROCEDURE `learnerAddOrEdit`(
    // IN _learner_id INT,
    // IN _learner_name VARCHAR(45),
    // IN _learner_email VARCHAR(45),
    // IN _course_Id INT
    // )
    // BEGIN
    // IF _learner_id = 0 THEN
    // INSERT INTO images(learner_name,learner_email,course_Id)
    // VALUES (_learner_name,_learner_email,_course_Id);
    // SET _learner_id = last_insert_id();
    // ELSE
    // UPDATE images
    // SET
    // learner_name = _learner_name,
    // learner_email = _learner_email,
    // course_Id = _course_Id
    // WHERE learner_id = _learner_id;
    // END IF;
    // SELECT _learner_id AS 'learner_id';
    // END
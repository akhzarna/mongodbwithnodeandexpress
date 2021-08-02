
const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());

// mongoose.connect("mongodb://localhost/mydb",{ useNewUrlParser: true, useUnifiedTopology: true},).then(
// ()=>{
//   console.log("Connected");
// }).catch(err=>{
//   console.log("Error in Connection");
// })
// app.listen(3000);


let MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/";

app.get('/:name', (req, res) => {

    MongoClient.connect(url, function(err, db) {

        console.log(req.params.name);

        if (err) throw err;

        var dbo = db.db("mydb");

        dbo.collection("dept").findOne({

            name: req.params.name

        },

        function(err, result) {
            if (err) throw err;
            res.json(result);
            console.log(result);
            db.close();
        });
    });


});


app.post('/', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        // console.log('req.body.name = ',req.body.id);
        // console.log('req.body.location  = ',req.body.location);
        dbo.collection("dept").insertOne({
            name: req.body.name,
            location: req.body.location
        },

        function(err, result) {
            if (err) throw err;
            res.json(result);
            db.close();
        });
    });
});


app.listen(3000);



// const express = require('express')
// const app = express()
//
// const testArray = [{title:"Akhzar Nazir"}, {title:"Bilal"}, {title:"Bilal"}];
//
// app.get('/', function (req, res) {
//   res.send('In the name of Allah')
// })
//
// app.get('/api/testing', function (req, res) {
//   res.send(testArray)
// })
//
// app.put('/api/testingput', function (req, res) {
//   res.send(testArray)
// })
//
// app.listen(3000)


// const http = require("http");
// http.createServer(function (req, res){
//       // console.log(req.url);
//       switch (req.url) {
//         case "/":
//           res.write(JSON.stringify([1,2,8]));
//           break;
//         case "/students":
//           res.write(JSON.stringify([1,2,3,4,5]));
//           break;
//         case "/myrecords":
//           res.write(JSON.stringify([1,2,6]));
//           break;
//         default:
//         res.write(JSON.stringify([1,2]));
//       }
//       res.end();
//   }
// ).listen(8080)

/**
 * Created by epi on 3/30/16.
 */

var express = require('express');
var router = express.Router();


var fs = require("fs");
var file = "./" + "pdms.db";
var exists = fs.existsSync(file);

router.get('/', function(req, res, next) {

    if(!exists) {
        console.log("Creating DB file.");
        fs.openSync(file, "w");
    }

    var sqlite3 = require("sqlite3").verbose();
    var db = new sqlite3.Database(file);

    db.serialize(function() {
        if(!exists) {
            db.run("CREATE TABLE PowerPerPD (pid TEXT,appid TEXT,wifi text,camera text,proc text,led text,time text)");
        }

        var stmt = db.prepare("INSERT INTO PowerPerPD VALUES (?,?,?,?,?,?,?);");

//Insert random data

            stmt.run('p1','a1','10','11','12','13','march_23_2016_08:56:00');

        var data;
        stmt.finalize();
        db.each("SELECT pid AS id, appid ,wifi,camera,led,proc FROM PowerPerPD", function(err, row) {

            data = row.id + ": " + row.appid +":"+ row.wifi + "," + row.camera+","+ row.led+","+row.proc+"<\br>";

        });

    });

    db.close();

});

router.post('/', function(req, res, next) {

    res.setHeader('Content-Type', 'application/json');
    var data = req.body;

    res.status(200).json(data);
});

module.exports = router;

// Required dependencies
const fs = require("fs");
const express = require("express");
const notesData = require("../data/db.json");

module.exports = function(app) {
    function writeToDB(notes) {

        // Converts the JSON array back into a string

        notes = JSON.stringify(notes);
        console.log(notes);
        // Writes String back to db.json
        fs.writeFileSync("./data/db.json", notes, function(err) {
            if (err) {
                return console.log(err);
            }
        });
    }

    app.get("/api/notes", function(req, res) {
        res.json(notesData);
    });

    app.post("/api/notes", function(req, res) {

        if (notesData.length == 0) {
            req.body.id = "0";
        } else {
            req.body.id = JSON.stringify(JSON.parse(notesData[notesData.length - 1].id) + 1);
        }

        console.log("req.body.id: " + req.body.id);

        // Pushes body to the JSON array
        notesData.push(req.body);

        // saves notes/ writes them in the database
        writeToDB(notesData);
        console.log(notesData);

        // returns the new note in JSON format
        res.json(req.body);
    });

    // DELETE Method helps delete note with specified ID
    app.delete("/api/notes/:id", function(req, res) {

        // Obtains id and converts to a string
        let id = req.params.id.toString();
        console.log(id);

        // Goes through notes array searching for matching id
        for (i = 0; i < notesData.length; i++) {

            if (notesData[i].id == id) {
                console.log("match!");
                res.send(notesData[i]);

                // Removes the deleted note
                notesData.splice(i, 1);
                break;
            }
        }

        // Write the notes data to database
        writeToDB(notesData);

    });
};
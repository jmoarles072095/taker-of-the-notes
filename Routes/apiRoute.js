// Required dependencies
const fs = require("fs");
const notesData = require("../db/db.json");

module.exports = function(app) {

    function writeToDB(notes) {
        // Converts the JSON array back into a string
        notes = JSON.stringify(notes);
        console.log(notes);
        fs.writeFileSync("./db/db.json", notes, function(err) {
            if (err) {
                return console.log(err);
            }
        });
    }

    // GET Method to return all the notes
    app.get("/api/notes", function(req, res) {
        res.json(notesData);
    });

    // POST Method to add the notes
    app.post("/api/notes", function(req, res) {

        if (notesData.length == 0) {
            req.body.id = "0";
        } else {
            req.body.id = JSON.stringify(JSON.parse(notesData[notesData.length - 1].id) + 1);
        }

        console.log("req.body.id: " + req.body.id);
        notesData.push(req.body);

        // Write notes data to the database
        writeToDB(notesData);
        console.log(notesData);

        // returns new note in JSON format.
        res.json(req.body);
    });

    // DELETE Method to delete note with specified ID
    app.delete("/api/notes/:id", function(req, res) {

        // Obtains id and converts to a string
        let id = req.params.id.toString();
        console.log(id);

        // Goes through notesArray searching for matching ID
        for (i = 0; i < notesData.length; i++) {

            if (notesData[i].id == id) {
                console.log("match!");
                // responds with deleted note
                res.send(notesData[i]);

                // Removes the deleted note
                notesData.splice(i, 1);
                break;
            }
        }

        // Write notes data to database
        writeToDB(notesData);

    });
};
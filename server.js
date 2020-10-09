// add required dependencies

const express = require("express");
const app = express();
const path = require("path");

// Create server application at port 3000
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


require("./routes/apiRoute")(app);
require("./routes/htmlRoute")(app);

app.use(express.static("public"));

// Add listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
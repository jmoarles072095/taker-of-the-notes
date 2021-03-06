// add required dependencies
const express = require("express");
const path = require("path");

// Create the server application at port 3000
const app = express();
PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


require("./Routes/apiRoute")(app);
require("./Routes/htmlRoute")(app);

app.use(express.static("public"));

// Add listener for port
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
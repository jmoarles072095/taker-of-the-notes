// add required dependencies
const express = require("express");
const path = require("path");

// Create the server application at port 7000
const app = express();
app.listen(process.env.PORT || 3000, function() {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


require("./routes/apiRoute")(app);
require("./routes/htmlRoute")(app);

app.use(express.static("public"));

// Add listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
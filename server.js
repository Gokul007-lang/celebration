console.log(__dirname);
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// SERVE HTML FILES
app.use(express.static(__dirname));

// TEST ROUTE
app.get("/", (req, res) => {
res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(8080, () => {
console.log("SERVER RUNNING 🚀");
});

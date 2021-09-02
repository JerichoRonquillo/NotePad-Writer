const express = require('express');
const fs = require('fs');
const PORT = "3432"
const uuid = require("uuid");

app.get("/", function (req,res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});
app.get("/notes", function (req,res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});


app.get("/api/notes", (req,res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"))
})
app.post("/api/notes", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const newNotes = req.body;
    newNotes.id = uuid.v4();
    notes.push(newNotes);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    res.json(notes);
});
app.get("/", function (req,res) {
    res.sendFile(path.join(__dirname,"/public/index.html"));
});


app.use(express.urlencoded({ extended:truie}));
app.use(express.json());
app.use(express.static("public"));

app.listen(PORT, function() {
    console.log("Listening to PORT"+ PORT);
})

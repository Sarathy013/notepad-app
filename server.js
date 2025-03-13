const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


const app = express();
app.use(express.json());
app.use(cors({ origin: "*" })); 


mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const NoteSchema = new mongoose.Schema({
  text: String,
});

const Note = mongoose.model("Note", NoteSchema);

// Get all notes
app.get("/notes", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

// Add a new note
app.post("/notes", async (req, res) => {
  const newNote = new Note({ text: req.body.text });
  await newNote.save();
  res.json(newNote);
});

// Delete a note
app.delete("/notes/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Note deleted" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

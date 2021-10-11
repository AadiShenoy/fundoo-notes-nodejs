const userService = require("../service/note.service.js");

class userController {
  //creates a note in the database
  createNote = (req, res) => {
    let title = req.body.title || "Untitled Note";
    let content = req.body.content;
    userService.createNote(title, content, (err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Note.",
        });
      }
      res.status(200).send(data);
    });
  };

  // Retrieve and return all notes from the database.
  findAll = (req, res) => {
    userService.findAll((err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Note.",
        });
      }
      res.status(200).send(data);
    });
  };

  // Find a single note with a noteId
  findOne = (req, res) => {
    let id = req.params.noteId;
    userService.findOne(id, (err, data) => {
      if (err) {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "Note not found with id " + id,
          });
        }
        return res.status(500).send({
          message: "Error retrieving note with id " + id,
        });
      }
      if (!data) {
        return res.status(404).send({
          message: "Note not found with id (in then) " + id,
        });
      }
      res.status(200).send({ Note: data });
    });
  };

  // Update a note identified by the noteId in the request
  updateNote = (req, res) => {
    let id = req.params.noteId;
    let title = req.body.title;
    let content = req.body.content;
    userService.updateNote(id, title, content, (err, data) => {
      if (err) {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "Note not found with id " + id,
          });
        }
        return res.status(500).send({
          message: "Error updating note with id " + id,
        });
      }
      if (!data) {
        return res.status(404).send({
          message: "Note not found with id " + id,
        });
      }
      res.send({ message:"Update Succesfull",Note: data });
    });
  };

  // Delete a note with the specified noteId in the request
  deleteOne = (req, res) => {
    let id = req.params.noteId;
    userService.deleteOne(id, (err, data) => {
      if (err) {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "Note not found with id " + id,
          });
        }
        return res.status(500).send({
          message: "Error deleting note with id " + id,
        });
      }
      if (!data) {
        return res.status(404).send({
          message: "Note not found with id " + id,
        });
      }
      res.send("Deleted node successfully");
    });
  };
}

module.exports = new userController();
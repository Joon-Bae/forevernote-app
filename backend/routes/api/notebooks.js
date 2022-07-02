const express = require("express");
const asyncHandler = require("express-async-handler");
const { NoteBook, Note } = require("../../db/models");
const router = express.Router();

//get all noteboooks for specific user
router.get('/:userId', asyncHandler(async(req, res) => {
    const userId = req.params.userId;
    const notebooks = await NoteBook.findAll({
        where: { userId: userId },
        order: [["updatedAt", "DESC"]],
    })
    return res.json(notebooks)
}))

//get all notes for specific notebook
router.get('/:notebookId/notes', asyncHandler(async(req,res) => {
    const notebookId = req.params.notebookId;

    const notes = await Note.findAll ({
        where: { notebookId: notebookId },
        order: [["updatedAt", "DESC"],]
    });
    return res.json(notes)
}))

//get one specific notebook
router.get('/:notebookId', asyncHandler(async(req, res) => {
    const notebookId = req.params.notebookId

    const notebook = await NoteBook.findByPk(notebookId)
    return res.json(notebook)
}))

//CREATE A NOTEBOOK
router.post('/new', asyncHandler(async(req, res) => {
    const { userId, title } = req.body;
    const createdNotebook = await NoteBook.create({
        userId: userId,
        title: title,
        createdAt: new Date(),
        updatedAt: new Date(),
    })
    return res.json(createdNotebook)
}))

//DELETE A NOTEBOOK
router.delete(
    "/:notebookId",
    asyncHandler(async (req, res) => {
      const notebookId = req.params.notebookId;

      const notebook = await NoteBook.findByPk(notebookId);
      console.log(notebook, "this is what we want to delete")
      await notebook.destroy();
      return res.json(notebook);
    })
  );;


module.exports = router;

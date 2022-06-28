const express = require('express')
const asyncHandler = require('express-async-handler')
const { Note, User } = require('../db/models')
const router = express.Router();

router.get('/', async (req,res) => {
    const notes = await Note.findAll({
        include: User,
    })
    return res.json(notes);
});

router.post('/',
asyncHandler(async (req,res) => {
    const note = ({
        userId,
        notebookId,
        title,
        content,
    } = await Note.create(req.body));
    return res.json(note)
})
);

router.put(
'/:id',
asyncHandler(async (req, res) => {
    const {
        id,
        userId,
        notebookId,
        title,
        content
    } = req.body

    await Note.update(
        {
            userId,
            notebookId,
            title,
            content
        },
        {
            where: { id },
        }
    )
    return res.json(id);
})
);

router.delete('/:id',
asyncHandler(async(req, res) => {
const id = req.params.id;
const note = await Note.findByPk(id)

await Note.destroy({
    where: { noteId: note.id}
})

return res.json(id)
})
);

module.exports = router;

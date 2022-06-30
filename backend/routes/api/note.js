const express = require('express')
const asyncHandler = require('express-async-handler')
const { Note, User } = require('../../db/models')
const router = express.Router();

// router.get('/test/:id', asyncHandler(async(req,res)=> {
//     console.log('testtttttttttt')
// }))
router.get('/one/:id', asyncHandler(async (req, res) => {
    const id = req.params.id
    const note = await Note.findByPk(id)
    return res.json(note)
}))

router.get('/:id', asyncHandler(async (req,res) => {
    const userId = req.params.id

    const notes = await Note.findAll({
        where: {
            userId
        }})
    // const notes = await Note.findAll({
    //     where: userId,
    //     include: [User]
    // })
    return res.json(notes);
}));

router.post('/',
asyncHandler(async (req,res) => {
    // console.log(req.body, "*****************")
    const { userId, notebookId, title, content } = req.body;
    const note = await Note.create({
        userId: userId,
        notebookId: notebookId,
        title: title,
        content: content,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    // const note = ({
    //     userId,
    //     notebookId,
    //     title,
    //     content,
    // } = await Note.create(req.body));
    // return res.send()
    return res.json(note)
})
);

router.put(
'/:id/edit',
asyncHandler(async (req, res) => {
    const {
        userId,
        id,
        title,
        content
    } = req.body

    // console.log(note, "hello joon")

    const editedNote = await Note.update(
        {
            userId,
            id,
            title,
            content
        },
        {
            where: { id },
        }
        )
    const note = await Note.findByPk(id)
    return res.json(note);
    // return res.send(':)')
})
);

router.delete('/:id',
asyncHandler(async(req, res) => {
const id = req.params.id;
const note = await Note.findByPk(id)

await note.destroy();

return res.json(note)
})
);

module.exports = router;

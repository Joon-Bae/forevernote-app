import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteNote } from '../../store/notes';
import { editNote } from '../../store/notes';

const Note = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const { id } = useParams();
// const note = useSelector((state)=> Object.values(state.note))
// use the params to get the id of the note
// create a dispatch that grabs the findByPK of this particular note
// useSelector to grab the note and then plug that note in for lines 11 and 12

const editUserNote = (e) => {
    e.preventDefault();
    e.stopPropagation();
    history.push(`/note/${id}/edit`)
    // console.log("HELLO)))))))")
    // dispatch(editNote(id))
    // .then(()=>{
    //     history.push('/')
    // })
}

const deleteUserNote = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log("HELLO)))))))")
    dispatch(deleteNote(id))
    .then(()=>{
        history.push('/')
    })
}
    return (
        <div>
            <h1>Note Title</h1>
            <p>Note Body</p>
            <button onClick={(e)=> editUserNote(e)}>
                Edit Note</button>
            <button onClick={(e) => deleteUserNote(e)}>
                Delete Note
            </button>
        </div>
    )
}

export default Note

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteNotebookThunk } from '../../store/notebooks';
import { getNotebooksThunk } from '../../store/notebooks';


const Notebook = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const { id } = useParams();
    console.log("****************", id)
    const sessionUser = useSelector((state) => state.session.user)
// const note = useSelector((state)=> Object.values(state.note))
// use the params to get the id of the note
// create a dispatch that grabs the findByPK of this particular note
// useSelector to grab the note and then plug that note in for lines 11 and 12


const deleteUserNotebook = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log("HELLO)))))))")
    dispatch(deleteNotebookThunk(id))
    // .then(() => dispatch(getNotebooksThunk(sessionUser.id)))
    .then(()=>{
        history.push('/home')
    })
}
    return (
        <div>
            <h1>Notebook Title</h1>
            <button onClick={(e) => deleteUserNotebook(e)}>
                Delete Notebook
            </button>
        </div>
    )
}

export default Notebook

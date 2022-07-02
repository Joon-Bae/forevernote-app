import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { deleteNotebookThunk, getNotebookNotesThunk } from '../../store/notebooks';
import { getNotebooksThunk } from '../../store/notebooks';



const Notebook = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const { id } = useParams();
    const userNotes = useSelector((state) => state.notebook.notes)
    // console.log("****************", id)
    const sessionUser = useSelector((state) => state.session.user)
    const notebookArray = useSelector((state) => Object.values(state?.notebook))
    // console.log(notebookArray, 'is this notebookarray? ')
    // const note = useSelector((state)=> Object.values(state.note))
    // use the params to get the id of the note
    // create a dispatch that grabs the findByPK of this particular note
    // useSelector to grab the note and then plug that note in for lines 11 and 12
    useEffect(()=> {
        dispatch(getNotebookNotesThunk(id))
    }, [dispatch])

    const sendToNewNoteForm = (e) => {
        e.preventDefault();
        e.stopPropagation();
        //change 1 later to be notebookId when notebook is created
        history.push(`/notebooks/${id}/note/new`)
    }

    const deleteUserNotebook = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // console.log("HELLO)))))))")
        dispatch(deleteNotebookThunk(id))
            // .then(() => dispatch(getNotebooksThunk(sessionUser.id)))
            .then(() => {
                history.push('/home')
            })
    }
    return (
        <>
        <div>
            <h1>Notebook Title</h1>
            <button
            onClick={(e) => deleteUserNotebook(e)}
            disabled={notebookArray.length <= 2 ? true : false}
            >
                Delete Notebook
            </button>
        </div>
        <div className='add-note'>
        <button onClick={(e) => sendToNewNoteForm(e)}>
            Add a Note
        </button>
    </div>
    <div className='user-notes'>
        {userNotes?.length > 0 ? userNotes?.map((note) => {
            return (
                <NavLink key={`${note?.id}`} to={`/note/${note?.id}`}>
                    <div>
                        {note?.title}
                    </div>
                    <div>
                        {note?.content}
                    </div>
                </NavLink>
            )

        }): <h1>No Notes Currently</h1> }
    </div>
    </>
    )
}

export default Notebook

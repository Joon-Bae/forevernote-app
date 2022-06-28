import note from '../../../backend/db/models/note';
import { csrfFetch } from './csrf'

const GET_NOTES = 'notes/getNotes';
const ADD_NOTE = 'notes/addNote';
const EDIT_NOTE = '/notes/editNote';
const DELETE_NOTE = 'notes/deleteNote';

//ACTIONS

const getNotes = (notes) => {
    return {
        type: GET_NOTES,
        notes
    };
};

const addYourNote = (note) => {
    return {
        type: ADD_NOTE,
        note,
    };
}

const editYourNote = (noteId) => {
    return {
        type:EDIT_NOTE,
        noteId
    };
}

const deleteYourNote = (noteId) => {
    return {
        type: DELETE_NOTE,
        noteId
    }
}

//THUNKS
export const getAllNotes = () => async(dispatch) => {
    const result = await csrfFetch('/api/note');

    if (result.ok) {
        const notes = await result.json();
        dispatch(getNotes(notes))
    }
}

export const addNote = (note) => async(dispatch) => {
    const result = await csrfFetch('/api/note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(result)
    })

    if (result.ok) {
        const data = await res.json();
        dispatch(addYourNote(data))
        return data;
    }
}

export const editNote = (data, id) => async(dispatch) => {
    const result = await csrfFetch(`/api/note/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(result)
    })

    if (result.ok) {
        const data = await res.json();
        dispatch(editYourNote(data))
        return data;
    }
}

export const deleteNote = (id) => async(dispatch) => {
    const result = csrfFetch(`/api/note/${id}`, {
        method: 'DELETE'
    })

    if (result.ok) {
        const noteId = await result.json();
        dispatch(deleteYourNote(noteId))
    }
}

const noteReducer = (state = {}, action) => {
    let newState = {};
    switch (action.type) {
        case GET_NOTES:
            action.notes.forEach((note) => {
                newState[note.id] = note;
            });
            return newState;
        case ADD_NOTE:
            if(!state[action.note.id]) {
                newState = { ...state, [action.note.id]: action.note}
                return newState
            }
        case EDIT_NOTE:
            newState = {
                ...state,
                [action.note.id]: {
                    ...state[action.note.id],
                    ...action.note
                }
            }
            return newState;
        case DELETE_NOTE:
            newState = { ...state };
            delete newState[action.noteId.id];
            return newState;
        default:
            return state;
    }
}

export default noteReducer

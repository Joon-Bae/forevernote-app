import { csrfFetch } from './csrf'

const GET_NOTES = 'notes/getNotes';
const ADD_NOTE = 'notes/addNote';
const EDIT_NOTE = '/notes/editNote';
const DELETE_NOTE = 'notes/deleteNote';

//ACTIONS

const getNotes = (notes) => {
    return {
        type: GET_NOTES,
        payload: notes
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
export const getAllNotes = (id) => async(dispatch) => {
    const result = await csrfFetch(`/api/note/${id}`);
    if (result.ok) {
        const allNotes = await result.json();
        dispatch(getNotes(allNotes))
        return allNotes
    }
}

export const addNote = (note) => async(dispatch) => {
    const result = await csrfFetch('/api/note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(result)
    })

    if (result.ok) {
        const data = await result.json();
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
        const data = await result.json();
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

const initialState = {}
const noteReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case GET_NOTES:
            newState = {...state}
            const notes = action.payload
            if(notes.length > 0){
                notes.forEach((note) => {
                    newState[note.id] = note;
                });
            }
            return newState;

        case ADD_NOTE:
            if(!state[action.note.id]) {
                newState = { ...state, [action.note.id]: action.note}
                return newState
            };
            break;

        case EDIT_NOTE:
            // find the id of the new incoming note
            //index into the state to find that id: newState.id
            // point that to be the new item:
            // newState.id = action.payload
// action.payload = {id: 1, note: 'bye'}
// newState = {1: {id: 1, note: 'bye'}}


            newState = {
                ...state,
                [action.note.id]: {
                    ...state[action.note.id],
                    ...action.note
                }
            };
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

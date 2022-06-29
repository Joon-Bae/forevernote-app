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
        payload: note,
    };
}

const editYourNote = (noteId) => {
    return {
        type:EDIT_NOTE,
        payload: noteId
    };
}

const deleteYourNote = (noteId) => {
    return {
        type: DELETE_NOTE,
        payload: noteId
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
        body: JSON.stringify(note)
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
    // console.log("HELLLLO")
    const result = await csrfFetch(`/api/note/${id}`, {
        method: 'DELETE'
    })
    // console.log(result)
    if (result.ok) {
        const noteId = await result.json();
        console.log(noteId)
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
            newState = {...state}
            const newNoteId = action.payload.id
            newState[newNoteId] = action.payload
            // if(!state[action.note.id]) {
            //     newState = { ...state, [action.note.id]: action.note}
            //     return newState
            // };
            return newState;

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
            const deletedId = action.payload.id
            delete newState[`${deletedId}`];
            return newState;

        default:
            return state;
    }
}

export default noteReducer

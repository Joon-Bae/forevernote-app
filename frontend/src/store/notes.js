import { csrfFetch } from './csrf'

const GET_NOTES = 'notes/getNotes';
const GET_NOTE = '/notes/getNote'
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

const getOneNote = (note) => {
    return {
        type: GET_NOTE,
        payload: note
    }
}

const addYourNote = (note) => {
    return {
        type: ADD_NOTE,
        payload: note,
    };
}

const editYourNote = (note) => {
    return {
        type:EDIT_NOTE,
        payload: note
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

export const getSingleNote = (id) => async(dispatch) => {
    const result = await csrfFetch(`/api/note/one/${id}`);
    if (result.ok) {
        const oneNote = await result.json();
        dispatch(getOneNote(oneNote))
        return oneNote
    }
}

export const addNote = (note) => async(dispatch) => {
    const result = await csrfFetch('/api/note/new', {
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

export const editNote = (formValues) => async(dispatch) => {
    const { id } = formValues
    console.log(id, "*********************)_")
    const result = await csrfFetch(`/api/note/${id}/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(formValues)
    })
    console.log(result, "))))))))))))))))))))))))))")
    if (result.ok) {
        const note = await result.json();
        console.log(note, "---------------:)")
        dispatch(editYourNote(note))
        return note;
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

        case GET_NOTE:
            newState = { ...state }
            const note = action.payload
            const id = action.payload.id
            newState[id] = note
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

            newState= { ...state }
            const editId = action.payload.id
            newState[editId] = action.payload
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

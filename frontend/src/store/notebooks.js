import { csrfFetch } from './csrf'

//ACTIONS
const GET_NOTEBOOKS = 'notebooks/GET_NOTEBOOKS'
const GET_NOTEBOOKNOTES = 'notes/GET_NOTEBOOKNOTES'
const GET_NOTEBOOK = 'notebooks/GET_NOTEBOOK'
const CREATE_NOTEBOOK = 'notebooks/CREATE_NOTEBOOK'
const DELETE_NOTEBOOK = '/notebooks/DELETE_NOTEBOOK'


//ACTION CREATORS:
const getNotebooks = (notebooks) => ({
    type: GET_NOTEBOOKS,
    payload: notebooks,
});

const getNotebookNotes = (notes) => ({
    type: GET_NOTEBOOKNOTES,
    payload: notes,
});

const getNotebook = (notebook) => ({
    type: GET_NOTEBOOK,
    patload: notebook,
});

const createNotebook = (notebooks) => ({
    type: CREATE_NOTEBOOK,
    payload: notebooks,
});

const deleteNotebook = (notebookId) => ({
    type: DELETE_NOTEBOOK,
    payload: notebookId
});

//THUNKS
export const getNotebooksThunk = (userId) => async(dispatch) => {
    const res = await fetch(`/api/notebooks/${userId}`);

    if (res.ok) {
        const allNotebooks= await res.json();
        dispatch(getNotebooks(allNotebooks));
        return allNotebooks;
    }
}

export const getNotebookNotesThunk = (notebookId) => async(dispatch) => {
    const res = await fetch(`/api/notebooks/${notebookId}/notes`);

    if (res.ok) {
        const allNotebookNotes = await res.json();
        dispatch(getNotebookNotes(allNotebookNotes))
        return allNotebookNotes
    }
}

export const getNotebookThunk = (notebookId) => async(dispatch) => {
    const res = await fetch(`/api/notebooks/${notebookId}`);

    if (res.ok) {
        const notebook = await res.json();
        dispatch(getNotebook(notebook));
        return notebook;
    }
}

export const createNotebookThunk = (createdNoteBook) => async(dispatch) => {
    const res = await csrfFetch('/api/notebooks/new', {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(createdNoteBook),
    })

    if (res.ok) {
        const notebook = await res.json();
        dispatch(createNotebook(notebook))
        return notebook;
    }
}

export const deleteNotebookThunk = (notebookId) => async(dispatch) => {
    const res = await csrfFetch(`/api/notebooks/${notebookId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        const data = await res.json()
        dispatch(deleteNotebook(data));
    }
}

//REDUCER
const initialState = {};

function notebooksReducer(state = initialState, action) {
    let newState = {}
    switch (action.type) {
        case GET_NOTEBOOKS: {
            const newState = {...state}
            const notebooks = action.payload
            if(notebooks.length > 0){
                notebooks.forEach((notebook) => {
                    newState[notebook.id] = notebook;
                });
            }
            return newState;
        }
        case GET_NOTEBOOKNOTES: {
            newState = { ...state }
            const notes = action.payload
            const id = action.payload.id
            newState[id] = notes
            return newState;
        }
        case GET_NOTEBOOK: {
            newState = { ...state }
            const notebook = action.payload
            const id = action.payload.id
            newState[id] = notebook
            return newState;
        }
        case CREATE_NOTEBOOK: {
             newState = {...state}
            const newNotebookId = action.payload.id
            newState[newNotebookId] = action.payload
            return newState;
        }
        case DELETE_NOTEBOOK: {
            newState = { ...state };
            const deletedId = action.payload.id
            delete newState[`${deletedId}`];
            return newState;
        }
        default:
            return state;
    }
}

export default notebooksReducer

import "./homepage.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotes } from "../../store/notes";
import { useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { deleteNotebookThunk, getNotebooksThunk } from '../../store/notebooks'

export const Homepage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const notebookId = useSelector(state => state?.session?.notebook?.id)
    const userId = useSelector(state=> state?.session?.user?.id)
    // const userId = useSelector((state) => state.session.user.id)
    const userNotes = useSelector((state) => Object.values(state.note))
    const userNotebooks = useSelector((state) => Object.values(state.notebook))
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        if (userId) {
            dispatch(getAllNotes(userId))
            dispatch(getNotebooksThunk(userId))
            setIsLoaded(true)
        }
    }, [dispatch, isLoaded, userId])


    const sendToNewNoteForm = (e) => {
        e.preventDefault();
        e.stopPropagation();
        //change 1 later to be notebookId when notebook is created
        history.push(`/notebooks/1/note/new`)
    }

    const sendToNewNotebookForm = (e) => {
        e.preventDefault();
        e.stopPropagation();
        history.push(`/notebooks/new`)
    }

    if (!userId) {
        return null;
    }
    else if (isLoaded){
        return (
            <div>
                <div className='add-notebook'>
                    <button onClick={(e) => sendToNewNotebookForm(e)}>
                        Add a Notebook
                    </button>
                </div>
                <div className='user-notes'>
                    {userNotebooks?.length > 0 ? userNotebooks?.map((notebook) => {
                        return (
                            <NavLink key={`${notebook?.id}`} to={`/notebooks/${notebook?.id}`}>
                                <div>
                                    {userId === notebook.userId? notebook?.title: null}
                                </div>
                            </NavLink>
                        )

                    }): <h1>No Notebooks Currently</h1> }
                </div>
            </div>
        )
    }
    else {
        return null;
    }
}

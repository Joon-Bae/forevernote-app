import "./homepage.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotes } from "../../store/notes";
import { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

export const Homepage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const userId = useSelector(state=> state?.session?.user?.id)
    // const userId = useSelector((state) => state.session.user.id)
    const userNotes = useSelector((state) => Object.values(state.note))
    const userNotebooks = useSelector((state) => Object.values(state.notebook))
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        if (userId) {
            dispatch(getAllNotes(userId))
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
    // } else if (!isLoaded){
    //         return <h1>Loading...</h1>
    } else {
        return (
            <>
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
                                    {notebook?.title}
                                </div>
                            </NavLink>
                        )

                    }): <h1>No Notebooks Currently</h1> }
                </div>
            </>
        )
    }
}

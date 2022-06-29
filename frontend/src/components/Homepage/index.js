import "./homepage.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotes } from "../../store/notes";
import { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

export const Homepage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state=> state.session.user)
    // const userId = useSelector((state) => state.session.user.id)
    const userNotes = useSelector((state) => Object.values(state.note))
    const [isLoaded, setIsLoaded] = useState(false)

    // console.log(userId, "wtf is this piece of ...")
    useEffect(() => {
        if (sessionUser) {
            const userId = sessionUser.id
            dispatch(getAllNotes(userId))
                .then(() => setIsLoaded(true))
        }
    }, [dispatch, isLoaded, sessionUser])

    // useEffect(() => {
    //     console.log("effect notes:: ", note)
    // }, [note])

    const sendToNewForm = (e) => {
        e.preventDefault();
        e.stopPropagation();
        //change 1 later to be notebookId when notebook is created
        history.push(`/notebook/1/note/new`)
    }

    if (!sessionUser) {
        return null;
    } else if( !isLoaded){
        return <h1>Loading...</h1>
    } else {
        return (
            <>
                <div className='add-note'>
                    <button onClick={(e) => sendToNewForm(e)}>
                        Add a Note
                    </button>
                </div>
                <div className='user-notes'>
                    {userNotes.length === 0 ? <h1>No Notes Currently</h1> : userNotes?.map((note) => {
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

                    })}
                </div>
            </>
        )
    }
}

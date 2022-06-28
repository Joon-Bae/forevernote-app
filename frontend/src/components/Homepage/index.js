import "./homepage.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotes } from "../../store/notes";
import { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";

export const Homepage = () => {
    const dispatch = useDispatch();
    const userNotes = useSelector((state) => Object.values(state.note))
    console.log(userNotes)

    useEffect(() => {
        dispatch(getAllNotes());
    }, [dispatch])

return(
    <>
    <div className='add-note'>
        <button>
            Add a Note
        </button>
    </div>
    <div className='user-notes'>
    {userNotes.map((note) => {
        <NavLink key={`${note.id}`} to={`/note/${note.id}`}>
            <div>
                {note.title}
            </div>
            <div>
                {note.content}
            </div>
        </NavLink>
    })}
    </div>
    </>
)
}

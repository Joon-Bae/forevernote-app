import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editNote } from '../../store/notes';

function EditForm() {
    const dispatch = useDispatch();
    const { id } = useParams();
    // console.log("**************", useParams())
    const userId = useSelector((state) => state?.session?.user?.id)
    const note = useSelector((state) => state.note[id])
    console.log(note)
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [errors, setErrors] = useState([]);
    const history = useHistory();


    useEffect(() => {
        const validationErrors = [];
        if (!title.length) validationErrors.push("Title is required");
        if (title.length > 100) validationErrors.push("Title must be 100 characters or less");
        if (!content.length) validationErrors.push("Content is required");
        if (content.length > 500) validationErrors.push("Content must be 500 characters or less");
        setErrors(validationErrors);
    }, [title, content]);

    const handleSubmit = () => {
        const formValues = {
            userId, //2
            id, //55
            title, //joon
            content //2
        }
        // dispatch(editNote(formValues))
        // console.log(formValues)
        // history.push('/')

        // function submitEdit(e){
        //     e.preventDefault();

        dispatch(editNote(formValues))
        history.push('/')

    }


    return (
        <form
            className="note-form"
            onSubmit={handleSubmit}
        >
            <h2>Edit Form</h2>
            <ul className="errors">
                {
                    errors.map(error => (
                        <li key={error}>{error}</li>
                    ))
                }
            </ul>
            <label>
                Title
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            <label>
                Content
                <input
                    type="text"
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </label>
            <button
                type="submit"
                disabled={errors.length > 0}
            >
                Edit Note
            </button>
        </form>
    );
}

export default EditForm;

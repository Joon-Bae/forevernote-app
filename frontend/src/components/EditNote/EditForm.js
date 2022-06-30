import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addNote } from '../../store/notes';

function EditForm() {
    const dispatch = useDispatch();
    const { notebookId } = useParams();
    const userId = useSelector((state) => state?.session?.user?.id)
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
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
            userId,
            notebookId,
            title,
            content
        }
        dispatch((formValues))
        console.log(formValues)
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
                Create Note
            </button>
        </form>
    );
}

export default NewNoteForm;

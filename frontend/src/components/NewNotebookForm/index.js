import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createNotebookThunk } from '../../store/notebooks'

function NewNotebookForm() {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state?.session?.user?.id)
    const [title, setTitle] = useState("");
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const validationErrors = [];
        if (!title.length) validationErrors.push("Title is required");
        if (title.length > 100) validationErrors.push("Title must be 100 characters or less");
        setErrors(validationErrors);
    }, [title]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formValues = {
            userId,
            title,
        }
        dispatch(createNotebookThunk(formValues))
        console.log(formValues)
        history.push('/home')
    }

    return (
        <form
            className="notebook-form"
            onSubmit={handleSubmit}
        >
            <h2>New Notebook</h2>
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
            <button
                type="submit"
                disabled={errors.length > 0}
                onClick={(e) => handleSubmit(e)}
            >
                Create Notebook
            </button>
        </form>
    );
}

export default NewNotebookForm;

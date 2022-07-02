import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editNote } from '../../store/notes';
import { getSingleNote } from '../../store/notes'

function EditForm() {

    const dispatch = useDispatch();
    const { id, notebookId } = useParams();
    // console.log("**************", useParams())
    const userId = useSelector((state) => state?.session?.user?.id)
    const note = useSelector((state) => state?.note[id])
    const oneNote = useSelector((state) => state.note)
    // console.log(note)
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    // if(note){
    //     setTitle(note.title);
    //     console.log(title)
    //     setContent(note.content);
    //     console.log(content)
    //     console.log('&***** ^this is what you are looking for')
    // }
    //useeffect for dynamic checking of backend data
    useEffect(()=> {
        dispatch(getSingleNote(id))
        .then(()=> setTitle(note.title))
        .then(()=> setContent(note.content))
    }, [dispatch])
    //useeffect only for dynamic error checking
    useEffect(() => {
        const validationErrors = [];
        if (!title.length) validationErrors.push("Title is required");
        if (title.length > 100) validationErrors.push("Title must be 100 characters or less");
        if (!content.length) validationErrors.push("Content is required");
        if (content.length > 500) validationErrors.push("Content must be 500 characters or less");
        setErrors(validationErrors);

    }, [title, content]);

    const handleSubmit = (e) => {
        e.preventDefault();
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
        history.push(`/notebooks/${notebookId}`)

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

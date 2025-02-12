import { useState, useContext } from "react";
import useBooksContext from "../hooks/use-books-context";

// Add the BookCreate component
function BookCreate() {
    const [title, setTitle] = useState('');
    const { createBook } = useBooksContext();

    const handleChange = (event) => {
        setTitle(event.target.value);
    };
    // Add the handleSubmit function
    const handleSubmit = (event) => {
        event.preventDefault();
        createBook(title);
        setTitle('');
    };
    // Add the form to the BookCreate component
    return  (
        <div className="book-create">
            <h3>Add a Book</h3>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input className="input" value={title} onChange={handleChange} />
                <button className="button">Create!</button>
            </form>
        </div>
    )

}


export default BookCreate;
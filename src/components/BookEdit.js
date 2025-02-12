import { useState, useContext } from 'react';
import useBooksContext from '../hooks/use-books-context';

// Add the BookEdit component
function BookEdit({ book, onSubmit }) {
    const [title, setTitle] = useState(book.title);
    const { editBookById } = useBooksContext();

    const handleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        onSubmit();
        editBookById(book.id, title);
    };

    // Add the JSX for the BookEdit component
    return (
        <form onSubmit={handleSubmit} className="book-edit">
            <label>Title</label>
            <input className="input" value={title} onChange={handleChange} />
            <button className="button">Save!</button>
        </form>
    );
};


export default BookEdit;
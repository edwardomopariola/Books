import { useState, useEffect } from 'react';
import axios from 'axios';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';

function App() {
    const [books, setBooks] = useState([]);

    //  fetchBooks is a function that makes a GET request to the server to fetch all the books.
    const fetchBooks = async () => {
        const response = await axios.get('http://localhost:3001/books');

        setBooks(response.data);
    };

    // useEffect is a hook that runs the fetchBooks function when the component mounts. function imported from axios
    useEffect(() => {
        fetchBooks();
    }, []);

        // editBookById is a function that updates a book by its id.
    const editBookById = async (id, newTitle) => {

        // making a put request to the server to update the book with the new title
        await axios.put(`http://localhost:3001/books/${id}`, {
            title: newTitle
        });

        console.log(response)

        // updating the state with the updated book
        const updatedBooks = books.map((book) => {
            if (book.id === id) {
                return { ...book, ...response.data };
            }
            return book;
        });
        setBooks(updatedBooks);
    };

    // deleteBookById is a function that deletes a book by its id.
    const deleteBookById = async (id) => {
        
        // making a delete request to the server to delete the book with the id that was passed to the
        await axios.delete(`http://localhost:3001/books/${id}`);

            // updatedBooks is a new array of books that does not contain the book with the id that was passed to the function.
        const updatedBooks = books.filter((book) =>{
            return book.id !== id;
        });
        setBooks(updatedBooks);
    };

    // CreateBook is a function that creates a new book.
    const CreateBook = async (title) => {
        const response = await axios.post('http://localhost:3001/books', {
            title
        });

            // updatedBooks is a new array of books that contains the new book that was created.
        const updatedBooks = [
            ...books, 
            response.data
        ];
        setBooks(updatedBooks);
    };

  return (
    <div className='app'>
        <h1>Reading list</h1>
      <BookList onEdit={editBookById} books={books} onDelete={deleteBookById} />
      <BookCreate onCreate={CreateBook} />  
    </div>
  );
}

export default App;
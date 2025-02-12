import { createContext, useState } from 'react';
import axios from 'axios';

// BooksContext is a context object that we can use to share the state and functions with the rest of the application.
const BooksContext = createContext();

// Provider is a component that wraps the children components and passes the state and functions to the BooksContext.Provider.
function Provider({ children }) {
    // books is a state variable that holds all the books.
    const [books, setBooks] = useState([]);
     //  fetchBooks is a function that makes a GET request to the server to fetch all the books.
    const fetchBooks = async () => {
        const response = await axios.get('http://localhost:3001/books');
        setBooks(response.data);
    };

    // CreateBook is a function that creates a new book.
     const createBook = async (title) => {
        const response = await axios.post('http://localhost:3001/books', { title });
         // updatedBooks is a new array of books that contains the new book that was created.
        const updatedBooks = [
            ...books, 
            response.data
        ];
        setBooks(updatedBooks);
    };


    // editBookById is a function that updates a book by its id.
    const editBookById = async (id, newTitle) => {
        // making a put request to the server to update the book with the new title
        const response = await axios.put(`http://localhost:3001/books/${id}`, {
            title: newTitle
        });

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

   
    // valueToShare is an object that contains all the functions and state variables that we want to share with the rest of the application.
    const valueToShare = {
        books,
        editBookById,
        deleteBookById,
        createBook,
        fetchBooks,
    };

    // The Provider component wraps the children components and passes the valueToShare object to the BooksContext.Provider.
    return (
        <BooksContext.Provider value={valueToShare}>
            {children}
        </BooksContext.Provider>
 );
};


export { Provider };
export default BooksContext;
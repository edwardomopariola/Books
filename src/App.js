import { useEffect, useContext } from 'react';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';
import BooksContext from './context/books';

function App() {
    // Destructuring the fetchBooks function from the Books
   const { fetchBooks } = useContext(BooksContext);
    
    // useEffect is a hook that runs the fetchBooks function when the component mounts. function imported from axios
    useEffect(() => {
        fetchBooks();
    }, []);

    
  return (
    <div className='app'>
    <h1>Reading list</h1>
      <BookList  />
      <BookCreate />  
    </div>
  );
}

export default App;
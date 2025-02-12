import { useContext } from "react"
import  BooksContext from "../context/books"

// Create a custom hook called useBooksContext that returns the BooksContext
function useBooksContext() {
    return useContext(BooksContext);
}


export default useBooksContext;
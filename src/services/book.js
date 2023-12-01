import { useSelector } from "react-redux";

export function getBookById({ params }) {
    return { bookId: params.id };
}

export function isBookIncluded(book, books) {
    if (!Array.isArray(books)) {
        console.error('books is not an array');
        return false;
    }
    return books.some(b => b.bookId === book.bookId);
}
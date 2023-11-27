import axios from 'axios';
const baseUrl = "http://localhost:3000/api/books";

export const getBooks = async () => {
    console.log("getBooks");
    const response = await axios.get(baseUrl);
    console.log("response", response);
    return response.data;
};

export const addBook = async (book) => {
    const response = await axios.post(baseUrl, book);
    return response.data;
}

export const deleteBook = async (book) => {
    const response = await axios.delete(`${baseUrl}/${book.id}`);
    return response.data;
}
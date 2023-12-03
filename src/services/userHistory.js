import axios from 'axios';
const baseUrl = "http://localhost:3000/api/history";

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export const getHistory = async () => {
    const config = {
        headers: { Authorization: token },
    };
    console.log("getHistory");
    const response = await axios.get(baseUrl, config);
    console.log("response", response);
    return response.data;
};

export const addBook = async (book) => {
    const config = {
        headers: { Authorization: token },
    };
    const response = await axios.post(baseUrl, book, config);
    return response.data;
}

export const deleteBook = async (book) => {
    const config = {
        headers: { Authorization: token },
    };
    const response = await axios.delete(`${baseUrl}/${book.bookId}`, config);
    return response.data;
}

export default { setToken }
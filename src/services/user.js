import axios from 'axios';
const baseUrl = "http://localhost:3000/api/users";

export const addNewUser = async (username, password) => {
    const response = await axios.post(baseUrl, { username, password });
    return response.data;
}
import axios from 'axios';
const baseUrl = "http://localhost:3000/api/users";

export const addNewUser = async (username, password) => {
    try {
        const response = await axios.post(baseUrl, { username, password });
    } catch (error) {
        console.log(error);
    }
}

export const deleteUser = async (user) => {
    console.log("deleteUser", user);
    try {
        const response = await axios.delete(`${baseUrl}/${user.id}`);
        console.log("deleteUser response", response);
    } catch (error) {
        console.log(error);
    }
}
import axios from 'axios';
const baseUrl = "http://localhost:3000/api/booksSearch?q=";

export const search = async (query, index) => {
    if(query === undefined || query === null || query === ""){
        return [];
    }
    query = query.replace(/ /g, "+");
    const response = await axios.get(baseUrl + "q=" + query + "&startIndex=" + index);
    return response.data;
};


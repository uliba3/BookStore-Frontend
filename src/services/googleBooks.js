import axios from 'axios';
const baseUrl = "/api/booksSearch";

export const search = async (query, index) => {
    //console.log("searching for " + query);
    if(query === undefined || query === null || query === ""){
        return [];
    }
    query = query.replace(/ /g, "+");
    const response = await axios.get(baseUrl + "?q=" + query + "&startIndex=" + index*10);
    return response.data;
};

export const getGoogleBook = async (bookId) => {
    const response = await axios.get(baseUrl + "/" + bookId);
    return response.data;
};

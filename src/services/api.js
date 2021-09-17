import axios from "axios";

const api = axios.create({
    baseURL: "https://damp-tundra-38012.herokuapp.com"
});

export default api;


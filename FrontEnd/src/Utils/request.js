import axios from "axios";

const request = axios.create({
    baseURL:"https://orebi-b.onrender.com"
});

export default request;


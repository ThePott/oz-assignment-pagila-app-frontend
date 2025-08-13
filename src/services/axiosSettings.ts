import axios from "axios";

export const axiosFilm = axios.create({
    baseURL: "http://localhost:3939/film"
})


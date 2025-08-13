import axios from "axios"

const getAllFilms = async () => {
    const response = await axios.get("")
    const filmArray = response.data
    return filmArray
}

// const 
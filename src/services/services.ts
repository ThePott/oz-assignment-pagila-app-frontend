import { axiosFilm } from "./axiosSettings"

export const getAndStore = async (
    additionalUrl: string,
    setAdditionalUrl: (additionalUrl: string | null) => void,
    storeFunction: any
) => {
    try {
        const response = await axiosFilm.get(additionalUrl)
        const result = response.data
        storeFunction(result)
        // debugger
        setAdditionalUrl(null)
    } catch (error) {
        console.error({error})
    }
}


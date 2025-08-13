import { axiosFilm } from "./axiosSettings"

export const getAndStore = async (
    additionalUrl: string,
    setAdditionalUrl: (additionalUrl: string | null) => void,
    storeFunction: any
) => {
    try {
        debugger
        console.log({additionalUrl})
        const response = await axiosFilm.get(additionalUrl)
        const result = response.data
        storeFunction(result)
        setAdditionalUrl(null)
        console.log({result})
    } catch (error) {
        console.error({error})
    }
}


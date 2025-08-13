import type { RequestInfoGroup } from "../interfaces"
import { axiosFilm } from "./axiosSettings"



export const requestThenResponse = async (
    requestInfo: RequestInfoGroup,
    setRequestInfo: (requestInfo: RequestInfoGroup | null) => void,
    storeFunction?: any,
) => {
    try {
        if (!requestInfo) {throw new Error("---- CANNOT REQUEST WITHOUT INFO")}
        switch (requestInfo.method) {
            case "GET":
                
                const responseGet = await axiosFilm.get(requestInfo.additionalUrl)
                const result = responseGet.data
                storeFunction(result)
                break
            case "POST":
                const responsePost = await axiosFilm.post(requestInfo.additionalUrl, requestInfo.body)
                break
            case "PUT":
                const responsePut = await axiosFilm.put(requestInfo.additionalUrl)
                break
            case "DELETE":
                const responseDelete = await axiosFilm.delete(requestInfo.additionalUrl)
                break
            default:
                throw new Error("---- UN-HANDLED METHOD!")
        }
        setRequestInfo(null)
    } catch (error) {
        console.error({ error })
    }
}
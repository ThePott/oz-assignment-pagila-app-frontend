import { useCallback, useEffect } from "react"
import { useFilmStore } from "./store"
import { requestThenResponse } from "./services/services"
import type { FilmComment, FilmPost } from "./interfaces"

const useStorePostResponse = () => {
    const setFilmPost = useFilmStore((state) => state.setFilmPost)
    const setFilmCommentArray = useFilmStore((state) => state.setFilmCommentArray)
    const privateToApiSetLikeCount = useFilmStore((state) => state.privateToApiSetLikeCount)
    const setDoILikeIt = useFilmStore((state) => state.setDoILikeIt)

    const storePostResponse = useCallback((postCommentCountIlikeArray: any[]) => {
        setFilmPost(postCommentCountIlikeArray[0] as FilmPost)
        setFilmCommentArray(postCommentCountIlikeArray[1] as FilmComment[])
        privateToApiSetLikeCount(Number(postCommentCountIlikeArray[2]))
        setDoILikeIt(Boolean(postCommentCountIlikeArray[3]))
    }, [])

    return { storePostResponse }
}

export const useStoreResponse = () => {
    // const additionalUrl = useFilmStore((state) => state.additionalUrl)
    // const setAdditionalUrl = useFilmStore((state) => state.setAdditionalUrl)
    const requestInfo = useFilmStore((state) => state.requestInfo)
    const setRequestInfo = useFilmStore((state) => state.setRequestInfo)

    const setFilmArray = useFilmStore((state) => state.setFilmArray)
    const { storePostResponse } = useStorePostResponse()

    useEffect(() => {
        if (requestInfo === null) { 
            return 
        }

        const additionalUrl = requestInfo.additionalUrl

        if (requestInfo.additionalUrl === "/") {
            /** get all films  */
            requestThenResponse(requestInfo, setRequestInfo, setFilmArray);

        } else if (/^\/\d+\/film-post\/customer\/\d+$/.test(additionalUrl)) {
            /** get post related info  */
            requestThenResponse(requestInfo, setRequestInfo, storePostResponse)

        // } else if (/^\/film-post\/\d+\/comment$/.test(additionalUrl)) {
        //     /** post comment  */
        //     requestThenResponse(requestInfo, setRequestInfo)

        // } else if (/^\/film-post\/\d+\/like\/customer\/\d+$/.test(additionalUrl)) {
        //     /** post like change */
        } else {
            console.log({additionalUrl})
            requestThenResponse(requestInfo, setRequestInfo)
            // throw new Error("---- NOT HANDLED ADDITIONAL URL");
        }

    }, [requestInfo])

}
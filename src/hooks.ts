import { useCallback, useEffect } from "react"
import { useFilmStore } from "./store"
import { getAndStore } from "./services/services"
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
    const additionalUrl = useFilmStore((state) => state.additionalUrl)
    const setAdditionalUrl = useFilmStore((state) => state.setAdditionalUrl)
    const setFilmArray = useFilmStore((state) => state.setFilmArray)
    const { storePostResponse } = useStorePostResponse()

    useEffect(() => {
        if (additionalUrl === null) { return }

        if (additionalUrl === "/") {
            getAndStore(additionalUrl, setAdditionalUrl, setFilmArray);
        } else if (/^\/\d+\/film-post\/customer\/\d+$/.test(additionalUrl)) {
            getAndStore(additionalUrl, setAdditionalUrl, storePostResponse)

        } else {
            throw new Error("---- NOT HANDLED ADDITIONAL URL");
        }

    }, [additionalUrl])
}
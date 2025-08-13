import { useEffect } from "react"
import { useFilmStore } from "./store"
import { getAndStore } from "./services/services"

export const useStoreResponse = () => {
    const additionalUrl = useFilmStore((state) => state.additionalUrl)
    const setAdditionalUrl = useFilmStore((state) => state.setAdditionalUrl)
    const setFilmArray = useFilmStore((state) => state.setFilmArray)
    const setFilmPost = useFilmStore((state) => state.setFilmPost)

    useEffect(() => {
        if (additionalUrl === null) { return }
        
        if (additionalUrl === "/") {
            getAndStore(additionalUrl, setAdditionalUrl, setFilmArray);
        } else if (/^\/\d+\/film-post$/.test(additionalUrl)) {
            debugger
            getAndStore(additionalUrl, setAdditionalUrl, setFilmPost)

        } else {
            throw new Error("---- NOT HANDLED ADDITIONAL URL");
        }

    }, [additionalUrl])
}
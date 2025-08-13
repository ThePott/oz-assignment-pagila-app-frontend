import { useEffect } from "react"
import { useFilmStore } from "./store"
import { getAndStore } from "./services/services"

export const useStoreResponse = () => {
    const additionalUrl = useFilmStore((state) => state.additionalUrl)
    const setAdditionalUrl = useFilmStore((state) => state.setAdditionalUrl)
    const setFilmArray = useFilmStore((state) => state.setFilmArray)

    useEffect(() => {
        if (additionalUrl === null) { return }
        switch (additionalUrl) {
            case "/":
                getAndStore(additionalUrl, setAdditionalUrl, setFilmArray)
                break
            default:
                throw new Error("---- NOT HANDLED ADDITIONAL URL")
        }
    }, [additionalUrl])
}
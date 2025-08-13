import { useEffect } from "react"
import { useFilmStore } from "../store"
import { useStoreResponse } from "../hooks"
import RoundedBox from "./RoundedBox"

const ModalContent = () => {
    return (
        <div onClick={(event) => { event.stopPropagation() }} className="max-w-[500px] w-full max-h-[500px] h-full bg-amber-300">
            modal content
        </div>
    )
}


const Modal = () => {
    const selectedFilm = useFilmStore((state) => state.selectedFilm)
    const clearSelectedFilm = useFilmStore((state) => state.clearSelectedFilm)
    const setAdditionalUrl = useFilmStore((state) => state.setAdditionalUrl)
    const filmPost = useFilmStore((state) => state.filmPost)
    const filmCommentArray = useFilmStore((state) => state.filmCommentArray)
    const likeCount = useFilmStore((state) => state.likeCount)
    const doILikeIt = useFilmStore((state) => state.doILikeIt)

    useStoreResponse()

    useEffect(() => {
        if (!selectedFilm) { return }
        setAdditionalUrl(`/${selectedFilm.film_id}/film-post/customer/1`)
    }, [selectedFilm])

    if (!selectedFilm) { return null }

    return (
        <div onClick={clearSelectedFilm} className={`z-10 w-screen h-screen fixed top-0 left-0 backdrop-blur-xs flex justify-center items-center`}>
            <div onClick={(event) => { event.stopPropagation() }} className="max-w-[500px] w-full max-h-[500px] h-full bg-zinc-300">
                <p>{`${selectedFilm.title} (${selectedFilm.release_year})`}</p>
                <RoundedBox>{likeCount}</RoundedBox>
                <RoundedBox>{doILikeIt}</RoundedBox>
                <p>{selectedFilm.rating}</p>
                <p>{selectedFilm.description}</p>
                <RoundedBox>{filmPost?.content}</RoundedBox>
                <RoundedBox>{JSON.stringify(filmCommentArray)}</RoundedBox>
            </div>
        </div>
    )
}

export default Modal
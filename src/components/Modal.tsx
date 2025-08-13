import { useFilmStore } from "../store"

const ModalContent = () => {
    return (
        <div onClick={(event) => { event.stopPropagation() }} className="max-w-[500px] w-full max-h-[500px] h-full bg-amber-300">
            modal content
        </div>
    )
}


const Modal = () => {
    const selectedFilm = useFilmStore((state) => state.selectedFilm)
    const setSelectedFilm = useFilmStore((state) => state.setSelectedFilm)
    return (
        <div onClick={() => setSelectedFilm(null)} className={`${!selectedFilm && "hidden" } z-10 w-screen h-screen fixed top-0 left-0 backdrop-blur-xs flex justify-center items-center`}>
            <ModalContent />
        </div>
    )
}

export default Modal
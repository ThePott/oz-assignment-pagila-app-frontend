import FilmBox from "./components/FilmBox"
import Modal from "./components/Modal"
import { useStoreResponse } from "./hooks"
import { useFilmStore } from "./store"

const App = () => {
  const filmArray = useFilmStore((state) => state.filmArray)
  const selectedFilm = useFilmStore((state) => state.selectedFilm)
  useStoreResponse()
  console.log("---- app mounted")
  return (
    <div className="flex flex-col gap-3 relative">
      {filmArray.map((film) => <FilmBox key={film.film_id} film={film} />)}
      {selectedFilm && <Modal />}
    </div>
  )
}

export default App

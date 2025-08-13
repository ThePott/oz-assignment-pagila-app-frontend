import FilmBox from "./components/FilmBox"
import Modal from "./components/Modal"
import { useStoreResponse } from "./hooks"
import { useFilmStore } from "./store"

const App = () => {
  const filmArray = useFilmStore((state) => state.filmArray)
  useStoreResponse()

  return (
    <div className="flex flex-col gap-3 relative">
      {filmArray.map((film) => <FilmBox key={film.film_id} film={film} />)}
      <Modal />
    </div>
  )
}

export default App

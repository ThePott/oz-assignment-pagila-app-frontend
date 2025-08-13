import FilmBox from "./components/FilmBox"
import { useStoreResponse } from "./hooks"
import { useFilmStore } from "./store"

const App = () => {
  const filmArray = useFilmStore((state) => state.filmArray)
  console.table(filmArray)
  useStoreResponse()

  return (
    <div className="flex flex-col gap-3">
      {filmArray.map((film) => <FilmBox key={film.film_id} film={film} />)}
    </div>
  )
}

export default App

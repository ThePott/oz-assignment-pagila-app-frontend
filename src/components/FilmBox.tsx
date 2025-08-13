import type { Film } from "../interfaces"
import RoundedBox from "./RoundedBox"

const FilmBox = ({ film }: { film: Film }) => {
  return (
    <RoundedBox>
      <p className="text-2xl font-semibold">{`${film.title} (${film.release_year})`}</p>
      <p>{film.description}</p>
    </RoundedBox>
  )
}

export default FilmBox
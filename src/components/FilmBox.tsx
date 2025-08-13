import React from "react"
import type { Film } from "../interfaces"
import { useFilmStore } from "../store"
import RoundedBox from "./RoundedBox"

const FilmBox = React.memo(({ film }: { film: Film }) => {
  const setSelectedFilm = useFilmStore((state) => state.setSelectedFilm)
  const handleClick = () => {
    setSelectedFilm(film)
  }
  return (
    <RoundedBox onClick={handleClick}>
      <p className="text-2xl font-semibold">{`${film.title} (${film.release_year})`}</p>
      <p>{film.description}</p>
    </RoundedBox>
  )
})

export default FilmBox
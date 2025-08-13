import RoundedBox from "./RoundedBox"

const FilmBox = ({ film }: { film: any }) => {
  return (
    <RoundedBox>
      {JSON.stringify(film)}
    </RoundedBox>
  )
}

export default FilmBox
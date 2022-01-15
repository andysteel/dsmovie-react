import axios from "axios"
import MovieCard from "components/MovieCard"
import Pagination from "components/Pagination"
import { useEffect, useState } from "react"
import { MoviePage } from "types/movie"
import { BASE_URL } from "utils/request"

const Listing = () => {

  const [pageNumber, setPageNumber] = useState(0)
  const [moviePage, setMoviePage] = useState<MoviePage>({
    content: [],
    last: true,
    totalPages: 0,
    totalElements: 0,
    size: 12,
    number: 0,
    first: true,
    numberOfElements: 0,
    empty: true,
  })

  useEffect(() => {
    axios.get(`${BASE_URL}/movies?size=12&page=${pageNumber}&sort=id`)
      .then(response => {
        const data = response.data as MoviePage
        setMoviePage(data)
      })
  },[pageNumber])

  const handleChange = (newPageNumber: number) => {
    setPageNumber(newPageNumber)
  }

  return (
    <>
      <Pagination page={moviePage} onChange={handleChange} />
      <div className="container">
        <div className="row">
          {moviePage?.content.map(movie => {
              return (
                <div key={movie.id} className="col-sm-6 col-lg-4 col-xl-3 mb-3">
                  <MovieCard movie={movie} />
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default Listing
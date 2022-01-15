import axios, { AxiosRequestConfig } from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Movie } from "types/movie";
import { BASE_URL } from "utils/request";
import { validateEmail } from "utils/validate";
import "./styles.css"

interface FormCardProps {
  movieId: string;
}

const FormCard = ({ movieId }: FormCardProps) => {

  const navigate = useNavigate()
  const [movie, setMovie] = useState<Movie>()
  const [validEmail, setValidEmail] = useState(true)

  useEffect(() => {
    axios.get(`${BASE_URL}/movies/${movieId}`)
      .then(response => setMovie(response.data))
  }, [movieId])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const email = (event.target as any).email.value
    const score = (event.target as any).score.value

    if(!validateEmail(email)) {
      setValidEmail(false)
      return;
    }

    const config: AxiosRequestConfig = {
      baseURL: BASE_URL,
      method: 'PUT',
      url: '/scores',
      data: {
        email,
        score,
        movieId
      }
    }

    axios(config)
    .then(response => navigate('/'))
    .catch(error => console.log(error))
  }

  return (
    <div className="dsmovie-form-container">
        <img className="dsmovie-movie-card-image" src={movie?.image} alt="The Witcher" />
        <div className="dsmovie-card-bottom-container">
            <h3>{movie?.title}</h3>
            <form className="dsmovie-form" onSubmit={handleSubmit}>
                <div className="form-group dsmovie-form-group">
                    {!validEmail && <p className="email-message-error">Email inválido.</p>}
                    <label htmlFor="email">Informe seu email</label>
                    <input type="text" className={`form-control ${validEmail ? '' : 'email-error'}`} id="email" />
                </div>
                <div className="form-group dsmovie-form-group">
                    <label htmlFor="score">Informe sua avaliação</label>
                    <select className="form-control" id="score">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>
                <div className="dsmovie-form-btn-container">
                    <button type="submit" className="btn btn-primary dsmovie-btn">Salvar</button>
                </div>
            </form >
            <Link to="/">
              <button className="btn btn-primary dsmovie-btn mt-3">Cancelar</button>
            </Link>
        </div >
    </div >
  )
}

export default FormCard
import {useEffect, useState} from 'react';
import NavBar from '../components/NavBar';
import Title from '../components/Title';

const API_KEY = "dcf0ccbc6a9d43ab69a02668a8e8ad93";

export default function Home() {    
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        (async () => {
          const {results} = await (
            await fetch(
              `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
            )
          ).json();                  

          setMovies(results);
        })();        
      }, []);

    return (
        <div className="container">    
            <Title title={"Home"}/>                  
            {
                !movies && <h4>로딩 중...</h4>
            }
            <h1>
                {
                    movies?.map(movie => (
                        <div className="movie" key={movie.id}>
                            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
                            <h4>
                                {movie.original_title}
                            </h4>
                        </div>
                    ))
                }
            </h1>
            <style jsx>{`
                .container {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    padding: 20px;
                    gap: 20px;
                }
                .movie img {
                    max-width: 100%;
                    border-radius: 12px;
                    transition: transform 0.2s ease-in-out;
                    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
                }
                .movie:hover img {
                    transform: scale(1.05) translateY(-10px);
                }
                .movie h4 {
                    font-size: 18px;
                    text-align: center;
                }
            `}</style>
        </div>  
    );
}
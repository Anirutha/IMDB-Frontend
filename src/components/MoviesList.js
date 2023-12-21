import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Base from '../Base/Base';
import { Paper } from '@mui/material';

export default function MoviesList() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        //fetch movies from rest api
        axios.get("https://imdb-api-backend.vercel.app/api/movies")
            .then(response => setMovies(response.data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <Base>
            <Paper>
                <div className='movie-list-container'>
                    {movies.map((movie) => (
                        <div key={movie._id} className='movie-container'>
                            <h3 className='movie-title'>Title: {movie.original_title}</h3>
                            <img src={movie.original_poster_path} alt={movie.original_poster_path} className='movie-image' />
                            <div className='movie-content'>Release date: {movie.original_release_date}</div>
                        </div>
                    )
                    )}
                </div>
            </Paper>
        </Base>
    )
}


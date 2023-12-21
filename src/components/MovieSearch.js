import axios from 'axios';
import React, { useState } from 'react'
import Base from '../Base/Base';
import { Button, TextField } from '@mui/material';

export default function MovieSearch({ isDelete }) {
    const [search, setSearch] = useState("");
    const [movie, setMovie] = useState(null);

    const searchMovie = () => {
        axios.get(`https://imdb-api-backend.vercel.app/api/movie/${search}`)
            .then(response => setMovie(response.data))
            .catch((error) => setMovie("error"));
    }

    const deleteMovie = () => {
        axios.delete(`https://imdb-api-backend.vercel.app/api/movie/${search}`)
            .then(response => setMovie("deleted"))
            .catch((error) => setMovie("error"));
    }

    return (
        <Base>
            <div>
                <div className='d-flex'>
                    <TextField className='form-control m-1'
                        label="Search" variant="outlined"
                        fullWidth sx={{ m: 1 }}
                        type='text'
                        placeholder='Enter Movie id'
                        onChange={(e) => setSearch(e.target.value)} />
                    <Button className='btn btn-primary m-1'
                        type='submit'
                        variant='contained'
                        onClick={searchMovie}>
                        Search
                    </Button>
                    <Button className='btn btn-danger m-1'
                        type='submit'
                        variant='contained'
                        onClick={deleteMovie}>
                        Delete
                    </Button>
                </div>
                {
                    movie && movie !== 'error' && (isDelete ? ('Deleted Successfully') : (
                        <div className='movie-container'>
                            <h3 className='movie-title'>Title: {movie.original_title}</h3>
                            <img src={movie.original_poster_path} alt={movie.original_poster_path} className='movie-image' />
                            <div className='movie-content'>Release date: {movie.original_release_date}</div>
                        </div>

                    ))}
                {movie && movie === 'error' && (isDelete ? "Unable to delete" : "No data")}
            </div>
        </Base>
    )
}


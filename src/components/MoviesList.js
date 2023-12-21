import React, { useEffect, useState } from 'react';
import Base from '../Base/Base';
import { Button, Paper, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function MoviesList() {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchedMovies, setSearchedMovies] = useState([]);
    const [error, setError] = useState(null);
    const navigate= useNavigate();

    useEffect(() => {
        // Fetch all movies initially
        axios.get('https://imdb-api-backend.vercel.app/api/movies')
            .then(response => {
                setMovies(response.data);
                setSearchedMovies(response.data);
            })
            .catch(error => console.error('Error fetching movies:', error));
    }, []);

    const handleDelete = (movieId) => {
        axios.delete(`https://imdb-api-backend.vercel.app/api/movie/${movieId}`)
            .then(response => {
                setMovies(prevMovies => prevMovies.filter(movie => movie._id !== movieId));
                setSearchedMovies(prevMovies => prevMovies.filter(movie => movie._id !== movieId));
            })
            .catch(error => console.error('Error deleting movie:', error));
    };

    const handleSearch = () => {
        if (!searchTerm) {
            setError("Please enter a search term");
            return;
        }

        setError(null);

        // Search movies based on the entered term
        axios.get(`https://imdb-api-backend.vercel.app/api/movie/${searchTerm}`)
            .then(response => {
                setSearchedMovies(response.data ? [response.data] : []);
            })
            .catch(error => {
                console.error('Error searching for movies:', error);
                setError("Error searching for movies");
            });
    };

    return (
        <Base>
            <Paper>
                <div className='d-flex'>
                    <TextField
                        className='form-control m-1'
                        label="Search"
                        variant="outlined"
                        fullWidth
                        sx={{ m: 1 }}
                        type='text'
                        placeholder='Enter Movie Title'
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button
                        className='btn btn-primary m-1'
                        type='submit'
                        variant='contained'
                        onClick={handleSearch}
                    >
                        Search
                    </Button>
                </div>

                {error && <div className="error-message">{error}</div>}
                <div className='movie-list-container'>
                    {(searchTerm ? searchedMovies : movies).map((movie) => (

                        <div key={movie._id} className='movie-container'>
                            <h3 className='movie-title'>Title: {movie.original_title}</h3>
                            <img src={movie.original_poster_path} alt={movie.original_poster_path} className='movie-image' />
                            <div className='movie-content'>Release date: {movie.original_release_date}</div>
                            <Button color="secondary" onClick={() => navigate(`/update?id=${movie._id}`, { state: movie })}>Update</Button>
                            <Button color="error" onClick={() => handleDelete(movie._id)}>Delete</Button>
                        </div>
                    ))}
                </div>
            </Paper>
        </Base>
    );
}

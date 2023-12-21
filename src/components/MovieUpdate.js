import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Base from '../Base/Base';
import { Button, TextField } from '@mui/material';
import { useLocation } from 'react-router-dom';

function MovieUpdate() {
    const [formData, setFormData] = useState({});
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [id, setId] = useState('');

    const location = useLocation();
    const movieDetails = location.state;

    useEffect(() => {
        if (movieDetails) {
            setFormData({
                original_title: movieDetails.original_title,
                original_release_date: movieDetails.original_release_date,
            });
            setId(movieDetails._id);
        }
    }, [movieDetails]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const setTimeOut = () => {
        setTimeout(() => {
            setSuccess(false);
            setError(false);
        }, 5000);
    };

    const handleSubmit = () => {
        axios
            .put(`https://imdb-api-backend.vercel.app/api/movie/${id}`, formData)
            .then((res) => {
                setSuccess(true);
                setId('');
                setTimeOut();
            })
            .catch((err) => {
                setError(true);
                setTimeOut();
            });
    };

    return (
        <Base>
            <div>
                <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    sx={{ m: 1 }}
                    placeholder="Enter title"
                    type="text"
                    name="original_title"
                    value={formData.original_title}
                    onChange={handleChange}
                />
                <TextField
                    label="Year"
                    variant="outlined"
                    fullWidth
                    sx={{ m: 1 }}
                    placeholder="Enter Year"
                    type="text"
                    name="original_release_date"
                    value={formData.original_release_date}
                    onChange={handleChange}
                />
                <Button type="submit" variant="contained" onClick={handleSubmit}>
                    Update
                </Button>
            </div>
        </Base>
    );
}

export default MovieUpdate;

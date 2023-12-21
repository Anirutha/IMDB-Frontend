import axios from 'axios';
import React, { useState } from 'react'
import Base from '../Base/Base';
import { Button, TextField } from '@mui/material';

function MovieForm({ isUpdate }) {
    const [formData, setFormData] = useState({})
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false);
    const [id, setId] = useState("")

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const setTimeOut = () => {
        setTimeout(() => {
            setSuccess(false)
            setError(false)

        }, 5000);
    }

    const handleSubmit = () => {
        axios
            .post(`https://imdb-api-backend.vercel.app/api/movie/`, formData)
            .then(res => {
                setSuccess(true)
                setFormData({})
                setTimeOut();
            })
            .catch(err => {
                setError(true)
                setTimeOut();
            })
    }

    return (
        <Base>
            <div>
                <TextField
                    label="Title" variant="outlined"
                    fullWidth sx={{ m: 1 }}
                    placeholder='Enter title'
                    type="title"
                    value={formData.original_title}
                    onChange={handleChange}
                />
                <TextField label="Year" variant="outlined" fullWidth sx={{ m: 1 }}
                    placeholder='Enter Year'
                    type="year"
                    value={formData.original_release_date}
                    onChange={handleChange}
                />
                <Button
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit}
                >Add</Button>
            </div>
        </Base>
    )
}

export default MovieForm
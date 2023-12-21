import axios from 'axios';
import React, { useState } from 'react'
import Base from '../Base/Base';
import { Button, TextField } from '@mui/material';

function MovieUpdate({ isUpdate }) {
    const [formData, setFormData] = useState({})
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false);
    const [id, setId] = useState("")

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const setTimeOut = () => {
        setTimeout(() => {
            setSuccess(false)
            setError(false)

        }, 5000);
    }

    const handleSubmit = () => {
        axios
            .put(`https://imdb-api-backend.vercel.app/api/movie/${id}`, formData)
            .then(res => {
                setSuccess(true)
                setFormData({})
                setId("")
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
                    label="Id" variant="outlined"
                    fullWidth sx={{ m: 1 }}
                    placeholder='Enter id'
                    type="id"
                    value={formData.userid}
                    onChange={handleChange}
                />
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
                >Update</Button>
            </div>
        </Base>
    )
}

export default MovieUpdate
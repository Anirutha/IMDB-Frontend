import axios from 'axios';
import React, { useState } from 'react';
import Base from '../Base/Base';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function MovieForm({ isUpdate }) {
    const [formData, setFormData] = useState({
        original_title: '',
        original_release_date: '',
    });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const navigate=useNavigate();

    const setTimeOut = () => {
        setTimeout(() => {
            setSuccess(false);
            setError(false);
        }, 5000);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        axios
            .post(`https://imdb-api-backend.vercel.app/api/movie/`, formData)
            .then((res) => {
                setSuccess(true);
                setFormData({
                    original_title: '',  // Use the correct field name
                    original_release_date: '',  // Use the correct field name
                });
                setTimeOut();
                navigate("/")
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
                    type="text"  // Use the correct type
                    name="original_title"  // Use the correct field name
                    value={formData.original_title}
                    onChange={handleChange}
                />
                <TextField
                    label="Year"
                    variant="outlined"
                    fullWidth
                    sx={{ m: 1 }}
                    placeholder="Enter Year"
                    type="text"  // Use the correct type
                    name="original_release_date"  // Use the correct field name
                    value={formData.original_release_date}
                    onChange={handleChange}
                />
                <Button type="submit" variant="contained" onClick={handleSubmit}
                
                >
                    Add
                </Button>
            </div>
        </Base>
    );
}

export default MovieForm;

import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Base({ title, description, children }) {
    const navigate = useNavigate()

    return (
        <div className='main-container'>
            <header>
                <nav>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <Typography sx={{ mr: 2 }}>
                                IMDB
                            </Typography>
                            <IconButton
                                edge="end"
                                color="inherit"
                                onClick={() => navigate("/")}
                                aria-label="dashboard" sx={{ mr: 2 }}>
                                Dashboard
                            </IconButton>

                            

                            <IconButton
                                edge="end"
                                color="inherit"
                                aria-label="add students"
                                onClick={() => navigate("/update")}
                                sx={{ mr: 2 }}>
                                Update Movie
                            </IconButton>

                            <IconButton
                                edge="end"
                                color="inherit"
                                aria-label="add students"
                                onClick={() => navigate("/add")}
                                sx={{ mr: 2 }}>
                                Add Movie
                            </IconButton>


                        </Toolbar>
                    </AppBar>
                </nav>
            </header>
            <main>
                <h1>{title}</h1>
                <h4>{description}</h4>
                <div className='contents'>
                    {children}
                </div>
            </main>
        </div>
    )
}

export default Base
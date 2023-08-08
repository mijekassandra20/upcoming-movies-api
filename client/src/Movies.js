import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './App.css'

const Movies = () => {
    const [getMovies, setGetMovies] = useState([]);

    useEffect(() => {

        const rapidApiKey = '0cc5ac82c5msh2391e9f69fd4dbdp12e163jsnbf8cdccc2dd6'
        const url = 'https://moviesdatabase.p.rapidapi.com/titles/x/upcoming'

        const fetchMovies = async () => {
            try {

                const response = await axios.get(url, {
                    headers: {
                        'X-RapidAPI-Key': rapidApiKey,
                    },
                    params: {
                        limit: 10
                    },
                });

                setGetMovies(response.data.results);

            } catch (error) {
                console.log('Error fetching movies:', error)

            }
        }

        fetchMovies();
    }, [])


    // const prevPage = () => {
    //     if (currentPage > 1) {
    //         setCurrentPage((prevPage) => prevPage - 1)
    //     }
    // }

    // const nextPage = () => {
    //     setCurrentPage((prevPage) => prevPage + 1)
    // }

    return (
        <div className='movies-wrapper'>
            {getMovies.map((movie, index) => (
                <div key={index} className='card-container'>
                    <div key={movie.id}>
                        {movie.primaryImage && movie.primaryImage.url ? (
                            <img src={movie.primaryImage.url} alt="Card Picture" />
                        ) : (
                            <img className='not-available' src='sadness.jpeg' alt="Card Picture" />
                        )}
                    </div>
                    <div className='content-wrapper'>
                        <h3 className='card-title'>
                            {movie.titleText.text}
                        </h3>
                        <div className='release-year'>
                            <p>Release Date:</p>
                            <p>{movie.releaseDate.month}/{movie.releaseDate.day}/{movie.releaseDate.year}</p>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default Movies
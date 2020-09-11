import React from "react";
import styles from './MoviesList.module.css';
import MovieCard from "./MovieCard/MovieCard.js";


const MoviesList = props =>{
	return (
		<div className = {styles['container--moviesList']}>
			{props.movies.map(movie => {
				return(
					<MovieCard key = {movie.id}
							   movie = {movie}
					           changeStars = {props.changeStars}
					           changeLikes = {props.changeLikes}
					           chooseMovie = {props.chooseMovie}
					/>
				);
			})}
		</div>
	);
}

export default MoviesList;
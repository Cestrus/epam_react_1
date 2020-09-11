import React, { Component } from "react";
import styles from './index.module.css';
import {moviesDB as movies} from '../../utils/moviesDB.js';
import Filter from "./Filter/Filter.js";
import MoviesList from "./MoviesList/MoviesList.js";
import MovieInfo from "./MovieInfo/MovieInfo.js";


class Homepage extends Component{
	state = {
		movies,
		chooseMovie: null,
		searchMovieList: movies,
	}

	handleChangeLikes(idMovies, isLike){
		let movies = this.state.movies;
		movies.forEach(movie => {
			if(movie.id === idMovies){
				if(isLike){
					movie.likes++;
				} else {
					movie.likes--;
				}
			}
		});

		this.setState({
			movies,
		});
	}

	handleChangeStars(idStar, idMovies){
		let quantityStars = parseInt(idStar);
		let movies = this.state.movies;
		let chooseMovie = this.state.chooseMovie;
		movies.forEach(movie => {
			if(movie.id === idMovies){
				movie.stars = quantityStars;
			}
		});
		if(chooseMovie && chooseMovie.id === idMovies){
			chooseMovie.stars = quantityStars;
		}
		this.setState({
			movies,
			chooseMovie
		});
	}

	handleChooseMovie(idMovies){
		let chooseMovie = this.state.chooseMovie;
		this.state.movies.forEach(movie => {
			if(movie.id === idMovies){
				chooseMovie = movie;
			}
		});
		this.setState({
			chooseMovie
		})
	}

	changeColorButton(ev, styleName){
		[...document.getElementsByClassName(styleName)].forEach( el => el.classList.remove(styleName));
		ev.target.classList.add(styleName);
	}

	handleSortByRating(ev, styleName){
		this.changeColorButton(ev, styleName);
		let movies = this.state.searchMovieList;
		movies.sort((a,b) => {
			if (a.stars > b.stars) return -1;
			if (a.stars === b.stars) return 0;
			if (a.stars < b.stars) return 1;
		});
		this.setState({
			movies
		});
	}

	handleSortByLikes(ev, styleName){
		this.changeColorButton(ev, styleName);
		let movies = this.state.searchMovieList;
		movies.sort((a,b) => {
			if (a.likes > b.likes) return -1;
			if (a.likes === b.likes) return 0;
			if (a.likes < b.likes) return 1;
		});
		this.setState({
			movies
		});
	}

	handleSearchMovie(styleName){
		let searchMovieList;
		let str = document.getElementsByClassName(styleName)[0].value;
		if(!str){
			searchMovieList = this.state.movies;
			this.setState({
				searchMovieList
			})
		} else {
			searchMovieList = movies.filter(movie => {
				if(movie.title.toUpperCase().indexOf(str.toUpperCase()) !== -1){
					return movie;
				}
			});
			this.setState({
				searchMovieList
			});
		}
	}

	render() {
		return(
		<div className = {styles.container}>
			<h2 className = {styles.title}>Movies</h2>
			<Filter changeSortByRating = {this.handleSortByRating.bind(this)}
			        changeSortByLikes = {this.handleSortByLikes.bind(this)}
			        searchMovie = {this.handleSearchMovie.bind(this)}
			/>
			<MoviesList movies = {this.state.searchMovieList}
			            changeStars = {this.handleChangeStars.bind(this)}
			            changeLikes = {this.handleChangeLikes.bind(this)}
			            chooseMovie = {this.handleChooseMovie.bind(this)}
			/>
			<MovieInfo movie = {this.state.chooseMovie}
			           changeStars = {this.handleChangeStars.bind(this)}
			/>
		</div>
		);
	}
}

export default Homepage;
import React from "react";
import styles from './Filter.module.css';


const Filter = props => {
	return (
		<div className={styles['container--filter']}>
			<h5 className={styles['title--filter']}>Sort movies</h5>
			<div>
				<button className={styles.btn + ' ' + styles['btn__sort']}
						onClick={ev => props.changeSortByLikes(ev, styles['btn__choose'])}
				>
					by likes
				</button>
				<button className={styles.btn + ' ' + styles['btn__sort']}
						onClick={ev => props.changeSortByRating(ev, styles['btn__choose'])}
				>
					by rating
				</button>
			</div>
			<div className={styles.search}>
				< button className={styles.btn + ' ' + styles['btn__search']}
						onClick={() => props.searchMovie(styles['inp__search'])}
				/>
				<input className={styles.inp + ' ' + styles['inp__search']}
				       placeholder={'Search by name'}
				/>
			</div>

		</div>
	);
}

export default Filter;
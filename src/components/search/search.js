import React, { Component } from 'react';
import './search.css';
import { request } from '../../services/request';
import Loader from './loader.gif';
import { CompanyTable } from '../dashboard';


class Search extends Component {

	constructor( props ) {
		super( props );

		this.state = {
			query: '',
			results: {},
			loading: false,
			message: ''
		};

		this.cancel = '';
	}

	componentDidMount() {
		// Call our fetch function below once the component mounts
		request('company')
		.then( res => {
			console.log(res);
			const total = res.items.length;
			const resultNotFoundMsg = total < 1
									? 'There are no more search results. Please try a new search'
									: '';
			this.setState( {
				results: res.items,
				message: resultNotFoundMsg,
				totalResults: total,
				loading: false
			} )
		} )
		.catch( error => {
			console.error(error);
		} )
	  }


	/**
	 * Fetch the search results and update the state with the result.
	 * Also cancels the previous query before making the new one.
	 *
	 * @param {int} updatedPageNo Updated Page No.
	 * @param {String} query Search Query.
	 *
	 */
	fetchSearchResults = ( query ) => {
	    request( `search?t=${query}`)
			.then( res => {
                console.log(res);
				const total = res.items.length;
				const resultNotFoundMsg = total < 1
										? 'There are no more search results. Please try a new search'
										: '';
				this.setState( {
					results: res.items,
					message: resultNotFoundMsg,
					totalResults: total,
					loading: false
				} )
			} )
			.catch( error => {
				console.error(error);
			} )
	};

	handleOnInputChange = ( event ) => {
		const query = event.target.value;
		if ( ! query ) {
			this.setState( { query: '', results: {}, message: ''}, () => {
				this.fetchSearchResults( query );
			} );
		} else {
			this.setState( { query, loading: true, message: '' }, () => {
				this.fetchSearchResults( query );
			} );
		}
	};

	renderSearchResults = () => {
		const { results } = this.state;

		if ( Object.keys( results ).length && results.length ) {
			return (
				<div className="results-container">
					<CompanyTable
            items={results}
        />

				</div>
			)
		}
	};

	render() {
		const { query, loading, message } = this.state;
		return (
			<div className="container">
			<label className="search-label" htmlFor="search-input">
				<input
					type="text"
					name="query"
					value={ query }
					id="search-input"
					placeholder="Search company symbol or score only..."
					onChange={this.handleOnInputChange}
				/>
				<i className="fa fa-search search-icon" aria-hidden="true"/>
			</label>

			{/*	Error Message*/}
				{message && <p className="message">{ message }</p>}

			{/*	Loader*/}
			<img src={ Loader } className={`search-loading ${ loading ? 'show' : 'hide' }`} alt="loader"/>

			{/*	Result*/}
			{ this.renderSearchResults() }

			</div>
		)
	}
}

export default Search
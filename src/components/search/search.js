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
	}

	componentDidMount() {
		request('company')
		.then( res => {
			console.log(res);
			const total = res.items.length;
			const resultNotFoundMsg = total < 1
									? 'No search results.'
									: '';
			this.setState( {
				results: res.items,
				message: resultNotFoundMsg,
				loading: false
			} )
		} )
		.catch( error => {
			console.error(error);
		} )
	  }


	fetchSearchResults = ( query ) => {
	    request( `search?t=${query}`)
			.then( res => {
				const total = res.items.length;
				const resultNotFoundMsg = total < 1
										? 'No search results.'
										: '';
				this.setState( {
					results: res.items,
					message: resultNotFoundMsg,
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

		if (results.length ) {
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
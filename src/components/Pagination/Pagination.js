import React, { Component } from 'react';
import Page from './Page';
import './Pagination.css';

export default class Pagination extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let backDisabled = false;
		let nextDisabled = false;

		if(this.props.currentPage == 1) {
			backDisabled = true;
		}
		if(this.props.currentPage == this.props.pages.length) {
			nextDisabled = true;
		}

		return (
			<div className="pagination">
	            <Page 
	            	name="Back" 
	            	disabled={backDisabled} 
	            	onClick={this.props.back}
	            />
	            {
	            	this.props.pages.map((page) => {
	            		return (
	            			<Page 
	            				name={page.name} 
	            				active={page.active}
	            				disabled={false}
	            				onClick={this.props.numberedPage}
	            				number
	            			/>
	            		);
	            	})
	            }
	            <Page 
	            	name="Next" 
	            	disabled={nextDisabled}
	            	onClick={this.props.next}
	            />
	        </div>
		);
	}
}
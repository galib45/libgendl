import React, { Component } from 'react';
import SearchInput from './SearchInput';
import SearchButton from './SearchButton';
import './SearchBar.css';

export default class SearchBar extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<React.Fragment>
			<div className="search-box">
				<SearchInput
					value = {this.props.inputValue}
					onChange = {this.props.onInputChange}
				/>
				<SearchButton 
					disabled={this.props.buttonDisabled} 
					onClick={this.props.onButtonClick}
				/>
			</div>
			</React.Fragment>
		);
	}
}
import React, { Component } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ResultView from './components/ResultView/ResultView';
import './App.css';

export default class App extends Component {
	
	//https://cors-anywhere.herokuapp.com/
	baseUrl = new URL('https://cors-anywhere.herokuapp.com/http://gen.lib.rus.ec/search.php');
	state = {
		searchText: '',
		url: '',
		filesFound: '',
		results: null,
		loading: false,
		buttonDisabled: true,
	};

	handleInput = (event) => {
		this.setState({searchText: event.target.value});
		if (event.target.value == '') {
			this.setState({url: '', buttonDisabled:true});
		} else {
			let url = this.baseUrl;
			url.searchParams.set('req', event.target.value);
			url.searchParams.set('view', 'detailed');
			this.setState({url: url.href});
			this.setState({buttonDisabled: false});
		}
	};

	resultObject = (data) => {
		return {
			title: data[3].innerText,
			author: data[6].innerText,
			publisher: data[12].innerText,
			year: data[16].innerText,
			edition: data[18].innerText,
			language: data[20].innerText, 
			pages: data[22].innerText,
			size: data[32].innerText,
			extension: data[34].innerText,
			link: data[1].innerHTML
		};
	};

	search = () => {
		this.setState({
			filesFound: '', results: null,
			loading: true, buttonDisabled: true
		});
		console.log('Searching... '+this.state.url);
		let parser = new DOMParser();
		fetch(this.state.url)
			.then(res => res.text())
			.then((html) => { 
				//console.log(html);
				let htmlDoc = parser.parseFromString(html, 'text/html');
				let filesFound = htmlDoc.querySelector('font[color=grey]').innerHTML;
				let results = null;
				if(filesFound[0] != '0') {
					results = htmlDoc.querySelectorAll('body > table[rules=cols]');
					let resultsArray = Array.from(results);
					let data = results[0].querySelectorAll('td');
					results = resultsArray.map( item => (
						this.resultObject(results[resultsArray.indexOf(item)].querySelectorAll('td'))
					));
				}
				//console.log(results);
				//console.log(filesFound);
				this.setState({loading: false, buttonDisabled:false});
				this.setState({filesFound, results});
				//this.setState({htmlDoc: parser.parseFromString(html, 'text/html')});
			}).catch((err) => { 
				this.setState({loading: false, buttonDisabled:false});
				console.log('Error: ', err);
				alert('Error: ' + err);
			});
	};
	
	render() {
		return (
			<div>
				<SearchBar
					inputValue = {this.state.searchText}
					onInputChange = {this.handleInput}
					buttonDisabled = {this.state.buttonDisabled}
					onButtonClick = {this.search}
				/>
				<ResultView
					filesFound = {this.state.filesFound}
					resultData = {this.state.results}
					loading = {this.state.loading}
				/>
			</div>
		);
	}
};
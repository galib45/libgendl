import React, { Component } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ResultView from './components/ResultView/ResultView';
import Pagination from './components/Pagination/Pagination';
import './App.css';

export default class App extends Component {
	
	//https://cors-anywhere.herokuapp.com/
	baseUrl = new URL('http://gen.lib.rus.ec/search.php');
	state = {
		searchText: '',
		url: '',
		filesFound: '',
		pages: null,
		currentPage: 1,
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

	parseHtml = (html) => {
		//console.log(html);
		let parser = new DOMParser();
		let htmlDoc = parser.parseFromString(html, 'text/html');
		let filesFound = htmlDoc.querySelector('font[color=grey]').innerHTML;
		let resultCount = parseInt(filesFound);
		let resultPages = Math.ceil(resultCount / 25);
		if (resultPages > 1) {
		    let pages = [];
		    for (let i = 1; i <= resultPages; i++) {
		        let active = false;
		        if (i == this.state.currentPage) {
		            active = true;
		        }
		        pages.push({ name: i, active: active });
		    }
		    this.setState({ pages });
		}
		let results = null;
		if (filesFound[0] != '0') {
		    results = htmlDoc.querySelectorAll('body > table[rules=cols]');
		    let resultsArray = Array.from(results);
		    let data = results[0].querySelectorAll('td');
		    results = resultsArray.map(item => (
		        this.resultObject(results[resultsArray.indexOf(item)].querySelectorAll('td'))
		    ));
		}
		//console.log(results);
		//console.log(filesFound);
		this.setState({
		    loading: false,
		    buttonDisabled: false,
		    filesFound,
		    results
		});
	};

	searchBook = (url) => {
		console.log('Searching... ' + url);
		fetch(url)
			.then(res => res.text())
			.then((html) => { 
				this.parseHtml(html);
			}).catch((err) => { 
				this.setState({loading: false, buttonDisabled:false});
				console.log('Error: ', err);
				alert('Error: ' + err);
			});
	};

	search = () => {
		this.setState({
			filesFound: '', results: null,
			loading: true, buttonDisabled: true
		});
		this.searchBook(this.state.url);
	};

	back = () => {
		console.log('go back');
	};

	next = () => {
		console.log('go to next page');
	};

	numberedPage = (event) => {
		let button = event.target.textContent;
		let url = this.state.url + '&page=' + button;
		console.log(url);
		this.setState({
			filesFound: '', results: null,
			loading: true, buttonDisabled: true,
			currentPage: parseInt(button)
		});
		this.searchBook(url);
	};
	
	render() {
		let pages = <p></p>;
		if(this.state.pages) {
			pages = <Pagination 
						pages={this.state.pages} 
						currentPage={this.state.currentPage}
						back={this.back} next={this.next}
						numberedPage={this.numberedPage}
					/>;
		}
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
					onNextClick = {this.next}
				/>
				{pages}
			</div>
		);
	}
};
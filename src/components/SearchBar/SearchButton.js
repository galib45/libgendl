import React, { Component } from 'react';

export default function SearchButton(props){
	return (
		<button disabled={props.disabled} onClick={props.onClick}>
			Search
		</button>
	);
}
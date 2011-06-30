import React, { Component } from 'react';

export default function SearchInput(props){
	return (
		<input
			type="text"
			placeholder="Enter search text here..."
			value = {props.value}
			onChange = {props.onChange}
		/>
	);
}
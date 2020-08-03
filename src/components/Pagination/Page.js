import React, { Component } from 'react';

export default class Page extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let active = 'page';
		if(this.props.active == true) {
			active += ' active';
		}
		if(this.props.number) {
			active += ' number';
		}

		return (
			<div className={active}>
				<button disabled={this.props.disabled} onClick={this.props.onClick}>
					{this.props.name}
				</button>
			</div>
		);
	}
}
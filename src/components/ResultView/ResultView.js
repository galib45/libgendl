import React, { Component } from 'react';
import ResultItem from './ResultItem';
import './ResultView.css';

export default class ResultView extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        let view = <p></p>;
        if (this.props.resultData) {
            view = this.props.resultData.map((resultItem) => {
                    let baseUrl = 'http://gen.lib.rus.ec';
                    let link = baseUrl + resultItem.link.substring(
                        resultItem.link.search('/get'), 
                        resultItem.link.search('"><img')
                    );
                    let img = baseUrl + resultItem.link.substring(
                        resultItem.link.search('img src')+9, 
                        resultItem.link.search('" border')
                    );
                    let size = parseInt(resultItem.size.substring(
                        resultItem.size.search(/\(/)+1,
                        resultItem.size.search(/\)/)
                    ));
                    let sizeStrings = ['B', 'kB', 'MB', 'GB'];
                    let power = Math.floor(Math.log(size)/Math.log(1024));
                    size = (size/Math.pow(1024, power)).toFixed(2)+' '+ sizeStrings[power];
                    let item = {
                        title: resultItem.title, 
                        author: resultItem.author,
                        publisher: resultItem.publisher,
                        year: resultItem.year,
                        pages: resultItem.pages,
                        extension: resultItem.extension,
                        size: size,
                        link: link,
                        img: img
                    };
                    return (
                        <ResultItem item={item}/>
                    );
                })
        }
        return (
            <React.Fragment>
            <div className="result-count">
                <p>{this.props.filesFound}</p>
            </div>
            {view}
            </React.Fragment>
        );
    }
}
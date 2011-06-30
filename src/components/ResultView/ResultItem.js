import React, { Component } from 'react';

export default function ResultItem(props) {
    return (
        <div className="result-item">
            <div className="row">
                <div className="col-5">
                    <div className="result-img">
                        <a href={props.item.link}>
                            <img src={props.item.img} alt="cover"/>
                        </a>
                    </div>
                </div>
                <div className="col-7">
                    <div className="result-desc">
                        <p>{props.item.title}</p> 
                        <p>{props.item.author}</p>
                        <p>{props.item.publisher}, {props.item.year}</p>
                        <p>{props.item.extension}, {props.item.pages} pages, {props.item.size}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
import React from 'react';
import './Quote.css'

function Quote(props) {
    return (
        <div className="quote">
            <div id="quote">
                <p>{props.quote}</p>
            </div>
            <div id="author">
                <p>- {props.author}</p>
            </div>
        </div>
    );
}

export default Quote;

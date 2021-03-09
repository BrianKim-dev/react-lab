import React from 'react';

function TextBox(props) {
    return (
        <div>
            <span>{props.label}</span>
            <input type={'text'} onChange={props.change}></input>
        </div>
    )
}

export default TextBox;
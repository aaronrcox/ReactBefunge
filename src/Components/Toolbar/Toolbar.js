import React from 'react';
import './Toolbar.scss';

export function Toolbar(props) {


    const items = props.items || [];
    

    return(<div className="toolbar">
        <ul>
            {items.map(item => {
                return(<li className={item.classNames} onClick={item.onClick}>{item.text}</li>);
            })}
        </ul>
    </div>);
}
import React, { useEffect, useState } from 'react';

export function BefungeStackVivew(props) {

    const [stack, setStack] = useState([]);

    useEffect(() => {

        let onStackChangeSubscription = null; 
        
        if(props.program) {
            onStackChangeSubscription = props.program.stack$.subscribe((s) => {
                setStack([...s]);
            });
        }

        return () => {
            if(onStackChangeSubscription)
                onStackChangeSubscription.unsubscribe();
            setStack([]);
        };
    }, [props.program]);

    return (
    <ul className="befunge-stack-view">
        { stack.reverse().map((item, index) => <li key={'bfstack-'+index}>
            <span style={{float:'left'}}>{item}</span>
            <span style={{float:'right'}}>{String.fromCharCode(item)}</span>
        </li> ) }
    </ul>);
}
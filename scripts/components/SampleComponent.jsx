import React from 'react';

export default ({ counter, onIncrement }) => (
    <div>
        <p>You have clicked <span className='counter'>{counter}</span> times.</p>
        <button onClick={onIncrement}>Increment</button>
    </div>
);

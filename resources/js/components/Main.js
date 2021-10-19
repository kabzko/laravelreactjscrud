import React from 'react';
import ReactDOM from 'react-dom';
import Index from './router/Index';

const Main = () => {
    return (
        <Index />
    );
}

export default Main;

if (document.getElementById('app')) {
    ReactDOM.render(<Main />, document.getElementById('app'));
}

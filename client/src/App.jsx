import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppRouter from './AppRouter';

import './styles/App.scss';

const App = () => {
    return (
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    );
}

export default App;
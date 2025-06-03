import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter, Route, Routes} from "react-router-dom";
import { ScrollToTop } from "./Layout";
import {
    Home, 
    OrdersList,
    OrderDetail
} from './pages'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <ScrollToTop>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/orderslist" element={<OrdersList/>} />
                <Route path="/order/:ID" element={<OrderDetail/>} />
                {/*<Route path="/map" element={<Map/>} />*/}
            </Routes>
        </ScrollToTop>
    </BrowserRouter>
);


reportWebVitals();

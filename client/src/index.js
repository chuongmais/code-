import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter, Route, Routes} from "react-router-dom";
import { ScrollToTop } from "./Layout";
import {
    Home, 
    OrdersList,
    OrderDetail,
    OrderBrowser,
    VehicleList,
    VehicleOrders
} from './pages'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <ScrollToTop>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/orders" element={<OrdersList/>} />
                <Route path="/order/:ID" element={<OrderDetail/>} />
                <Route path="/orderbrowser" element={<OrderBrowser/>} />
                <Route path="/vehicles" element={<VehicleList/>} />
                <Route path="/vehicle/:vehicle_id" element={<VehicleOrders/>} />
            </Routes>
        </ScrollToTop>
    </BrowserRouter>
);


reportWebVitals();

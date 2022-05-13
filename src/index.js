import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import React from 'react';
import Calculator  from './main/Calculator';

import './index.css'

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <>
    <Calculator />

    <div className="area" >
            <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
              
            </ul>
    </div >
    
  </>
);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import ImageLibrary from './ImageLibrary';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <ImageLibrary />
  </React.StrictMode>,
  document.getElementById('IMAGE-LIBRARY-APP')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

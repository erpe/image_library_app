import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import ImageLibrary from './ImageLibrary';
import * as serviceWorker from './serviceWorker';


const root = document.getElementById('IMAGE-LIBRARY-APP')

if (root) {
  const token  = root.dataset.token
  const apiUrl = root.dataset.apiUrl
  const client = root.dataset.client
  const formats = JSON.parse(root.dataset.formats)

  ReactDOM.render(
    <React.StrictMode>
      <ImageLibrary formats={formats} client={client} token={token} apiUrl={apiUrl} />
    </React.StrictMode>,
    root
  );


  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
}

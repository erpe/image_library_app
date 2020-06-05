import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import ImageLibrary from './ImageLibrary'
import ImageLibraryAdmin from './ImageLibraryAdmin'
import * as serviceWorker from './serviceWorker'


const root = document.getElementById('IMAGE-LIBRARY-APP')
const adminRoot = document.getElementById('IMAGE-LIBRARY-ADMIN')

if (root) {
  const token  = root.dataset.token
  const apiUrl = root.dataset.apiUrl
  const client = root.dataset.client
  const formats = JSON.parse(root.dataset.formats)

  ReactDOM.render(
    <React.StrictMode>
      <ImageLibrary
        formats={formats}
        client={client}
        token={token}
        apiUrl={apiUrl}
      />
    </React.StrictMode>,
    root
  );

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
}

if (adminRoot) {
  const token = adminRoot.dataset.token
  const apiUrl = adminRoot.dataset.apiUrl
  const config = JSON.parse(adminRoot.dataset.config)

  ReactDOM.render(
    <React.StrictMode>
      <ImageLibraryAdmin
        config={config}
        token={token}
        apiUrl={apiUrl}
      />
    </React.StrictMode>,
    adminRoot
  )

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
}

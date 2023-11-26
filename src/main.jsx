import React from 'react'
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit';
import App from './App.jsx'
import rootReducer from './reducers/index.js';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import GoogleBooks from './components/GoogleBooks.jsx';
import GoogleBook from './components/GoogleBook.jsx';
import { getBookById } from './components/GoogleBook.jsx';

const router = createBrowserRouter([

  {
    path: "/",
    element: <App />,
    children:[
      {
        path: "googleBooks",
        element: <GoogleBooks />,
      },
      {
        path: "googleBooks/:id",
        element: <GoogleBook />,
        loader: getBookById
      },
    ],
  }
]);

const store = configureStore({reducer: rootReducer});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

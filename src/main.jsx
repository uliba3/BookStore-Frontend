import 'bootstrap/dist/css/bootstrap.min.css';
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
import { getBookById } from './services/book.js';
import Books from './components/Books.jsx';
import Book from './components/Book.jsx';
import AccountPage from './components/AccountPage.jsx';
import HomePage from './components/HomePage.jsx';

const router = createBrowserRouter([

  {
    path: "/",
    element: <App />,
    children:[
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <AccountPage method="login" />,
      },
      {
        path: "signup",
        element: <AccountPage method="signup" />,
      },
      {
        path: "googleBooks",
        element: <Books bookDestination="googleBooks"/>,
      },
      {
        path: "googleBooks/:id",
        element: <Book bookDestination="googleBooks"/>,
        loader: getBookById
      },
      {
        path: "history",
        element: <Books bookDestination="history"/>,
      },
      {
        path: "history/:id",
        element: <Book bookDestination="history"/>,
        loader: getBookById
      },
      {
        path: "wishlist",
        element: <Books bookDestination="wishlist"/>,
      },
      {
        path: "wishlist/:id",
        element: <Book bookDestination="wishlist"/>,
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

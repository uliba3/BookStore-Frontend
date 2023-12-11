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
import { getBookById } from './services/book.js';
import UserBooks from './components/UserBooks.jsx';
import UserBook from './components/UserBook.jsx';
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
        element: <GoogleBooks />,
      },
      {
        path: "googleBooks/:id",
        element: <GoogleBook />,
        loader: getBookById
      },
      {
        path: "history",
        element: <UserBooks bookDestination="history"/>,
      },
      {
        path: "history/:id",
        element: <UserBook bookDestination="history"/>,
        loader: getBookById
      },
      {
        path: "wishlist",
        element: <UserBooks bookDestination="wishlist"/>,
      },
      {
        path: "wishlist/:id",
        element: <UserBook bookDestination="wishlist"/>,
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

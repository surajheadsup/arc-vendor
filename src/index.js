import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'animate.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {BrowserRouter} from "react-router-dom";
import { createStore,combineReducers ,applyMiddleware} from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ProductReducer from './store/reducers/ProductReducer'

const rootReducer = combineReducers({
  products : ProductReducer
})

const store = createStore(rootReducer,applyMiddleware(thunk))


ReactDOM.render(<Provider store={store}>

<BrowserRouter>
    <App/>
  </BrowserRouter>

</Provider>, document.getElementById('root'));
import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {useDispatch} from "react-redux";
import ProductList from "./component/ProductList";
import {loadProduct} from "./store/Action";
import {products} from "./data/ProductData";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadProduct(products));
  }, []);
  return (
      <div className="App">
        <ProductList/>
      </div>
  );
}

export default App;

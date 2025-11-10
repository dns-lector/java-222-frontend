import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './ui/Layout';
import Home from '../pages/home/Home';
import Privacy from '../pages/privacy/Privacy';
import { useEffect, useState } from 'react';
import AppContext from '../features/appContext/AppContext';
import Admin from '../pages/admin/Admin';
import Group from '../pages/group/Group';
import Product from '../pages/product/Product';
import Cart from '../pages/cart/Cart';

const initialCart = {cartItems: []};

export default function App() {
  const [token, setToken] = useState(null);
  const [cart, setCart] = useState(initialCart);

  const request = (url, conf) => new Promise((resolve, reject) => {
    const backUrl = "http://localhost:8080/JavaWeb222/";
    url = url.replace("api://", backUrl);
    if(token) {
      if(typeof conf == 'undefined') {
        conf = {};
      }
      if(typeof conf.headers == 'undefined') {
        conf.headers = {};
      }      
      if(typeof conf.headers['Authorization'] == 'undefined') {
        conf.headers['Authorization'] = 'Bearer ' + token;
      }
    }
    fetch(url, conf)
    .then(r => r.json())
    .then(j => {
      if(j.status.isOk) {
        resolve(j.data);
      }
      else {
        console.error(j);
        reject(j);
      }
    });
  });

  const updateCart = () => {
    if(token) {
      request("api://cart").then(data => {
        if(data){ 
          setCart(data);
        }
        else {
          setCart(initialCart);
        }
      });
    }
  }

  useEffect(updateCart, [token]);

  return <AppContext.Provider value={{cart, token, setToken, request, updateCart}}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path='admin' element={<Admin />} />
          <Route path='cart' element={<Cart />} />
          <Route path='group/:slug' element={<Group />} />
          <Route path='privacy' element={<Privacy />} />
          <Route path='product/:slug' element={<Product />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AppContext.Provider>;
}

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
import Profile from '../pages/profile/Profile';
import Base64 from '../shared/base64/Base64';
import History from '../pages/history/History';

const initialCart = {cartItems: []};

export default function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(initialCart);

  const request = (url, conf, isFull=false) => new Promise((resolve, reject) => {
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
        resolve(isFull ? j : j.data);
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
  
  const addToCart = (product) => {
      if(user == null) {
          alert("Увійдіть у систему для здійснення покупок");
          return;
      }
      request("api://cart?product-id=" + product.id, {
          method: "POST",
      }).then(updateCart)
      .catch(console.log);
  }

  useEffect(() => {
    updateCart();
    if(token) {
      const payload = Base64.jwtDecodePayload(token);
      setUser( {
        id: payload.sub,
        aud: payload.aud,
        email: payload.email,
        name: payload.name,
      } );
      /*
      Д.З. Додати до відомостей про користувача (setUser) .dob - Date of birth
      До віджета nav-profile у підказку додати e-mail та дату народження (за її наявності)
      * виводити кількість днів до дня народження
      Для тестування додати дату народження до БД (якщо її немає)
      */
    }
    else {
      setUser(null);
    }
  }, [token]);

  return <AppContext.Provider value={{cart, user, setToken, request, updateCart, addToCart}}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path='admin' element={<Admin />} />
          <Route path='cart' element={<Cart />} />
          <Route path='group/:slug' element={<Group />} />
          <Route path='history/:cartId' element={<History />} />
          <Route path='privacy' element={<Privacy />} />
          <Route path='product/:slug' element={<Product />} />
          <Route path='profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AppContext.Provider>;
}

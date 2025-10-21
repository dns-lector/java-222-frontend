import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './ui/Layout';
import Home from '../pages/home/Home';
import Privacy from '../pages/privacy/Privacy';
import { useState } from 'react';
import AppContext from '../features/appContext/AppContext';
import Admin from '../pages/admin/Admin';
import Group from '../pages/group/Group';
import Product from '../pages/product/Product';

export default function App() {
  const [token, setToken] = useState(null);

  const request = (url, conf) => new Promise((resolve, reject) => {
    const backUrl = "http://localhost:8080/JavaWeb222/";
    url = url.replace("api://", backUrl);
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

  return <AppContext.Provider value={{token, setToken, request}}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path='admin' element={<Admin />} />
          <Route path='group/:slug' element={<Group />} />
          <Route path='privacy' element={<Privacy />} />
          <Route path='product/:slug' element={<Product />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AppContext.Provider>;
}

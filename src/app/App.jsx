import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './ui/Layout';
import Home from '../pages/home/Home';
import Privacy from '../pages/privacy/Privacy';
import { useState } from 'react';
import AppContext from '../features/appContext/AppContext';

export default function App() {
  const [token, setToken] = useState(null);

  return <AppContext.Provider value={{token, setToken}}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path='privacy' element={<Privacy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AppContext.Provider>;
}

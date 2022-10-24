import './App.css';
import {  Route, Router, Link, Routes } from 'react-router-dom'
import Login from './pages/user/Login';
import Signup from './pages/user/Signup';
import Home from './pages/user/home';
import AdminLogin from './pages/admin/adminlogin'
import Admin from './pages/admin/admindashboard'
import Applicationlist from './pages/admin/adminPages/Applicationlist';

function App() {
  return (
    <div>
   

        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/' element={<Home />} />
          <Route path='/adminlogin' element={<AdminLogin />} />


        </Routes>
        <Routes>
          <Route path='/admin' exact element={<Admin />}>
            <Route path='/admin/applicationlist' element={<Applicationlist />} />
          </Route>
        </Routes>

     

    </div>
  );
}

export default App;

import './App.css';
import { Route, Router, Link, Routes } from 'react-router-dom'
import Login from './pages/user/Login';
import Signup from './pages/user/Signup';
import Home from './pages/user/Home';
import AdminLogin from './pages/admin/Adminlogin'
import Admin from './pages/admin/Admindashboard'
import Applicationlist from './pages/admin/adminPages/Applicationlist';
import Success from './pages/user/Success';

function App() {
  return (
    <div>


      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Home />} />
        <Route path='/success' element={<Success />} />


      </Routes>
      <Routes>
        <Route path='/adminlogin' element={<AdminLogin />} />
        <Route path='/admin' exact element={<Admin />}>
          <Route path='/admin/applicationlist' element={<Applicationlist />} />
        </Route>
      </Routes>



    </div>
  );
}

export default App;

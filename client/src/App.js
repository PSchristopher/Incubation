import './App.css';
import { Route, Router, Link, Routes } from 'react-router-dom'
import Login from './pages/user/Login';
import Signup from './pages/user/Signup';
import Home from './pages/user/Home';
import AdminLogin from './pages/admin/Adminlogin'
import Admin from './pages/admin/Admindashboard'
import Applicationlist from './pages/admin/Applicationlist';
import Success from './pages/user/Success';
import Approvedlist from './pages/admin/Approvedlist';
import RejectedList from './pages/admin/RejectedList';
import CreateSlots from './pages/admin/CreateSlots';
import BookingSlot from './pages/admin/BookingSlot';
import Progress from './pages/admin/Progress';

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
          <Route path='/admin/approvedlist' element={<Approvedlist />} />
          <Route path='/admin/rejectedlist' element={<RejectedList />} />
          <Route path='/admin/bookingSlots' element={<BookingSlot />} />
          <Route path='/admin/createSlot' element={<CreateSlots />} />
          <Route path='/admin/progress' element={<Progress />} />
        </Route>
      </Routes>



    </div>
  );
}

export default App;

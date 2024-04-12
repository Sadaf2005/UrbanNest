import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home';
import About from './Pages/About';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Profile from './Pages/Profile';
import Header from './Components/Header';
import PrivateRoute from './Components/PrivateRoute';
import CreateListing from './Pages/CreateListing.jsx';
import UpdateListing from './Pages/UpdateListing.jsx';


export default function App() {
  return (
  <BrowserRouter>
  <Header/>
  <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/sign-in' element={<SignIn />} />
    <Route path='/sign-up' element={<SignUp/>}></Route>
    <Route path='/about' element={<About/>}></Route>
    <Route element={<PrivateRoute/>}>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/create-listing' element={<CreateListing/>}/>
      <Route path='/update-listing/:listingId' element={<UpdateListing/>}/>
    </Route>
  </Routes>
  </BrowserRouter>
  );
}

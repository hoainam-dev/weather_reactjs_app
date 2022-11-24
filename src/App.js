import './App.css';
import {BrowserRouter as Router , Route , Routes , Link} from "react-router-dom"
import Blog from './Components/HomeBlog/homeBlog';
import Login from './Components/Login/login';
import WeatherContainer from "./WeatherContainer/index";
import CreateBlog from './Components/createBlog/createBlog'
import { useState } from 'react';
import {signOut} from 'firebase/auth'
import {auth} from './Components/firebase-config'

import { MdHome , MdLogin , MdCreate ,MdOutlineLogout, MdSocialDistance } from "react-icons/md";

function App() {
  const [isAuth , setIsAuth] = useState(false);
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname="/login";
     })
  }
  return (
    <Router>
         <nav className='navbar'>
        <Link className='link' to="/"><MdHome/> Home </Link>
        <Link className='link' to="/blog"><MdSocialDistance/> Blog </Link>

        {!isAuth ? (
          <Link className='link' to="/login"><MdLogin/> Login </Link>
        ) : (
          <>
            <Link className='link' to="/createblog"><MdCreate/> Create Blog </Link>
            <button onClick={signUserOut}><MdOutlineLogout/> Log Out</button>
          </>
        )}
      </nav>
      <Routes>
        <Route path='/' element={<WeatherContainer isAuth={isAuth}/>} />
        <Route path='/blog' element={<Blog isAuth={isAuth}/>} />
        <Route path='/login' element={<Login setIsAuth={setIsAuth}/>} /> 
        <Route path='/createblog' element={<CreateBlog isAuth={isAuth}/>} />
      </Routes>
    </Router>
  );
}


export default App;

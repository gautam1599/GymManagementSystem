import React, {useState} from 'react';
import logo from '../images/logo.png';
import { useNavigate,Link } from 'react-router-dom';
import { BACKEND_URL } from '../config';

const locationOptions = [
    { value: 'Downtown', label: 'Downtown' },
    { value: 'Milpitas', label: 'Milpitas' },
    { value: 'Sunnyvale', label: 'Sunnyvale' },
  ]; 



function Navbar({ selectedLocation, handleLocationChange }){
    const navigate=useNavigate();
    const [nav, setnav] = useState(false);
    const url=window.location.href;
    let userdetails=JSON.parse(window.sessionStorage.getItem("userdetails"));
    let logstatus=JSON.parse(window.sessionStorage.getItem("isLoggedIn"))?JSON.parse(window.sessionStorage.getItem("isLoggedIn")):false;
    const changeBackground = () => {
        if (window.scrollY >= 50) {
            setnav(true);
        }
        else{
            setnav(false);
        }
        }
    window.addEventListener('scroll', changeBackground);

    function handleLocation(event) {
        handleLocationChange(event.target.value);
        window.sessionStorage.setItem("location",JSON.stringify(event.target.value));
    }
    function removeUser(){
        window.sessionStorage.setItem("userdetails",JSON.stringify(""));
        window.sessionStorage.setItem("isLoggedIn",false);
        navigate(`/`);
    }

    return(
        <nav className={nav? "nav active":"nav"}>
        <Link to='#' className='logo'>
            <img src={logo} alt=''/>
        </Link>
        <input className= 'menu-btn' type='checkbox' id='menu-btn' />
        <label className= 'menu-icon' for='menu-btn'>
            <span className='nav-icon'></span>
        </label>


        <ul>
        <li><label htmlFor="location-select">Select a location:</label></li>
        
        <li><select id="location-select" value={selectedLocation} onChange={handleLocation}>
        {locationOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
        </select>
        </li>
        </ul>

        <ul className= 'menu'>
        <li><Link to="/">Home</Link></li>
       <li><Link to="/admin">Admin</Link></li>
        <li><Link to="/user">User</Link></li>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/' onClick={removeUser}>Logout</Link></li>
        </ul>
        </nav>
    )
}

export default Navbar;

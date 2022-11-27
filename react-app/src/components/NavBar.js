
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const currUser = useSelector(state => state?.session?.user)

  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/collections/all' exact={true} activeClassName='active'>
            Shop
          </NavLink>
        </li>
        {!currUser &&
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>}
        {!currUser &&
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>}
        {currUser &&
        <li>
          <NavLink to='/account' exact={true} activeClassName='active'>
            Account
          </NavLink>
        </li>
        }
        <li>
          <NavLink to='/cart' exact={true} activeClassName='active'>
            Cart
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;


import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const currUser = useSelector(state => state?.session?.user)

  return (
    <nav>
      <ul className='nav-list'>
        <li>
          <NavLink className='nav-link' to='/collections/all' exact={true} activeClassName='active'>
            SHOP
          </NavLink>
        </li>

        <li>
          <NavLink  className='nav-link' to='/' exact={true} activeClassName='active'>
            <img className='home-logo' src='https://i.imgur.com/QrNt895.png' />
          </NavLink>
        </li>
        <div className='right-nav'>
          {!currUser &&
          <li>
            <NavLink  className='nav-link' to='/login' exact={true} activeClassName='active'>
              LOGIN
            </NavLink>
          </li>}
          {!currUser &&
          <li>
            <NavLink className='nav-link' to='/sign-up' exact={true} activeClassName='active'>
              SIGN UP
            </NavLink>
          </li>}
          {currUser &&
          <li>
            <NavLink className='nav-link' to='/account' exact={true} activeClassName='active'>
              ACCOUNT
            </NavLink>
          </li>
          }
          <li>
            <NavLink className='nav-link' to='/cart' exact={true} activeClassName='active'>
            <i class="fas fa-shopping-cart"></i>
            </NavLink>
          </li>

        </div>
      </ul>
    </nav>
  );
}

export default NavBar;

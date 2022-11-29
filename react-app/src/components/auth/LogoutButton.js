import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { purchaseCart } from '../../store/cart';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());

    dispatch(purchaseCart())
    localStorage.removeItem('cart')
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;

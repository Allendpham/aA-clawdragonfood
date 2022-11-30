import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { NavLink } from 'react-router-dom';
import ErrorDisplay from '../ErrorDisplay';
import './form.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const loginDemo = (email, password) =>{
    setEmail(email)
    setPassword(password)
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onLogin}>
      <h1>LOGIN</h1>
      {/* <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div> */}

      <div>
        <ErrorDisplay id={'login-error-list'} errors={errors}/>
      </div>
      <div>
        <div><label htmlFor='email'>Email</label></div>
        <input
          className="login-input"
          name='email'
          id='login-email'
          type='text'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        <div><label htmlFor='password'>Password</label></div>
        <input
          className="login-input"
          name='password'
          id='login-password'
          type='password'
          value={password}
          onChange={updatePassword}
        />
      </div>
      <button type='submit'>LOGIN</button>

      <button className='login-submit' onClick={() => {loginDemo('allen@aa.io', 'password')}}>DEMO USER</button>

      <NavLink className='create-account-link' to='/sign-up' exact={true} activeClassName='active'>
              CREATE ACCOUNT
      </NavLink>
    </form>
  );
};

export default LoginForm;

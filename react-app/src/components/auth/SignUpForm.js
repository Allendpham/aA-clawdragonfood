import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import ErrorDisplay from '../ErrorDisplay';
import './form.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data) {
        setErrors(data)
      }
    }
    else {
      setErrors(['Passwords do not match'])
     }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp}>
      <h1>CREATE ACCOUNT</h1>
      {/* <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div> */}

      <div>
        <ErrorDisplay id={'signup-error-list'} errors={errors}/>
      </div>

      <div>
        <div><label>First Name</label></div>
        <input
          className="login-input"
          type='text'
          id='sign-up-firstname'
          name='firstname'
          onChange={updateFirstName}
          value={firstName}
        ></input>
      </div>

      <div>
        <div><label>Last Name</label></div>
        <input
          className="login-input"
          type='text'
          id='sign-up-lastname'
          name='lastname'
          onChange={updateLastName}
          value={lastName}
        ></input>
      </div>

      <div>
        <div><label>Email</label></div>
        <input
          className="login-input"
          type='text'
          id='sign-up-email'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <div><label>Password</label></div>
        <input
          className="login-input"
          type='password'
          id='sign-up-password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <div><label>Repeat Password</label></div>
        <input
          className="login-input"
          type='password'
          id='sign-up-confirm-password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
        ></input>
      </div>
      <button type='submit'>CREATE</button>
    </form>
  );
};

export default SignUpForm;

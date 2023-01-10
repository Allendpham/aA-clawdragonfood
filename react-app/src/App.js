import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import AllProducts from './components/AllProducts';
import ProductDetail from './components/ProductDetail';
import ReviewForm from './components/ReviewForm';
import UpdateReviewForm from './components/UpdateReviewForm';
import Cart from './components/Cart';
import BowlBox from './components/BowlBox';
import CupBox from './components/CupBox';
import AccountPage from './components/AccountPage';
import HomePage from './components/HomePage';
import RetailersPage from './components/RetailersPage';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/cart' exact={true}>
          <Cart />
        </ProtectedRoute>
        <ProtectedRoute path='/account' exact={true}>
          <AccountPage />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/products/:productId/reviews/:reviewId/edit' exact={true}>
          <UpdateReviewForm />
        </ProtectedRoute>
        <ProtectedRoute path='/products/:productId/reviews/new' exact={true}>
          <ReviewForm />
        </ProtectedRoute>
        <Route path='/retailers' exact={true}>
          <RetailersPage />
        </Route>
        <Route path='/collections/all' exact={true}>
          <AllProducts />
        </Route>
        <Route path='/products/bowl-box'>
          <BowlBox />
        </Route>
        <Route path='/products/cup-box'>
          <CupBox />
        </Route>
        <Route path='/products/:productId' exact={true}>
          <ProductDetail />
        </Route>
        <Route path='/' exact={true} >
          <HomePage />
        </Route>
      </Switch>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;

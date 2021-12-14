import React, { useEffect, useState } from 'react';
import LinkMUI from '@mui/material/Link';
import { Link, Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { checkGoogleToken, checkToken } from '../services/signIn.service';
import Loader from './Loader';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/actions/authenticationAction';
import axios from 'axios';
import { setVacation } from '../redux/actions/vacationAction';
const Home = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState('loading');
  const tokenFromLocalStorage = localStorage.getItem('token');
  const idFromLocalStorage = localStorage.getItem('_id');

  useEffect(() => {
    const googleToken = localStorage.getItem('googleToken');
    if (googleToken) {
      checkGoogleToken(googleToken)
        .then((res) => {
          console.log(res);
          dispatch(
            setUser({
              email: res.data.email,
              firstName: res.data.given_name,
              lastName: res.data.lastName,
              googleId: res.data.sub,
            })
          );
          res.data && setToken(true);
        })
        .catch((err) => {
          console.error(err.response.data);
          setToken(false);
        });
    } else if (tokenFromLocalStorage) {
      checkToken(tokenFromLocalStorage)
        .then((res) => {
          console.log(res);
          dispatch(setUser(res.data));
          res.data && setToken(true);
        })
        .catch((err) => {
          console.error(err.response.data);
          setToken(false);
        });
    } else if (!tokenFromLocalStorage && !googleToken) {
      setToken(false);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3002/vacations').then((res) => {
      dispatch(setVacation(res.data));
    });
  }, []);

  if (token === 'loading') {
    return <Loader />;
  } else if (!token) {
    return (
      <div>
        <div>not token - you need to login</div>
        <LinkMUI component={Link} to="/signin">
          signin
        </LinkMUI>
      </div>
    );
  } else if (token)
    return (
      <div>
        <Navbar />
        <Outlet />
      </div>
    );
};

export default Home;

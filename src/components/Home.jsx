import React, { useEffect, useState } from 'react';
import LinkMUI from '@mui/material/Link';
import { Link, Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { checkToken } from '../services/signIn.service';
import Loader from './Loader';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/actions/authenticationAction';
import axios from 'axios';
import { setVacation } from '../redux/actions/vacationAction';
const Home = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState('loading');
  const tokenFromLocalStorage = localStorage.getItem('token');
  const idFromLocalStorage = localStorage.getItem('id');
  useEffect(() => {
    checkToken(idFromLocalStorage, tokenFromLocalStorage)
      .then((res) => {
        dispatch(setUser(res.data));
        res.data && setToken(true);
      })
      .catch((err) => {
        setToken(false);
      });
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

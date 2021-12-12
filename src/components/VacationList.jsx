import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Vacation from './Vacation';
import Grid from '@mui/material/Grid';
import dreamVacationImg from '../images/dreamVacation.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { setVacation } from '../redux/actions/vacationAction';
const VacationList = () => {
  const dispatch = useDispatch();
  const vacationsState = useSelector((state) => state.vacation);
  // useEffect(() => {
  //   axios.get('http://localhost:3002/vacations').then((res) => {
  //     setVacationsState(res.data);
  //     dispatch(setVacation(res.data));
  //   });
  // }, []);

  return (
    vacationsState.length > 0 && (
      <>
        {' '}
        <img
          height="200px"
          width="100%"
          alt="dreamVacationImg"
          src={dreamVacationImg}
        />
        <div style={{ width: '90%', margin: '0 auto' }}>
          <br />
          <br />
          <Grid container spacing={2}>
            {vacationsState.map((vacation) => (
              <Grid key={vacation.id} item xs={4} md={3}>
                <Vacation vacation={vacation} />
              </Grid>
            ))}
          </Grid>
        </div>
      </>
    )
  );
};

export default VacationList;

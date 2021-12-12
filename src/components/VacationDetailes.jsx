import { Button } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import Loader from './Loader'
const VacationDetailes = () => {
  let params = useParams();
  const vacationFromRedux = useSelector((state) => state.vacation);

  let navigate = useNavigate();
  const handlerBackButton = () => {
    navigate(-1);
  };
  return (
    vacationFromRedux.length > 0 ? (
      <div>
        {JSON.stringify(vacationFromRedux.find((vac) => vac.id == params.id))}
        <Button onClick={handlerBackButton} variant="contained">
          Back
        </Button>
      </div>
    ): (<Loader />)
  );
};

export default VacationDetailes;

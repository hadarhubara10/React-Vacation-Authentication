import React, { useEffect } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import VacationList from './VacationList';
import VacationDetailes from './VacationDetailes';

const Container = () => {

  return (
    <div>
      <Routes>
        <Route index element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />}>
          <Route path="VacationDetailes/:id" element={<VacationDetailes />} />
          <Route path="profile" element={<Profile />} />
          <Route index element={<VacationList />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Container;

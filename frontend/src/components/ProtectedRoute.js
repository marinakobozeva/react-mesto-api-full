import React from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const ProtectedRoute = (props) => {
  return (
    <Route>
      {
        props.loggedIn ? props.children : <Redirect to='./signin' />
      }
    </Route>
)}

export default ProtectedRoute;
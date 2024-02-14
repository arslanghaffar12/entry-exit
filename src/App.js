import React, { Fragment, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Summary from './pages/Summary';
import Layout from './helpers/layout';
import Authenticate from './helpers/authenticate';

function App() {
  return (
    <Fragment>
    <Router>
      <Routes>
        <Route path='/login' element={< Login/>} />
        <Route path='/' element={
        // <Authenticate>
          <Layout />
          // </Authenticate>
        }>
          <Route index element={<Summary />} />

        </Route>
      </Routes>
    </Router>


  </Fragment>
  );
}

export default App;

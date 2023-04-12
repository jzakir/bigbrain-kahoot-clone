import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashBoard from './pages/Dashboard';
import { Context } from './authContext';
import LoginRegisterLayout from './layouts/LoginRegisterLayout';
import PrivateRoute from './layouts/PrivateRoute';
import SiteLayout from './layouts/SiteLayout';

document.title = 'BigBrain!';

function App () {
  const [authToken, setAuthToken] = React.useState(
    localStorage.getItem('token')
  );

  console.log('Current token at app level: ' + authToken);
  return (
    <>
    <Context.Provider value={{ authToken, setAuthToken }}>
      <BrowserRouter>
        <Routes>
          <Route element={<LoginRegisterLayout/>}>
            <Route path="/" element={<HomePage/>}/>
            <Route exact path="register" element={<RegisterPage/>}/>
            <Route exact path="login" element={<LoginPage/>}/>
          </Route>
          <Route element={<SiteLayout/>}>
            <Route
              exact
              path="dashboard"
              element={
                <PrivateRoute>
                  <DashBoard/>
                </PrivateRoute>}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Context.Provider>
    </>
  );
}

export default App;

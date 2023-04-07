import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import NavBar from './components/NavBar';
import DashBoard from './pages/Dashboard';
import { Context } from './authContext';
import LoginRegisterLayout from './layouts/LoginRegisterLayout';

document.title = 'BigBrain!';

function App () {
  const [authToken, setAuthToken] = React.useState(
    localStorage.getItem('token')
  );

  console.log('Current token at app level: ' + authToken);
  console.log(setAuthToken);
  return (
    <>
    <Context.Provider value={{ authToken, setAuthToken, }}>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route element={<LoginRegisterLayout/>}>
            <Route exact path="register" element={<RegisterPage/>}/>
            <Route exact path="login" element={<LoginPage/>}/>
          </Route>
          <Route path="/" element={<HomePage/>}/>
          <Route exact path="dashboard" element={<DashBoard/>}/>
        </Routes>
      </BrowserRouter>
    </Context.Provider>
    </>
  );
}

export default App;

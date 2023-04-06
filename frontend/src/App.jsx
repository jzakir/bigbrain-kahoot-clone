import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import NavBar from './components/NavBar';

document.title = 'BigBrain!';

function App () {
  const [authToken, setAuthToken] = React.useState(
    localStorage.getItem('token')
  );

  console.log(authToken);
  console.log(setAuthToken);
  return (
    <>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route exact path="register" element={<RegisterPage/>}/>
          <Route exact path="login" element={<LoginPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

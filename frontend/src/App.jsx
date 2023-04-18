import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashBoard from './pages/Dashboard';
import EditGamePage from './pages/EditGamePage';
import EditQuestionPage from './pages/EditQuestionPage';
import { Context } from './authContext';
import LoginRegisterLayout from './layouts/LoginRegisterLayout';
import PrivateRoute from './layouts/PrivateRoute';
import SiteLayout from './layouts/SiteLayout';
import NavBar from './components/NavBar';
import ResultsPage from './pages/ResultsPage';

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
          <Route element={<SiteLayout nav={<NavBar/>}/>}>
            <Route
              exact path="dashboard"
              element={
                <PrivateRoute>
                  <DashBoard/>
                </PrivateRoute>}
            />
          </Route>
          <Route path="edit" element={<SiteLayout nav={<NavBar/>}/>}>
              <Route path=":gameId">
                <Route index element={<PrivateRoute><EditGamePage/></PrivateRoute>}/>
                <Route path=":questionId" element={<PrivateRoute><EditQuestionPage/></PrivateRoute>}/>
              </Route>
          </Route>
          <Route path="results" element={<SiteLayout nav={<NavBar/>}/>}>
            <Route path=":quizId">
              <Route path=":sessionId" element={<PrivateRoute><ResultsPage/></PrivateRoute>}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Context.Provider>
    </>
  );
}

export default App;

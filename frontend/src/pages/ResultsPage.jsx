import React from 'react';
import { Container } from '@mui/material';
import axios from '../axios';
import { Context, useContext } from '../authContext';
import { useParams } from 'react-router-dom';
import QuizAdvance from '../components/QuizAdvance';
import AdminResult from '../components/AdminResult';

export default function ResultsPage () {
  const { authToken } = useContext(Context);
  const params = useParams();

  const [loading, setLoading] = React.useState(false);
  const [quizName, setQuizName] = React.useState('');
  const [quizEnd, setQuizEnd] = React.useState(false);
  const [currPos, setCurrPos] = React.useState(-1);

  // Make an API call to /admin/session/{sessionid}/status to determine everything about this session.
  // If it's active, then show advance/stop
  console.log(loading);
  const handleStop = () => {
    axios.post(`/admin/quiz/${params.quizId}/end`, {}, { headers: { Authorization: `Bearer ${authToken}` } })
      .then(data => {
        checkQuizStatus();
      })
      .catch(err => console.log(err));
  }

  const handleAdvance = () => {
    axios.post(`/admin/quiz/${params.quizId}/advance`, {}, { headers: { Authorization: `Bearer ${authToken}` } })
      .then(data => {
        checkQuizStatus();
      })
      .catch(err => console.log(err));
  }

  const fetchQuizName = () => {
    setLoading(true);
    axios.get(`/admin/quiz/${params.quizId}`, { headers: { Authorization: `Bearer ${authToken}` } })
      .then(data => {
        setQuizName(data.data.name);
      })
      .catch(err => console.log(err));
    setLoading(false);
  }

  console.log(quizEnd);

  const checkQuizStatus = () => {
    axios.get(`/admin/session/${params.sessionId}/status`, { headers: { Authorization: `Bearer ${authToken}` } })
      .then(data => {
        const result = data.data.results;
        setCurrPos(result.position);
        if (!result.active) {
          setQuizEnd(true);
        }
      })
      .catch(err => console.log(err));
  }

  React.useEffect(() => {
    checkQuizStatus();
    fetchQuizName();
  }, []);

  return (
    <>
      <main>
        <Container maxWidth="lg" sx={{ mt: 10 }}>
          {quizEnd
            ? <AdminResult></AdminResult>
            : <QuizAdvance
            quizName={quizName}
            currPos={currPos}
            handleAdvance={handleAdvance}
            handleStop={handleStop}
          ></QuizAdvance>}
        </Container>
      </main>
    </>
  )
}

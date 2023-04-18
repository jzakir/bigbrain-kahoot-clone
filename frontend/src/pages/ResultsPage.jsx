import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import TitleButton from '../components/TitleButton';
import Loading from '../layouts/Loading';
import axios from '../axios';
import { Context, useContext } from '../authContext';
import WhiteBox from '../components/WhiteBox';
import PrimaryButton from '../components/PrimaryButton';
import GradientButton from '../components/GradientButton';
import { useParams } from 'react-router-dom';
// import QuizAdvance from '../components/AdminResult';

export default function ResultsPage () {
  const { authToken } = useContext(Context);
  const params = useParams();

  const [loading, setLoading] = React.useState(false);
  const [quizName, setQuizName] = React.useState('');
  const [quizEnd, setQuizEnd] = React.useState(false);
  const [currPos, setCurrPos] = React.useState(-1);

  // Make an API call to /admin/session/{sessionid}/status to determine everything about this session.
  // If it's active, then show advance/stop

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
        <TitleButton title="Game Management"/>
        <Container maxWidth="lg">
          <WhiteBox sx={{ height: '500px' }}>
            { loading && !quizEnd
              ? <Loading/>
              : <Box sx={{ display: 'flex', flexDirection: 'column', mt: 5 }}>
                  <Typography variant='h2' sx={{ fontWeight: 'bold', color: 'rgb(248,130,135)' }}>{quizName}</Typography>
                  <Typography variant='h6'>{currPos === -1 ? 'The game hasn\'t started yet.' : `The current position is: ${currPos}` }</Typography>
                  <Box sx={{ display: 'flex', mt: 10 }}>
                    <PrimaryButton onClick={ handleStop }>
                      Stop Session
                    </PrimaryButton>
                    <GradientButton onClick={ handleAdvance }>
                      Advance Question
                    </GradientButton>
                  </Box>
              </Box> }
          </WhiteBox>
        </Container>
      </main>
    </>
  )
}

// <QuizAdvance
//   quizName={quizName}
//   currPos={currPos}
//   handleAdvance={handleAdvance}
//   handleStop={handleStop}
// ></QuizAdvance>

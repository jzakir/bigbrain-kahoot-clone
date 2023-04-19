import React from 'react';
import WhiteBox from '../components/WhiteBox';
import PlayGameQuestion from '../components/PlayGameQuestion';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../axios';
import WaitGameStart from '../components/WaitGameStart';

// const question = {
//   id: 0,
//   questionString: 'Test Question',
//   type: 'single',
//   selections: [
//     {
//       answer: 'First Answer',
//       answerId: 0
//     },
//     {
//       answer: 'Second Answer',
//       answerId: 1
//     },
//     {
//       answer: 'Third Answer',
//       answerId: 2
//     },
//     {
//       answer: '4',
//       answerId: 3
//     }
//   ],
//   timeLimit: 200,
// }

export default function PlayGamePage () {
  const params = useParams();
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  const [question, setQuestion] = React.useState({});

  const checkQuestion = (fetchedQuestion) => {
    if (JSON.stringify(fetchQuestion) !== JSON.stringify(question)) {
      setQuestion(fetchedQuestion);
    } else {
      console.log('No updates...');
    }
  }

  const checkResults = () => {
    axios.get(`/play/${params.playerId}/results`)
      .then(() => navigate('results'))
      .catch(err => console.err(err));
  }

  const fetchQuestion = () => {
    axios.get(`/play/${params.playerId}/status`)
      .then(data => {
        if (data.data.started) {
          axios.get(`/play/${params.playerId}/question`)
            .then(response => {
              checkQuestion(response.data.question);
              setLoading(false);
            })
            .catch(err => console.error(err));
        } else {
          console.log('Waiting for Game to start...');
        }
      })
      .catch(() => checkResults());
  }

  React.useEffect(() => {
    const id = setInterval(fetchQuestion, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <WhiteBox>
        {loading ? <WaitGameStart/> : <PlayGameQuestion question={question}/>}
      </WhiteBox>
    </>
  )
}

import React from 'react';
import WhiteBox from '../components/WhiteBox';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../layouts/Loading';
import axios from '../axios';
import GradientButton from '../components/GradientButton';
import PlayResult from '../components/PlayResult';

export default function PlayResultsPage () {
  const params = useParams();
  const navigate = useNavigate();
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const fetchResults = () => {
    setLoading(true);
    axios.get(`/play/${params.playerId}/results`)
      .then(data => {
        setResults(data.data.map((val, index) => `Question ${index + 1}: ${val.correct ? 'Correct' : 'Incorrect'}`));
        console.log(data.data);
      })
      .then(() => setLoading(false))
      .catch(err => console.err(err));
  }

  React.useEffect(fetchResults, []);

  return (
    <>
      <WhiteBox>
        {loading ? <Loading/> : <PlayResult results={results}/>}
        <GradientButton onClick={() => navigate('/play/join')}>Play Again</GradientButton>
      </WhiteBox>
    </>
  )
}

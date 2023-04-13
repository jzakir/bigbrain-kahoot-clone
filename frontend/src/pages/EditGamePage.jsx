import React from 'react';
import axios from '../axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Container, Typography, Input,
  Grid, Card, CardMedia, CardContent, CardActions, CircularProgress
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import PrimaryButton from '../components/PrimaryButton';
import GradientButton from '../components/GradientButton';
import { Context, useContext } from '../authContext';
import { defaultQuizThumbnail, fileToDataUrl } from '../helpers';

export default function EditGamePage () {
  const navigate = useNavigate();
  const { authToken } = useContext(Context);
  const [loading, setLoading] = React.useState(true);
  const [game, setGame] = React.useState(null);
  const params = useParams();

  const [uploadedFile, setUploadedFile] = React.useState(null);
  const [newQuizName, setNewQuizName] = React.useState('');

  const handleSaveMetadata = async () => {
    axios.put(`/admin/quiz/${params.gameId}`,
      {
        name: newQuizName,
        ...(uploadedFile) && { thumbnail: await fileToDataUrl(uploadedFile) }
      }, { headers: { Authorization: `Bearer ${authToken}` } })
      .then(() => fetchGameDetails())
      .catch(err => console.error(err));
  }

  const createGameCard = (game) => {
    return (<Card
      sx={{ maxWidth: '1200px', display: 'flex', flexDirection: 'column', background: 'linear-gradient(147deg, #c3cbdc 0%, #edf1f4 74%)' }}
    >
      <CardMedia
        component="img"
        image={game.thumbnail || defaultQuizThumbnail}
        alt="Quiz Thumbnail"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
        <Input
          variant="outlined"
          name="gameName"
          type="text"
          placeholder="Game Title"
          defaultValue={game.name}
          sx={{ fontSize: '1.5em' }}
          onChange={e => setNewQuizName(e.target.value)}
        />
        </Typography>
        <Typography>
          Created on {new Date(game.createdAt).toDateString()} by {game.owner}
        </Typography>
        <div style={ { display: 'flex', alignItems: 'center', gap: '5px' } }>
          <Typography>
            Update Image:
          </Typography>
          <PrimaryButton variant="contained" component="label" sx={ { ml: 1 } }>
            Upload
            <InsertPhotoIcon sx={{ pl: 0.5 }}/>
            <input hidden accept="image/*" type="file" onChange={e => setUploadedFile(e.target.files[0])} />
          </PrimaryButton>
          {uploadedFile && <><Typography>{uploadedFile.name}</Typography><FileDownloadDoneIcon sx={{ color: 'lime' }}/></>}
        </div>
      </CardContent>
      <CardActions sx={{ alignSelf: 'flex-end' }}>
      <PrimaryButton sx={{ height: '50%', alignSelf: 'center' }} onClick={handleSaveMetadata}>Save Quiz Details<SaveIcon sx={{ pl: 0.5 }}/></PrimaryButton>
      </CardActions>
    </Card>);
  }

  const fetchGameDetails = () => {
    setLoading(true);
    axios.get(`/admin/quiz/${params.gameId}`, { headers: { Authorization: `Bearer ${authToken}` } })
      .then(response => {
        console.log(response.data)
        setGame(response.data);
        setNewQuizName(response.data.name);
        // setQuestions(response.data.questions) here for the question cards
        setLoading(false);
      })
      .catch(err => alert(err))
  }

  React.useEffect(() => fetchGameDetails(), []);

  return (
    <>
      <main>
        <Box
          sx={{
            pt: 6
          }}
        >
          <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              component="h1"
              variant="h2"
              align="left"
              color="background.paper"
              gutterBottom
              style={{ textShadow: '2px 3px 5px rgba(0,0,0,0.5)' }}
            >
              Edit Game
            </Typography>
          </Container>

          <Container maxWidth="lg" sx={{ pb: 6 }}>
            {loading ? <CircularProgress/> : createGameCard(game)}
          </Container>
        </Box>
        <Container maxWidth="lg" sx={{ pb: 6 }}>
          <Grid container spacing={4}>
          </Grid>
          <GradientButton sx={{ height: '50%', alignSelf: 'center' }} onClick={() => navigate('/dashboard')}>Save Changes<SaveIcon sx={{ pl: 0.5 }}/></GradientButton>
        </Container>
      </main>
    </>
  );
}

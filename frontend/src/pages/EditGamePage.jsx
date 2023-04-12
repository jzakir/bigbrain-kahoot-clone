import React from 'react';
import axios from '../axios';
import { useParams } from 'react-router-dom';
import {
  Box, Container, Typography, Input,
  Grid, Card, CardMedia, CardContent, CardActions, CircularProgress
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import PrimaryButton from '../components/PrimaryButton';
import { Context, useContext } from '../authContext';

export default function EditGamePage () {
  // const navigate = useNavigate();
  const { authToken } = useContext(Context);
  const [loading, setLoading] = React.useState(true);
  const [gameCard, setGame] = React.useState(null);
  const params = useParams();

  const createGameCard = (game) => {
    return (<Card
      sx={{ maxWidth: '1200px', display: 'flex', flexDirection: 'column' }}
    >
      <CardMedia
        component="img"
        image={game.thumbnail || 'https://kahoot.com/files/2020/03/Schools-library-GettingStarted-570x320.png'}
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
        />
        </Typography>
        <Typography>
          Owner: {game.owner} <br/>  Created at: {new Date(game.createdAt).toDateString()}
        </Typography>
        <div style={ { display: 'flex' } }>
          <Typography>
            Image:
          </Typography>
          <PrimaryButton variant="contained" component="label" sx={ { ml: 1 } }>
            Upload
            <InsertPhotoIcon sx={{ pl: 0.5 }}/>
            <input hidden accept="image/*" type="file" />
          </PrimaryButton>
        </div>
      </CardContent>
      <CardActions sx={{ alignSelf: 'flex-end' }}>
      <PrimaryButton sx={{ height: '50%', alignSelf: 'center' }}><SaveIcon/></PrimaryButton>
      </CardActions>
    </Card>);
  }

  const fetchGameDetails = () => {
    axios.get(`/admin/quiz/${params.gameId}`, { headers: { Authorization: `Bearer ${authToken}` } })
      .then(response => {
        console.log(response.data)
        setGame(createGameCard(response.data));
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
            bgcolor: 'background.paper',
            pt: 6
          }}
        >
          <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              component="h1"
              variant="h2"
              align="left"
              color="text.primary"
              gutterBottom
            >
              Edit Game
            </Typography>
          </Container>

          <Container maxWidth="lg" sx={{ pb: 6 }}>
            {loading ? <CircularProgress/> : gameCard}
          </Container>
        </Box>
        <Container maxWidth="lg" sx={{ pb: 6 }}>
          <Grid container spacing={4}>
          </Grid>
          <PrimaryButton sx={{ height: '50%', alignSelf: 'center' }}>Save Changes<SaveIcon sx={{ pl: 0.5 }}/></PrimaryButton>
        </Container>
      </main>
    </>
  );
}

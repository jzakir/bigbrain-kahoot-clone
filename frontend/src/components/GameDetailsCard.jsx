import React from 'react';
import { Typography, CardContent, CardActions, Card, CardMedia, Input } from '@mui/material';
import { defaultQuizThumbnail } from '../helpers';
import PrimaryButton from './PrimaryButton';
import SaveIcon from '@mui/icons-material/Save';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';

export default function GameDetailsCard (props) {
  const game = props.game;
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
        fullWidth
        sx={{ fontSize: '1.5em' }}
        onChange={e => props.setNewQuizName(e.target.value)}
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
          <input hidden accept="image/*" type="file" onChange={e => props.setUploadedFile(e.target.files[0])} />
        </PrimaryButton>
        {props.uploadedFile && <><Typography>{props.uploadedFile.name}</Typography><FileDownloadDoneIcon sx={{ color: 'lime' }}/></>}
      </div>
    </CardContent>
    <CardActions sx={{ alignSelf: 'flex-end' }}>
    <PrimaryButton sx={{ height: '50%', alignSelf: 'center' }} onClick={props.onSave}>Save Quiz Details<SaveIcon sx={{ pl: 0.5 }}/></PrimaryButton>
    </CardActions>
  </Card>);
}

import React from 'react';
import { Typography, CardContent, CardActions, Card, CardMedia, Container } from '@mui/material';
import GradientButton from './GradientButton';
import { defaultQuestionThumbnail, embedLink, extractYoutubeId } from '../helpers';
import PlayAnswerButton from './PlayAnswerButton';

export default function PlayGameQuestion (props) {
  const question = props.question;
  const videoId = extractYoutubeId(question.url);

  const [selectedAnswerIds, setSelectedAnswerIds] = React.useState([0, 3]);

  console.log(selectedAnswerIds);

  const handleAnswerChange = (answerId) => {
    if (selectedAnswerIds.includes(answerId)) {
      setSelectedAnswerIds(selectedAnswerIds.filter(aId => aId !== answerId))
    } else {
      question.type === 'single'
        ? setSelectedAnswerIds([answerId])
        : setSelectedAnswerIds([...selectedAnswerIds].concat([answerId]));
    }
  }

  return (<Card
    sx={{ maxWidth: '1200px', display: 'flex', flexDirection: 'column', background: 'linear-gradient(147deg, #c3cbdc 0%, #edf1f4 74%)' }}
  >
    <CardMedia
      component={videoId ? 'iframe' : 'img'}
      src={videoId ? embedLink(videoId) : (question.url || defaultQuestionThumbnail)}
      alt="Question Thumbnail"
    />
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography gutterBottom variant="h5" component="h2" align="center">
       {question.questionString}
      </Typography>
      <Typography color="grey" fontSize={15} variant="body1">{question.type === 'multiple' ? 'Select all that are correct' : 'Select the correct answer'}</Typography>
      <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }}>
          {question.selections.map(a => <PlayAnswerButton
            answer={a}
            key={a.answerId}
            selected={selectedAnswerIds.includes(a.answerId)}
            handleAnswerChange={handleAnswerChange}
          />)}
      </Container>
    </CardContent>
    <CardActions sx={{ alignSelf: 'flex-end' }}>
      <GradientButton sx={{ height: '50%', alignSelf: 'center' }}>Submit Answer!</GradientButton>
    </CardActions>
  </Card>);
}

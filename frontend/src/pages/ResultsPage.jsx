import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import TitleButton from '../components/TitleButton';
import Loading from '../layouts/Loading';

export default function ResultsPage () {
  const [loading] = React.useState(false);

  // Make an API call to /admin/session/{sessionid}/status to determine everything about this session.
  // If it's active, then show advance/stop

  return (
    <>
      <main>
        <TitleButton title="Game Management"/>
        <Container maxWidth="lg" sx={{ pb: 6 }}>
          <Grid container spacing={4}>
            { loading ? <Loading/> : <Typography variant='h4'>Page has finished loading</Typography> }
          </Grid>
        </Container>
      </main>
    </>
  )
}

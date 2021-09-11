import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Close } from '@material-ui/icons';

export default function Layout() {
  return (
    <div>
      <Grid container>
        <Grid>
          <Typography>New Post</Typography>
        </Grid>
        <Grid>
          <Close />
        </Grid>
      </Grid>
    </div>
  );
}

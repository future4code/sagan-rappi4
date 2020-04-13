import React from 'react';
import Paper from '@material-ui/core/Paper';


export default function SimplePaper() {
 
  return (
    <div>
      <Paper elevation={3} />
      <Paper>
        <div>Hello world!</div>
      </Paper>
      <Paper elevation={3} />
    </div>
  );
}
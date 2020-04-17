import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
    root: {
        backgroundColor: 'black'
    }
}); 

export default function DividerBlack(props) {
    const classes = useStyles();
  
    return (
        <Divider variant="fullWidth" classes={{ root: classes.root }} />
    );
}
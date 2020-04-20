import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/styles';
import { CardActionArea, CardMedia, Typography, CardActions, Button, CardContent } from '@material-ui/core';
import styled from 'styled-components';

const TimeAndShipping = styled.div`
    display: flex;
    justify-content: space-between;
`

const useStyles = makeStyles({
    root: {
      maxWidth: 345
    }
}); 

const Wrapper = styled(Card)`
    margin-top: 12px;
`
  

export default function CardRestaurant(props) {
    const classes = useStyles();
  
    return (
        <Wrapper className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={props.restaurant.logoUrl}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" color="primary">
                        {props.restaurant.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.restaurant.category}
                    </Typography>
                    <TimeAndShipping>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {`${props.restaurant.deliveryTime} min`}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {`Frete R$ ${props.restaurant.shipping}`}
                    </Typography>
                    </TimeAndShipping>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.restaurant.address}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Wrapper>
    );
}
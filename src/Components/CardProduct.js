import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/styles';
import { Box, CardMedia, Typography, CardContent } from '@material-ui/core';
import styled from 'styled-components';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      marginTop: 8
    },
    testes : {
        backgroundColor: 'black'
    }
}); 

const ContainerCard = styled.div`
    display: grid;
    grid-template-columns: 30% 70%;
    height: 145px;
    font-family: 'Roboto-Regular';
`

const Bttn = styled.button`
    width: 90px;
    height: 31px;
    border-radius: 8px;
    background-color: white;
    color: ${props => !props.isButtonRemove ? 'black' : '#e02020'};
    border: solid 1px ${props => !props.isButtonRemove ? 'black' : '#e02020'};
`

const Container = styled.div`
    /* padding-top: 10px; */
    margin: 5px; 
    max-width: 345px;
    padding-bottom: 8px;
` 

const ContainerButton = styled.div`
    display: flex;
    justify-content: flex-end;
`

const ContainerQuantityProductsInCar = styled.div`
    display: flex; 
/*     align-items: center;
    align-items:center; */
    width: 25px;
    height: 25px;
    border: solid 1px;
    color: #e86e5a;
`

const ContainerCart = styled.div`
    display: flex;
    justify-content: flex-end;
`

export default function CardProduct(props) {
    const classes = useStyles();
  
    return (
        <Container>
            <Typography gutterBottom variant="subheading" color="default">
                {props.category}
            </Typography>
            <Card className={classes.root}>
                    <ContainerCard>
                        <CardMedia
                            component="img"
                            height="145px"
                            image={props.product.photoUrl}
                        />
                        <CardContent>
                            <ContainerCart>
                            { props.isForRender(props.product) ? <ContainerQuantityProductsInCar> {props.quantityByProductInCar(props.product)} </ContainerQuantityProductsInCar> : ''}
                            </ContainerCart>
                            <Typography gutterBottom variant="subtitle1" component="h2" color="primary">
                                {props.product.name}
                            </Typography>
                            <Typography color="secondary" variant="subtitle2">
                                {props.product.description}
                            </Typography>
                            <Typography>
                                R${props.product.price}
                            </Typography>
                            <ContainerButton>
                                { props.isForRender(props.product) ? <Bttn isButtonRemove={true} onClick={() => props.removeProduct(props.product)}> Remover </Bttn>: <Bttn isButtonRemove={false} onClick={() => {props.addProduct(props.product) }}> adicionar </Bttn> }
                            </ContainerButton>
                        </CardContent>                   
                    </ContainerCard>
            </Card>
        </Container>
    );
}
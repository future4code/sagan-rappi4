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
    width: 20px;
    height: 20px;
    border: solid 1px;
    color: #e86e5a;
`

const ContainerCart = styled.div`
    display: flex;
    justify-content: flex-end;
`

const NomeDoItem = styled.span`
    width: 166px;
    height: 16px;
    font-family: Roboto;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.39px;
    color: #e86e5a;
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
                            <NomeDoItem>
                                {props.product.name}
                            </NomeDoItem>
                            <Typography color="secondary" variant="subtitle3">
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
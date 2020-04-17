import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { getRestaurantDetail, setCart } from '../../actions/detailRestaurant';
import { push } from 'connected-react-router';
import { routes } from '../Router';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CardRestaurant from '../../Components/CardRestaurant';
import CardProduct from '../../Components/CardProduct';
import styled from 'styled-components';
import TopBar from '../../Components/TopBar'
import DividerBlack from '../../Components/DividerBlack'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { setShowMenu } from "../../actions/menuAction"


const Wrapper = styled.div`
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    a {
        cursor: pointer;
    }
`

const SelectStyle = styled.select`
    width: 280px;
    height: 30px;
    border-radius: 4px;
    border: solid 1px #b8b8b8;
`

const ButtonAddCart = styled.button`
    /* width: 183px; */
    height: 30px;
    font-family: Roboto;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.39px;
    text-align: right; 
    color: #4a90e2;
    background-color: white;
    border: none;
    border-radius: 8px;
`

const H3Styled = styled.h3`
    margin: 0;
`

/* const DialogStyle = styled.dialog`
    width: 328px;
    height: 216px;
    background-color: var(--white);
` */

class RestaurantPage extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            product: [],
            cart: [],
            quantity: 1,
        }
    }

    componentDidMount() {
        this.props.setShowMenu(false)
        const token = window.localStorage.getItem('token')

        if (!token) {
           this.props.redirectLogin() 
        }
        
        // depois lembrar de checar se tem id
        if (token && this.props.getRestaurantDetail) {
            this.props.getRestaurantDetail(this.props.idRestaurant)
            //Usando o restaurante 1 para funcionar, quando integrar trocar por this.props.restauraurant.id
        }
    }

    addProduct = (product) => {
        this.setState({
            open: true,
            product
        })
    };

    addInCart = () => {
        const cartCopy = [...this.state.cart]

        cartCopy.push({
            product: this.state.product,
            quantity: this.state.quantity
        })

        this.setState({
            open: false,
            cart: cartCopy
        })

        this.clearFields()
        this.setCartInReducers(cartCopy)
    };
    
    setCartInReducers = (cartCopy) => {
        const cart = {
            restaurant: this.props.restaurant,
            orders: cartCopy
        }

        this.props.setCart(cart)
    }

    clearFields = () => {
        this.setState({
            product: {},
            quantity: 1
        })
    }

    onChangeQuantity = (event) => {
        this.setState({ 
            quantity: event.target.value
        })
    }

    getQuantityByProductInCart = (product) => {
        const order = this.state.cart.filter(productSelecioned => {
            return product.id === productSelecioned.product.id
        })

        return order[0] ? order[0].quantity : null
    }

    hasProductAddInCart = (product) => {
        return this.getQuantityByProductInCart(product) || false
    }

    isForRender = (product) => {
        return this.state.cart.length > 0 && this.hasProductAddInCart(product)
    }

    removeProductInCart = (product) => {
        const cartNew = this.state.cart.filter(order => {
            return order.product !== product
        })

        this.setState({
            cart: cartNew
        })
    }

    render() {
        const productsForCategoryMap = new Map()

        this.props.restaurant.products && this.props.restaurant.products.forEach(product => {
            const products = productsForCategoryMap.get(product.category)
            
            if (products) {
                products.push(product)
            } else {
                productsForCategoryMap.set(product.category, [product])
            }
        });

        const indexForNameAtributte = {
            "nameCategory": 0,
            "products": 1
        }

        return (
            <Wrapper>
                <TopBar
                    title="Restaurante"
                    returnButton={<ArrowBackIosIcon onClick={this.props.redirectFeed} fontSize='small' />}
                />
                <CardRestaurant restaurant={this.props.restaurant}/>
                <Dialog 
                    open={this.state.open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle>
                        Selecione a quantidade desejada
                    </DialogTitle>
                    <DialogContent>
                        <SelectStyle id="quant" onChange={this.onChangeQuantity} value={this.state.value}>
                            <option> 1 </option>
                            <option> 2 </option>
                            <option> 3 </option>
                            <option> 4 </option>
                            <option> 5 </option>
                            <option> 6 </option>
                            <option> 7 </option>
                            <option> 8 </option>
                            <option> 9 </option>
                            <option> 10 </option>
                        </SelectStyle>
                    </DialogContent>
                    <DialogActions>
                        <ButtonAddCart onClick={() => this.addInCart()}> 
                            ADICIONAR AO CARRINHO 
                        </ButtonAddCart>
                    </DialogActions>
                </Dialog>

                { productsForCategoryMap && [...productsForCategoryMap].map((element) => {
                    return (
                        <div>
                            <H3Styled>{element[indexForNameAtributte.nameCategory]}</H3Styled>
                            <DividerBlack/>
                            { element[indexForNameAtributte.products].map(product => {
                                return (
                                    <div>
                                        { this.state.cart.length > 0 && this.hasProductAddInCart(product) ? (this.getQuantityByProductInCart(product)).quantity : '' }
                                        <CardProduct
                                            product={product}
                                            isForRender={this.isForRender}
                                            removeProduct={this.removeProductInCart}
                                            addProduct={this.addProduct}
                                            quantityByProductInCar={this.getQuantityByProductInCart}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </Wrapper>
        )
    }
}

const mapStateToProps = state => ({
    restaurant: state.restaurants.restaurantDetailed,
    idRestaurant: state.feed.idRestaurant
})

const mapDispatchToProps = (dispatch) => ({
    redirectLogin: () => dispatch(push(routes.loginPage)),
    redirectFeed: () => dispatch(push(routes.feedPage)),
    getRestaurantDetail: (id) => dispatch(getRestaurantDetail(id)),
    setCart: (cart) => dispatch(setCart(cart)),
    setShowMenu: (show) => dispatch(setShowMenu(show))
})

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantPage)
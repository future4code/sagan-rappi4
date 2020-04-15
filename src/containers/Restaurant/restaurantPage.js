import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { getRestaurantDetail, setCart } from '../../actions/detailRestaurant';
import { push } from 'connected-react-router';
import { routes } from '../Router';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
        const token = window.localStorage.getItem('token')

        if (!token) {
           this.props.redirectLogin() 
        }
        
        // depois lembrar de checar se tem id
        if (token && this.props.getRestaurantDetail) {
            this.props.getRestaurantDetail(1)
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
        const object = this.state.cart.filter(productSelecioned => {
            return product.id === productSelecioned.product.id
        })

        return object[0]
    }

    hasProductAddInCart = (product) => {
        return this.getQuantityByProductInCart(product) || false
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
            <div>
                <p> {this.props.restaurant.name} </p>
                <p> {this.props.restaurant.category} </p>
                <p> {this.props.restaurant.deliveryTime} </p>
                <p> {this.props.restaurant.shipping} </p>
                <p> {this.props.restaurant.address} </p>
                
                <Dialog
                    open={this.state.open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle>
                        Selecione a quantidade desejada
                    </DialogTitle>
                    <DialogContent>
                        <select id="quant" onChange={this.onChangeQuantity} value={this.state.value}>
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
                        </select>
                    </DialogContent>
                    <DialogActions>
                        <button onClick={() => this.addInCart()}> 
                            ADICIONAR AO CARRINHO 
                        </button>
                    </DialogActions>
                
                </Dialog>

                { productsForCategoryMap && [...productsForCategoryMap].map((element) => {
                    return (
                        <div>
                            <h3> {element[indexForNameAtributte.nameCategory]} </h3>

                            { element[indexForNameAtributte.products].map(product => {
                                return (
                                    <div>
                                        { this.state.cart.length > 0 && this.hasProductAddInCart(product) ? (this.getQuantityByProductInCart(product)).quantity : '' }
                                        <li>{product.name} | {product.description} | R${product.price} </li>
                                        { this.state.cart.length > 0 && this.hasProductAddInCart(product) ? <button onClick={() => this.removeProductInCart(product)}> remover </button> : <button onClick={() => this.addProduct(product)}> adicionar </button>}
                                    </div>
                                )
                            }) }

                        </div>
                    )

                })}

            </div>

        )
    }
}

const mapStateToProps = state => ({
    restaurant: state.restaurants.restaurantDetailed
})

const mapDispatchToProps = (dispatch) => ({
    redirectLogin: () => dispatch(push(routes.loginPage)),
    getRestaurantDetail: (id) => dispatch(getRestaurantDetail(id)),
    setCart: (cart) => dispatch(setCart(cart))
})

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantPage)
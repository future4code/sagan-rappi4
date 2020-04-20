import React, { Fragment } from "react";
import styled from "styled-components"
import { connect } from "react-redux";
import { getAddress, placeOrder } from "../../actions/cartPageAction"
import { push } from "connected-react-router";
import TopBar from '../../Components/TopBar'
import BottomNavigationBar from '../../Components/BottomNavigation'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { setCurrentPage, setShowMenu } from "../../actions/menuAction"
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { setCart } from '../../actions/detailRestaurant';

const token = window.localStorage.getItem('token')

const Wrapper = styled.div`
    margin-bottom: 72px;
`
const ItemCart = styled.div`
    border: 1px solid #b8b8b8;
    border-radius: 8px;
    width: 90%;
    height: 112px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 9px;
    display: flex;
`
const PhotoProduct = styled.img`
    width: 97px;
    height: 100%;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
`
const FormPayment = styled.form`
    display:flex;
    flex-direction: column;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    p{
        font-size: 16px;
        margin-bottom: 6px;
    }
`
const WrapperAddress = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    height: 76px;
    background-color: #eeeeee;
    padding-left: 5%;
    padding-bottom: auto;
    padding-top: auto;
    p{
        color: #b8b8b8;
        margin: 0;
    }
`
const CartWrapper = styled.div`
    p{
        display:flex;
        justify-content: center;
    }
`

const Quantity = styled.div`
    width: 33px;
    height: 33px;
    border: 1px solid red;
    border-bottom-left-radius: 8px;
    border-top-right-radius: 8px;
    margin-right: 0;
    display: flex;
    color: red;
    & p{
        margin: auto;
    }
`
const NewArea = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`
const ItemDescription = styled.div`
    width: 85%;
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    height: 112px;
    position: absolute;
    & :nth-child(2){
        color: red;
        margin: 0;
        margin-top: -13px;
        margin-left: 96px;
        display: flex;
        justify-content: left;
    };
    & :nth-child(3){
        color: #b8b8b8;
        font-size: 14px;
        margin: 0;
        margin-top: 6px;
        font-size: 14px;
        width: 198px;
        height: 19px;
        display: flex;
        justify-content: left;
        margin-top: 6px;
        margin-left: 96px;
    };
    & :nth-child(4){
        font-size: 16px;
        width: 108px;
        height: 19px;
        margin: 0;
        margin-top: 23px;
        margin-left: 96px;
    };

`
const ButtonRemove = styled.div`
    color: red;
    margin: 0;
    width: 90px;
    height: 31px;
    border-radius: 8px;
    border-bottom-left-radius: 0;
    border-top-right-radius: 0;
    border: solid 1px red;
    display: flex;
    align-self: flex-end;
    margin-top: -26px;
    & p{
        margin: auto;
    };
`
const QuatityAlign = styled.div`
    width: 100%;
    display:flex;
    align-items: right;
    justify-content: flex-end;
`
const WrapperPrice = styled.div`
    display:flex;
    flex-direction: column;
    margin: 5%;
    margin-bottom: 0;
    & :nth-child(1){
        display: flex;
        justify-content: flex-end;
    };
    & :nth-child(2){
        display:flex;
        justify-content: space-between;
        & :nth-child(2){
            color:red;
        }
    };
`
const LineH = styled.div`
    width: 100%;
    border-top: 1px solid black;
`

class cartPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            payment: undefined,
            showTopBar: true,
            showTextField: true,
            showFilterBar: true,
            showBottomNavigation: true,
            showTopBarTitle: 'Meu carrinho',
            showSearchPage: true,
            showBackButton: false
        }
    }

    componentDidMount() {
        this.props.getAddress(token)
        this.props.setCurrentPage("cart")
        this.props.setShowMenu(true)
    }

    showAddress = () => {
        if (this.props.address !== undefined) {
            return (<Fragment>{this.props.address.street},{this.props.address.number}</Fragment>)
        } else {
            return (
                <div>Carregando...</div>
            )
        }
    }

    handlePaymentChange = (payment) => {
        this.setState({ payment: payment })
    }

    handleConfirmOrder = (e) => {
        e.preventDefault()
        const restaurantId = this.props.cart.restaurant.id
        const products = this.props.cart.orders
        this.props.placeOrder(token, restaurantId, products, this.state.payment)
    }

    showProductsCart = () => {
        if (this.props.cart.orders !== undefined) {
            return (
                this.props.cart.orders.map(prod => {
                    return (
                        <ItemCart>
                            <PhotoProduct src={prod.product.photoUrl} />
                            <ItemDescription>
                                <QuatityAlign>
                                    <Quantity><p>{prod.quantity}</p></Quantity>
                                </QuatityAlign>
                                <p>{prod.product.name}</p>
                                <div>{prod.product.description}</div>
                                <div>R${prod.product.price.toFixed(2)}</div>
                                <NewArea>
                                    <ButtonRemove onClick={() => { this.removeProductInCart(prod.product.id) }}>
                                        <p>remover</p>
                                    </ButtonRemove>
                                </NewArea>
                            </ItemDescription>
                        </ItemCart>
                    )
                })
            )
        }
        else {
            return (
                <p>Carrinho vazio</p>
            )
        }

    }

    showRestaurant = () => {
        const { name, address, deliveryTime } = this.props.cart.restaurant
        return (
            <div>
                <p>{name}</p>
                <p>{address}</p>
                <p>{deliveryTime} min</p>
            </div>
        )
    }

    showPrice = () => {
        let totalPrice = 0
        const shipping = this.props.cart.restaurant !== undefined ? this.props.cart.restaurant.shipping : 0
        if (this.props.cart.orders !== undefined) {
            for (const order of this.props.cart.orders) {
                totalPrice = totalPrice + (order.quantity * order.product.price)
            }
        }
        return (
            <WrapperPrice>
                <p>Frete R${shipping.toFixed(2)}</p>
                <div> <p>SUBTOTAL</p> <p> R${(totalPrice + shipping).toFixed(2)} </p> </div>
            </WrapperPrice>
        )
    }

    removeProductInCart = (idProduct) => {
        const newCart = this.props.cart.orders.filter(order => {
            return (order.product.id !== idProduct)
        })
        let cart = {
            restaurant: this.props.cart.restaurant,
            orders: newCart
        }
        if (cart.orders.length === 0) {
            cart = {}
        }
        this.props.setCart(cart)
    }

    render() {
        const topBar = (
            <TopBar
                title={this.state.showTopBarTitle}
                returnButton={this.state.showBackButton ? <ArrowBackIosIcon onClick={this.renderFeedPage} fontSize='small' /> : ''}
            />
        )
        return (
            <Wrapper>
                {this.state.showTopBar ? topBar : ""}
                <WrapperAddress>
                    <p>Endereço de entrega</p>
                    {this.showAddress()}
                </WrapperAddress>
                <CartWrapper>
                    <div>
                        {this.props.cart.restaurant !== undefined ? this.showRestaurant() : false}
                    </div>
                    {
                        this.showProductsCart()
                    }
                </CartWrapper>
                <div>
                    {
                        this.showPrice()
                    }
                </div>
                <FormPayment onSubmit={this.handleConfirmOrder}>
                    <p>Forma de pagamento</p>
                    <LineH />
                    <RadioGroup aria-label="Gender" name="pagamento">
                        <FormControlLabel type="radio" name="pagamento" required={true} value="money" onClick={() => { this.handlePaymentChange("money") }} control={<Radio />} label="Dinheiro" />
                        <FormControlLabel type="radio" name="pagamento" required={true} value="creditcard" onClick={() => { this.handlePaymentChange("creditcard") }} control={<Radio />} label="Cartão de crédito" />
                    </RadioGroup>
                    <Button type="submit" variant="contained" color="primary" disabled={this.state.payment !== undefined ? false : true} >Confirmar</Button>
                </FormPayment>
            </Wrapper>
        )
    }
}

const mapStateToProps = state => {
    return {
        address: state.cart.address,
        cart: state.restaurants.cart
    }
}

const mapDispatchToProps = dispatch => ({
    getAddress: (token, restaurantId, products, paymentMethod) => dispatch(getAddress(token, restaurantId, products, paymentMethod)),
    placeOrder: (token, restaurantId, products, paymentMethod) => dispatch(placeOrder(token, restaurantId, products, paymentMethod)),
    setCurrentPage: (currentPage) => dispatch(setCurrentPage(currentPage)),
    setShowMenu: (show) => dispatch(setShowMenu(show)),
    setCart: (cart) => dispatch(setCart(cart))
})

export default connect(mapStateToProps, mapDispatchToProps)(cartPage);
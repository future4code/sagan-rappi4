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

//COLOCAR TOKEN DO LOCALSTORAGE GERADO PELO LOGIN
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlgwVGV0S0tkeVRoOW4zSFR6TENrIiwibmFtZSI6IkFuZHJpdXMiLCJlbWFpbCI6ImFuZHJpdXMucm9jaGFsYXphcmlub0BnbWFpbC5jb20iLCJjcGYiOiIxMTEuMTIxLjExMS0xMSIsImhhc0FkZHJlc3MiOnRydWUsImFkZHJlc3MiOiJBdi4gRHVxdWUgZGUgY2F4aWFzLCAxNzcsIDcxIC0gVmlsYSBOLiBDb25jZWnDp8OjbyIsImlhdCI6MTU4Njg2NjU2N30.erQsTxDL6Q6vDx8zGA1fIONJQVqNkLg-Qlz9VBfn4oM"

const ItemCart = styled.div`
    border: 1px solid #b8b8b8;
    border-radius: 8px;
    width: 90%;
    height: 112px;
    margin-left: auto;
    margin-right: auto;
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
    border-bottom: 1px solid red;
    border-left: 1px solid red;
    border-bottom-left-radius: 8px;
    margin-right:0;
`

const ItemDescription = styled.div`
    width: 100%;
`
const QuatityAlign = styled.div`
    width: 100%;
    display:flex;
    align-items: right;
    justify-content: flex-end;
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
        console.log(this.props.cart)
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
                                    <Quantity>{prod.quantity}</Quantity>
                                </QuatityAlign>
                                <p>{prod.product.name}</p>
                                <p>{prod.product.description}</p>
                                <p>{prod.product.price}</p>
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
        console.log(this.props.cart.restaurant)
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
        if (this.props.cart.orders !== undefined) {
            for (const order of this.props.cart.orders) {
                console.log(order.quantity)
            }
        }

        return (
            <div>
                <p>Frete R$0,00</p>
                <p>SUBTOTAL R$00,00</p>
            </div>
        )
    }

    render() {
        console.log(this.props.cart)
        const topBar = (
            <TopBar
                title={this.state.showTopBarTitle}
                returnButton={this.state.showBackButton ? <ArrowBackIosIcon onClick={this.renderFeedPage} fontSize='small' /> : ''}
            />
        )
        return (
            <div>
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
                    <RadioGroup aria-label="Gender" name="pagamento">
                        <FormControlLabel type="radio" name="pagamento" required={true} value="money" onClick={() => { this.handlePaymentChange("money") }} control={<Radio />} label="Dinheiro" />
                        <FormControlLabel type="radio" name="pagamento" required={true} value="creditcard" onClick={() => { this.handlePaymentChange("creditcard") }} control={<Radio />} label="Cartão de crédito" />


                    </RadioGroup>

                    {/* <p><input type="radio" name="pagamento" required={true} value="money" onClick={() => { this.handlePaymentChange("money") }} />Dinheiro</p>
                    <p><input type="radio" name="pagamento" required={true} value="creditcard" onClick={() => { this.handlePaymentChange("creditcard") }} />Cartão de crédito</p> */}
                    <Button type="submit" variant="contained" color="primary" disabled={this.state.payment !== undefined ? false : true} >Confirmar</Button>
                </FormPayment>
            </div>
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
    setShowMenu: (show) => dispatch(setShowMenu(show))
})

export default connect(mapStateToProps, mapDispatchToProps)(cartPage);
import React, { Fragment } from "react"
import styled from "styled-components"
import { connect } from "react-redux";
import { getProfile, getOrdersHistory } from "../../actions/profileAction"
import { setCurrentPage, setShowMenu } from "../../actions/menuAction"
import TopBar from '../../Components/TopBar'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const WrapperProfile = styled.div`
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    font-size: 16px;
`

const WrapperAddress = styled.div`
    background-color: #eeeeee;
    width: 100%;
    padding-top: 3px;
    padding-bottom: 3px;
    font-size: 16px;
    & p{
        width: 90%;
        margin-left: auto;
        margin-right: auto;
    };
    & :nth-child(1){
        color: #b8b8b8;
    }

`
const ItemOrder = styled.div`
    width: 90%;
    margin-top: 3px;
    margin-bottom: 3px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 5%;
    border: 1px solid #b8b8b8;
    border-radius: 8px;
    & :nth-child(1){
        font-size: 16px;
        color: #e86e5a;
    };
    & :nth-child(2){
        font-size: 12px;
        letter-spacing: -0.29px;
    };
    & :nth-child(3){
        font-size: 16px;
        font-weight: bold;
        font-stretch: normal;
    };
`

const WrapperOrders = styled.div`
    margin-bottom: 63px;
    & h3{
        margin-bottom: 3px;
        margin-left: 5%;
        font-size: 16px;
     font-weight: normal;
     font-stretch: normal;
     font-style: normal;
     line-height: normal;
    }
`
const LineH = styled.div`
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 6px;
    border-top: 1px solid black;
`

class profilePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profile: undefined,
            showTopBar: true,
            showTopBarTitle: 'Meu perfil'
        }
    }

    componentDidMount() {
        const token = window.localStorage.getItem('token')
        this.props.getProfile(token)
        this.props.getOrdersHistory(token)
        this.props.setCurrentPage("profile")
        this.props.setShowMenu(true)
    }

    showProfile = () => {
        const { name, email, cpf, address, hasAddress } = this.props.profile.user
        return (
            <div>
                <WrapperProfile>
                    <p>{name}</p>
                    <p>{email}</p>
                    <p>{cpf}</p>
                </WrapperProfile>
                <WrapperAddress>
                    <p>Endereço cadastrado</p>
                    <p>{hasAddress === true ? <Fragment>{address}</Fragment> : <Fragment>Seu endereço não está cadastrado</Fragment>}</p>
                </WrapperAddress>
            </div>
        )
    }

    showOrdersHistory = () => {
        return (
            <WrapperOrders>
                <h3>Histórico de pedidos</h3>
                <LineH />
                {this.props.orders.map(order => {
                    var date = new Date(order.createdAt)
                    return (<ItemOrder key={order.createdAt}> <p>{order.restaurantName}</p> <p> {date.toString()} </p> <p>SUBTOTAL R${order.totalPrice.toFixed(2)} </p></ItemOrder>)
                })}
            </WrapperOrders>
        )
    }

    render() {
        const topBar = (
            <TopBar
                title={this.state.showTopBarTitle}
                returnButton={this.state.showBackButton ? <ArrowBackIosIcon onClick={this.renderFeedPage} fontSize='small' /> : ''}
            />
        )
        return (
            <div>
                {this.state.showTopBar ? topBar : ""}

                {this.props.profile !== undefined ? this.showProfile() : <div>Carregando...</div>}

                {this.props.orders !== undefined ? this.showOrdersHistory() : <Fragment>Carregando...</Fragment>}

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        profile: state.profile.profile,
        orders: state.profile.orders
    }
}

const mapDispatchToProps = dispatch => ({
    getProfile: (token) => dispatch(getProfile(token)),
    setCurrentPage: (currentPage) => dispatch(setCurrentPage(currentPage)),
    setShowMenu: (show) => dispatch(setShowMenu(show)),
    getOrdersHistory: (token) => dispatch(getOrdersHistory(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(profilePage)
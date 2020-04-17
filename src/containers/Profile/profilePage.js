import React, { Fragment } from "react"
import styled from "styled-components"
import { connect } from "react-redux";
import { getProfile, getOrdersHistory } from "../../actions/profileAction"
import { setCurrentPage, setShowMenu } from "../../actions/menuAction"
import TopBar from '../../Components/TopBar'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlgwVGV0S0tkeVRoOW4zSFR6TENrIiwibmFtZSI6IkFuZHJpdXMiLCJlbWFpbCI6ImFuZHJpdXMucm9jaGFsYXphcmlub0BnbWFpbC5jb20iLCJjcGYiOiIxMTEuMTIxLjExMS0xMSIsImhhc0FkZHJlc3MiOnRydWUsImFkZHJlc3MiOiJBdi4gRHVxdWUgZGUgY2F4aWFzLCAxNzcsIDcxIC0gVmlsYSBOLiBDb25jZWnDp8OjbyIsImlhdCI6MTU4Njg2NjU2N30.erQsTxDL6Q6vDx8zGA1fIONJQVqNkLg-Qlz9VBfn4oM"

const WrapperProfile = styled.div`
    width: 90%;
    margin-left: auto;
    margin-right: auto;
`

const WrapperAddress = styled.div`
    background-color: #eeeeee;
    width: 100%;
    padding-top: 3px;
    padding-bottom: 3px;
    p{
        width: 90%;
        margin-left: auto;
        margin-right: auto;
    }
`
const ItemOrder = styled.div`
    width: 90%;
    margin-top: 3px;
    margin-bottom: 3px;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid #b8b8b8;
    border-radius: 8px;
`

const WrapperOrders = styled.div`
    margin-bottom: 63px;
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
                {this.props.orders.map(order => {
                    var date = new Date(order.createdAt)
                    return (<ItemOrder key={order.createdAt}> <p>{order.restaurantName}</p> <p> {date.toString()} </p> <p>SUBTOTAL R${order.totalPrice} </p></ItemOrder>)
                })}
            </WrapperOrders>
        )
    }

    render() {
        // console.log(this.props.profile)

        const topBar = (
            <TopBar
                title={this.state.showTopBarTitle}
                returnButton={this.state.showBackButton ? <ArrowBackIosIcon onClick={this.renderFeedPage} fontSize='small' /> : ''}
            />
        )

        console.log(this.props.orders)
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
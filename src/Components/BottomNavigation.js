import React from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import styled from 'styled-components'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import { connect } from "react-redux";
import { routes } from '../containers/Router/index';
import { push } from "connected-react-router";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import currentPage from "../actions/feedPageAction"

const BottomNavigationWrapper = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  margin: 0;
  padding: 0;
  border-top: 2px solid #d3d3d4 ;
`
const Progress = styled.div`
  position: absolute;
  margin-top: -118px;
  height: 118px;
  width: 100%;
  background-color: #e86e5a;
  display: flex;
`
const Time = styled(AccessTimeIcon)`
  color: white;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 16px;
  margin-right: 16px;
  font-size: 32px;
`

function showOrderProgress(orderProgress) {
  return (
    <Progress>
      <Time />
      <div>
        <p>Pedido em andamento</p>
        <p>{orderProgress.restaurantName}</p>
        <p>SUBTOTAL R${orderProgress.totalPrice.toFixed(2)}</p>
      </div>
    </Progress>
  )
}

function BottomNavigationBar(props) {
  const [value, setValue] = React.useState(props.currentPage);
  if (props.showMenu !== false) {
    return (
      <div>
        <BottomNavigationWrapper>
          {props.orderProgress === null ? false : showOrderProgress(props.orderProgress)}
          <BottomNavigation
            value={props.currentPage}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction value="feed" onClick={() => { props.goToFeed() }} icon={<HomeOutlinedIcon />} />
            <BottomNavigationAction value="cart" onClick={() => { props.goToCart() }} icon={<ShoppingCartOutlinedIcon />} />
            <BottomNavigationAction value="profile" onClick={() => { props.goToProfile() }} icon={<PermIdentityOutlinedIcon />} />
          </BottomNavigation>
        </BottomNavigationWrapper>
      </div>
    )
  } else {
    return false
  }
}

const mapStateToProps = state => {
  return {
    currentPage: state.menu.currentPage,
    showMenu: state.menu.showMenu,
    orderProgress: state.menu.orderProgress
  }
}

const mapDispatchToProps = dispatch => ({
  goToFeed: () => dispatch(push(routes.feedPage)),
  goToCart: () => dispatch(push(routes.cartPage)),
  goToProfile: () => dispatch(push(routes.profilePage)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BottomNavigationBar)


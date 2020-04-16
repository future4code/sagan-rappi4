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
import currentPage from "../actions/feedPageAction"

const BottomNavigationWrapper = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  margin: 0;
  padding: 0;
  border-top: 2px solid #d3d3d4 ;
`

function BottomNavigationBar(props) {
  console.log(props.currentPage)
  const [value, setValue] = React.useState(props.currentPage);

  if (props.showMenu !== false){
    return (
      <BottomNavigationWrapper>
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
    )
  }else{
    return false
  }
}

const mapStateToProps = state => {
  return {
    currentPage: state.menu.currentPage,
    showMenu: state.menu.showMenu
  }
}

const mapDispatchToProps = dispatch => ({
  goToFeed: () => dispatch(push(routes.feedPage)),
  goToCart: () => dispatch(push(routes.cartPage)),
  goToProfile: () => dispatch(push(routes.profilePage)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BottomNavigationBar)


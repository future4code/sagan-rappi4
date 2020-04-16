import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TextField } from '@material-ui/core'
import { getRestaurantsList } from '../../actions/feedPageAction'
import TopBar from '../../Components/TopBar'
import RestaurantFilterBar, { restaurantMap } from '../../Components/RestaurantFilterBar'
import BottomNavigationBar from '../../Components/BottomNavigation'
import styled from 'styled-components'
import InputAdornment from '@material-ui/core/InputAdornment';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SearchIcon from '@material-ui/icons/Search';
import {setCurrentPage, setShowMenu} from "../../actions/menuAction"
import SearchPage from './searchPage';

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  padding: 0 5vw;
`
const SearchMessage = styled.h4`
  display: flex;
  justify-content: center;
  margin: 0;
  padding-top: 8px;
`
const BottomDiv = styled.div`
  height: 10vh;
`
class feedPage extends Component {
  constructor() {
    super();
    this.state = {
      showTopBar: true,
      showTextField: true,
      showFilterBar: true,
      showBottomNavigation: true,
      showTopBarTitle: 'Rappi4',
      showSearchPage: {},
      showBackButton: false
    }
  }
  componentDidMount() {
    this.props.getPosts()
    this.props.setCurrentPage("feed")
    this.props.setShowMenu(true)
  }
  renderFeedPage = () => {
    this.setState({
      showTopBar: true,
      showTextField: true,
      showFilterBar: true,
      showBottomNavigation: true,
      showTopBarTitle: 'Rappi4',
      showSearchPage: {},
      showBackButton: false
    })
  }
  renderCartPage = () => {
    this.setState({
      showTopBar: true,
      showTextField: false,
      showFilterBar: false,
      showBottomNavigation: true,
      showTopBarTitle: 'Meu carrinho',
      showSearchPage: {},
      showBackButton: false
    })
  }
  renderProfilePage = () => {
    this.setState({
      showTopBar: true,
      showTextField: false,
      showFilterBar: false,
      showBottomNavigation: true,
      showTopBarTitle: 'Meu perfil',
      showSearchPage: {},
      showBackButton: false
    })
  }
  renderSearchPage = (event) => {
    this.setState({
      showTopBar: true,
      showTextField: true,
      showFilterBar: false,
      showBottomNavigation: true,
      showTopBarTitle: 'Busca',
      showSearchPage: { show: true, search: event ? event.target.value : '' },
      showBackButton: true
    })
  }
  renderBackButton = () => {
    this.setState({
      showBackButton: true,
      showSearchPage: {},
    })
  }
  render() {
    const topBar = (
      <TopBar
        title={this.state.showTopBarTitle}
        returnButton={this.state.showBackButton ? <ArrowBackIosIcon onClick={this.renderFeedPage} fontSize='small' /> : ''}
      />
    )
    const textField = (
      <TextField
        variant="outlined"
        placeholder="Restaurante"
        id="input-with-icon-textfield"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color='secondary'/>
            </InputAdornment>
          )
        }}
        value={this.state.showSearchPage.search || ''}
        onChange={this.renderSearchPage}
      />)
    const filterBar = (
      <RestaurantFilterBar />
    )
    const bottomNavigation = (
      <BottomNavigationBar
        showCart={this.renderCartPage}
        showFeed={this.renderFeedPage}
        showProfile={this.renderProfilePage}
      />
    )
    const searchList = (
      <SearchPage search={this.state.showSearchPage.search} />
    )
    return (
      <div>
        {this.state.showTopBar ? topBar : ""}
        <BodyWrapper>
          {this.state.showTextField ? textField : ""}
          {this.state.showFilterBar ? filterBar : ""}
          {this.state.showSearchPage.show ? searchList : ""}
        </BodyWrapper>
      </div>
    )
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getPosts: () => dispatch(getRestaurantsList()),
    setCurrentPage: (currentPage) => dispatch(setCurrentPage(currentPage)),
    setShowMenu: (show) => dispatch(setShowMenu(show))
  };
}
function mapStateToProps(state) {
  return {
    getMyRestaurants: state.restaurants.restaurantsList
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(feedPage);
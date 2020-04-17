import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRestaurantsList } from '../../actions/feedPageAction'
import { setCurrentPage, setShowMenu } from "../../actions/menuAction"
import { TextField } from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SearchIcon from '@material-ui/icons/Search';
import RestaurantFilterBar from '../../Components/RestaurantFilterBar'
import TopBar from '../../Components/TopBar'
import SearchPage from './searchPage'
import styled from 'styled-components'

const GlobalWrapper = styled.div`
  margin: 0;
  padding: 0;
  background-color: #ffffff;
  height: 100vh;
`
const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  padding: 0 5vw;
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
      showTopBarTitle: 'Rappi4',
      showSearchPage: {},
      showBackButton: false
    })
    this.props.setShowMenu(true)
  }
  renderCartPage = () => {
    this.setState({
      showTopBar: true,
      showTextField: false,
      showFilterBar: false,
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
      showTopBarTitle: 'Busca',
      showSearchPage: { show: true, search: event ? event.target.value : '' },
      showBackButton: true
    })
    this.props.setShowMenu(false)
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
              <SearchIcon color='secondary' />
            </InputAdornment>
          )
        }}
        value={this.state.showSearchPage.search || ''}
        onChange={this.renderSearchPage}
      />)
    const filterBar = (
      <RestaurantFilterBar />
    )
    const searchList = (
      <SearchPage search={this.state.showSearchPage.search} />
    )

    return (
      <GlobalWrapper>
        {this.state.showTopBar ? topBar : ""}
        <BodyWrapper>
          {this.state.showTextField ? textField : ""}
          {this.state.showSearchPage.show ? searchList : ""}
        </BodyWrapper>
        {this.state.showFilterBar ? filterBar : ""}
        <BottomDiv />
      </GlobalWrapper>
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
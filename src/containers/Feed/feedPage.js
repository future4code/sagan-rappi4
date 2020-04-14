import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRestaurantsList } from '../../Actions/feedPageAction'
import TopBar from '../../Components/TopBar'
import RestaurantFilterBar from '../../Components/RestaurantFilterBar'
import BottomNavigationBar from '../../Components/BottomNavigation'
import styled from 'styled-components'

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  width: 100vw;
`

class feedPage extends Component {

  componentDidMount() {
    this.props.getPosts()
  }

  render() {
    return (
      <div>
        <TopBar />
        <BodyWrapper>
          <input placeholder={'restaurante'}></input>
          <RestaurantFilterBar />

          {this.props.getMyRestaurants.map(element => {
          if (element.category === "Árabe") {
            return (
              
              <div key={element.id}>
                <p>
                  {element.name}
                </p>
              </div>
            )

          }
        })}


          {/* {this.props.getMyRestaurants.map(element => {
            return (
              <div key={element.id}>
                <p>
                  {element.name}
                </p>
              </div>
            )
          })} */}
          <BottomNavigationBar />
        </BodyWrapper>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: () => dispatch(getRestaurantsList()),
  };
}

function mapStateToProps(state) {
  return {
    getMyRestaurants: state.restaurants.restaurantsList
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(feedPage);

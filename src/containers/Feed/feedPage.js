import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRestaurantsList } from '../../Actions/feedPageAction'
import TopBar from '../../Components/TopBar'

class feedPage extends Component {

  componentDidMount() {
    this.props.getPosts()
  }

  render() {
    return (
      <div>
        <TopBar />
        <input placeholder={'restaurante'}></input>
        {this.props.getMyRestaurants.map(element => {
          return (
            <div key={element.id}>
              <p>
                {element.name}
              </p>
            </div>
          )
        })}
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

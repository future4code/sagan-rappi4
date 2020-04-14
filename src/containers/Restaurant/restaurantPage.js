import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { getRestaurantDetail } from '../../actions/detailRestaurant';
import { push } from 'connected-react-router';
import { routes } from '../Router';


class RestaurantPage extends Component {

    componentDidMount() {
        const token = window.localStorage.getItem('token')

        if (!token) {
           /*  this.props.redirectLogin() */
        }
        
        // depois lembrar de checar se tem id

        if (token && this.props.getRestaurantDetail) {
            this.props.getRestaurantDetail(1)
        }
    }

    render() {
        return (
            <div>
                <p> {this.props.restaurant.name} </p>
                <p> {this.props.restaurant.category} </p>
                <p> {this.props.restaurant.description} </p>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    restaurant: state.restaurant.restaurantDetailed
})

const mapDispatchToProps = (dispatch) => ({
    /* redirectLogin: () => dispatch(push(routes.loginPage)) */
    getRestaurantDetail: (id) => dispatch(getRestaurantDetail(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantPage)
import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { getRestaurantDetail } from '../../actions/detailRestaurant';


class DetailRestaurant extends Component {

    componentDidMount() {
        const token = window.localStorage.getItem('token')

        if (!token) {
            alert('Por favor, faça login')
        }

        if (token && this.props.getRestaurantDetail) {
            this.props.getRestaurantDetail(this.props.restaurant.id)
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
    getRestaurantDetail: (id) => dispatch(getRestaurantDetail(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailRestaurant)
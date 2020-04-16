import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'
import { getRestaurantsList } from '../actions/feedPageAction'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <div p={3}>{children}</div>}
    </Typography>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  }
}

function restaurantMap(restaurants) {
  return restaurants.map((element) => {
    return (
      <div key={element.id}>
        <p>{element.name}</p>
      </div>
    )
  })
}

function filterRestaurants(restaurants, categoryType) {
  return restaurants.filter((element) => element.category === categoryType)
}

function RestaurantFilterBar(props) {
  const restaurantCategories = props.getMyRestaurants.map((element) => {
    return element.category
  })

  const [value, setValue] = React.useState(undefined)
  const [showRestaurants, setShowRestaurants] = React.useState(
    props.getMyRestaurants
  )

  const handleChange = (event, newValue) => {
    if (value === undefined) {
      setValue(newValue)
      const category = restaurantCategories[newValue]
      setShowRestaurants(filterRestaurants(props.getMyRestaurants, category))

    } else if (value === newValue) {
      setValue(undefined)
      setShowRestaurants(filterRestaurants(props.getMyRestaurants))
    } else {
      setValue(newValue)
      const category = restaurantCategories[newValue]
      setShowRestaurants(filterRestaurants(props.getMyRestaurants, category))
    }
  }

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={value !== undefined ? value : false}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {props.getMyRestaurants.map((element) => {
            return <Tab label={element.category} {...a11yProps(element.id)} />
          })}
        </Tabs>
      </AppBar>

      {restaurantMap(
        showRestaurants.length === 0 ? props.getMyRestaurants : showRestaurants
      )}
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: () => dispatch(getRestaurantsList()),
  }
}

function mapStateToProps(state) {
  return {
    getMyRestaurants: state.restaurants.restaurantsList,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantFilterBar)

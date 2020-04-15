import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'
import { getRestaurantsList } from '../actions/feedPageAction'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

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
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

function restaurantMap(props, categoryType) {
  return (
    props.getMyRestaurants.map(element => {
      if (element.category === categoryType) {
        return (
          <div key={element.id}>
            <p>
              {element.name}
            </p>
          </div>
        )
      }
    })
  )
}

function RestaurantFilterBar(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Todas" {...a11yProps(0)} />
          <Tab label="Asiática" {...a11yProps(1)} />
          <Tab label="Massas" {...a11yProps(2)} />
          <Tab label="Carnes" {...a11yProps(3)} />
          <Tab label="Petiscos" {...a11yProps(4)} />
          <Tab label="Baiana" {...a11yProps(5)} />
          <Tab label="Sorvetes" {...a11yProps(6)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {props.getMyRestaurants.map(element => {
          return (
            <div key={element.id}>
              <p>
                {element.name}
              </p>
            </div>
          )

        })}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {restaurantMap(props, 'Asiática')}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {restaurantMap(props, 'Italiana')}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {restaurantMap(props, 'Carnes')}
      </TabPanel>
      <TabPanel value={value} index={4}>
        {restaurantMap(props, "Petiscos")}
      </TabPanel>
      <TabPanel value={value} index={5}>
        {restaurantMap(props, "Baiana")}
      </TabPanel>
      <TabPanel value={value} index={6}>
        {restaurantMap(props, "Sorvetes")}
      </TabPanel>
    </div>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantFilterBar)
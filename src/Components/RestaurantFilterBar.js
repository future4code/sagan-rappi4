import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'
import { getRestaurantsList } from '../Actions/feedPageAction'

// function DidMount() {
//   useEffect(() => getPosts(), []);
//   return null;
// }

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


function RestaurantFilterBar() {
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
          <Tab label="Burguer" {...a11yProps(0)} />
          <Tab label="Asiática" {...a11yProps(1)} />
          <Tab label="Massas" {...a11yProps(2)} />
          <Tab label="Saudável" {...a11yProps(3)} />
          <Tab label="Árabe" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {/* {this.props.getMyRestaurants.map(element => {
          if (element.category === "Árabe") {
            return (
              
              <div key={element.id}>
                <p>
                  {element.name}
                </p>
              </div>
            )

          }
        })} */}
      </TabPanel>
      <TabPanel value={value} index={1}>
        Asiática
      </TabPanel>
      <TabPanel value={value} index={2}>
        Massas
      </TabPanel>
      <TabPanel value={value} index={3}>
        Saudável
      </TabPanel>
      <TabPanel value={value} index={4}>
        Árabe
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
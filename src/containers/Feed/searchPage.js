import React from 'react';
import Paper from '@material-ui/core/Paper';
import { restaurantMap } from '../../Components/RestaurantFilterBar';
import styled from 'styled-components';
import { connect } from 'react-redux';

const PaperBox = styled(Paper)`
  min-height: 8vh;
  padding: 10px;
  > div {
    width: 100% !important;
    img {
      width: 100% !important;
    }
  }
`;
const SearchMessage = styled.h4`
  display: flex;
  justify-content: center;
  margin: 0;
  padding-top: 8px;
`;

function SearchPage(props) {
  const { restaurantList, search } = props;
  const defaultMessage = "Busque por nome de restaurante";
  let showList = search && search.length >= 3;
  let filteredList = [];
  let hasFiltered = false;
  let message = defaultMessage;
  if (showList) {
    filteredList = restaurantList.filter(restaurant => {
      const name = restaurant.name.toLowerCase()
      const desc = restaurant.description.toLowerCase()
      const lookup = search.toLowerCase()
      return name.includes(lookup) || desc.includes(lookup);
    });
    if (!filteredList || filteredList.length === 0) {
      showList = false;
      hasFiltered = false;
      message = "Não encontramos :(";
    } else {
      showList = true;
      hasFiltered = true;
      message = "";
    }
  }
  return (
    <PaperBox elevation={3}>
      {message && <SearchMessage>{message}</SearchMessage>}
      {hasFiltered && restaurantMap(filteredList)}
    </PaperBox>
  );
}

const mapState = (state) => ({
  restaurantList: state.restaurants.restaurantsList,
});

export default connect(mapState)(SearchPage);

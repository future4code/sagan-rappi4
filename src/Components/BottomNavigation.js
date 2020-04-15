import React from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import styled from 'styled-components'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';

const BottomNavigationWrapper = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  margin: 0;
  padding: 0;
`

export default function BottomNavigationBar(props) {
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigationWrapper>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction onClick={() => { props.showFeed() }} icon={<HomeOutlinedIcon />} />
        <BottomNavigationAction onClick={() => { props.showCart() }} icon={<ShoppingCartOutlinedIcon />} />
        <BottomNavigationAction onClick={() => { props.showProfile() }} icon={<PermIdentityOutlinedIcon />} />
      </BottomNavigation>
    </BottomNavigationWrapper>
  )
}

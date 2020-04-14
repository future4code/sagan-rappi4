import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import icon from '../../images/logo/logo-future-eats.svg'

const Splash = styled(Paper)`
  width: 100vw;
  height: 100vh;
  background-color: #e86e5a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

`
const Logo = styled.img`
  width: 100px;
  max-width:40vw;
`

function SplashLogo() {
  return (
    <Splash>
      <Logo src={icon} />
    </Splash>
  );
}

function withSplashScreen(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
      };
    }

    componentDidMount() {
      setTimeout(() => {
        this.setState({
          loading: false,
        });
      }, 1500)
    }

    render() {
        if (this.state.loading) return SplashLogo();
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default withSplashScreen;
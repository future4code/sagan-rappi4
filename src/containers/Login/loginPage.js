import React, { Component } from "react";
import Splash from './splashscreen';
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from '../Router';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import LogoInv from '../../images/logo/logo-future-eats-invert.svg'
import { Typography, Link } from "@material-ui/core";

const Wrapper = styled.div`
  margin: 20px auto;
  width: 400px;
  max-width: 95vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Title = styled(Typography)`
  letter-spacing: -0.39px;
  text-align: center;
`
const Form = styled.form`
  width: 95%;
`
const ContainerEl = styled.div`
  margin: 5vh 0;
`
const Logo = styled.img`
  margin: 7vh 0 3vh;
`
const Btn = styled(Button)`
  color: black;
  font-size: 0.95;
  text-transform: none;
`

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  render() {
    const { goToRegister } = this.props
    return (
      <Wrapper>
        <Logo src={LogoInv} />
        <Form>
          <Title variant="subtitle1">Login</Title>
          <ContainerEl>
            <TextField
              required
              id="email"
              label="Email"
              placeholder="email@email.com"
              InputLabelProps={{shrink: true}}
              value={this.state.email}
              variant="outlined"
              fullWidth={true}
            />
          </ContainerEl>
          <ContainerEl>
            <TextField
              required
              id="password"
              label="Senha"
              placeholder="Mínimo 6 caracteres"
              InputLabelProps={{shrink: true}}
              value={this.state.email}
              variant="outlined"
              fullWidth={true}
            />
          </ContainerEl>
          <Btn
            variant="contained"
            color="primary"
            type="submit"
            fullWidth={true}
          >
            Entrar
          </Btn>
        </Form>
        <ContainerEl>
          <Typography component="p">
            Não possui cadastro? <Link onClick={goToRegister}>Clique aqui.</Link>
          </Typography>
        </ContainerEl>
      </Wrapper>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    goToRegister: () => { console.log('register') }
  }
}
export default connect(null, mapDispatchToProps)(Splash(LoginPage))
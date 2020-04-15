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
import { doLogin } from '../../actions/Login/middleware';

//#region styled
const Wrapper = styled.div`
  margin: 20px auto;
  width: 400px;
  max-width: 95vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  a {
    cursor: pointer;
  }
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
//#endregion

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  componentDidMount() {
    const { userLogged, goToFeed, goToInformAddress } = this.props;
    if (userLogged) {
      if (userLogged.hasAddress) {
        goToFeed();
      } else {
        goToInformAddress();
      }
    }
  }

  handleChange = (event) => {
    const { id, value } = event.target;
    this.setState({ [id]: value })
  }

  handleLogin = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      alert('All fields are required!');
    } else {
      this.props.doLogin(this.state);
    }
  }

  render() {
    const { goToRegister } = this.props
    const { email, password } = this.state;
    return (
      <Wrapper>
        <Logo src={LogoInv} />
        <Form onSubmit={this.handleLogin}>
          <Title variant="subtitle1">Login</Title>
          <ContainerEl>
            <TextField
              required
              type="email"
              id="email"
              name="email"
              label="Email"
              placeholder="email@email.com"
              InputLabelProps={{shrink: true}}
              inputProps={{
                required: "required",
                pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
                title: "Insira um email válido",
              }}
              value={email}
              onChange={this.handleChange}
              variant="outlined"
              fullWidth={true}
            />
          </ContainerEl>
          <ContainerEl>
            <TextField
              required
              type="password"
              id="password"
              name="password"
              label="Senha"
              placeholder="Mínimo 6 caracteres"
              InputLabelProps={{shrink: true}}
              inputProps={{
                required: "required",
                pattern: "[A-Za-z0-9@#$%]{6,}", 
                title: "Mínimo 6 caracteres",
              }}
              value={password}
              onChange={this.handleChange}
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

function mapStateToProps(state) {
  return {
    userLogged: state.users.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    goToRegister: () => dispatch(push(routes.signUpPage)),
    goToFeed: () => dispatch(push(routes.feedPage)),
    goToInformAddress: () => dispatch(push(routes.informAddressPage)),
    doLogin: (login) => dispatch(doLogin(login))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash(LoginPage))
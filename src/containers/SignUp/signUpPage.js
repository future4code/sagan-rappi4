import React, { Component } from 'react';
import { signUp } from '../../actions/signUp';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { TextField, Typography, Button, Text } from '@material-ui/core/';
import LogoInv from '../../images/logo/logo-future-eats-invert.svg';
import TopBar from '../../Components/TopBar'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { push } from "connected-react-router";
import { routes } from '../Router';


// verificar senha e confirm senha
// colocar o olhinho pra mostrar a senha

const Wrapper = styled.div`
  margin: 0; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  a {
    cursor: pointer;
  }
`
const Logo = styled.img`
  margin: 3vh 0 1vh;
`
const Form = styled.form`
  width: 95%;
`
const Title = styled(Typography)`
  letter-spacing: -0.39px;
  text-align: center;
`
const Container = styled.div`
  margin: 4vh 0;
`
const Btn = styled(Button)`
  color: black;
  font-size: 0.95;
  text-transform: none;
`

const form = [
    {
        name: "name",
        type: "text",
        label: "Nome",
        placeholder: "Nome e sobrenome",
        pattern: "^[a-z-A-Z\\s]{3,}$",
        required: true,
    },
    {
        name: "email",
        type: "email",
        label: "E-mail",
        placeholder: "email@email.com",
        required: true,
    },
    {
        name: "cpf",
        type: "text",
        label: "CPF",
        placeholder: "000.000.000-00",
        pattern: "^[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-\[0-9]{2}$",
        required: true
    },
    {
        name: "password",
        type: "password",
        label: "Senha",
        placeholder: "Minimo 6 caracteres",
        pattern: "^.{6,}$",
        required: true,
    },
    {
        name: "confirmPassword",
        type: "password",
        label: "Confirmar",
        placeholder: "Confirme a senha anterior",
        pattern: "^.{6,}$",
        required: true,
    },
]

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {}
        }
    }

    handleOnChangeForm = (event) => {
        this.setState({
            form: {
                ...this.state.form,
                [event.target.name]: event.target.value
            }
        })
    }

    handleOnSubmit = (event) => {
        event.preventDefault()

        if (this.validPassword()) {
            this.props.signUp(this.state.form)
        }
    }

    validPassword = () => {
        if (this.state.form.password !== this.state.form.confirmPassword) {
            alert('Senhas diferentes!')

            return false
        }

        return true
    }

   

    render() {
        return (
            <Wrapper>
                <TopBar
                    title={this.state.showTopBarTitle}
                    returnButton={<ArrowBackIosIcon onClick={this.props.redirectToLogin} fontSize='small' />}
                /> 
                <Logo src={LogoInv} />
                <Form onSubmit={this.handleOnSubmit}>
                    <Title variant="subtitle1"> Cadastrar </Title>
                        {form.map(input => (
                            <Container key={input.name}>
                                <TextField
                                    label={input.label}
                                    required={input.required}
                                    type={input.type}
                                    name={input.name}
                                    placeholder={input.placeholder}
                                    onChange={this.handleOnChangeForm}
                                    fullWidth={true}
                                    variant="outlined"
                                    InputLabelProps={{shrink: true}}
                                    inputProps={{
                                        pattern: input.pattern,
                                    }}
                                />
                            </Container>
                        ))}
                        <Btn variant="contained" color="primary" type="submit" fullWidth={true}> Criar </Btn>
                </Form>
            </Wrapper>
        )
    }
}    

const mapDispatchToProps = dispatch => ({
    signUp: (formData) => dispatch(signUp(formData)),
    redirectToLogin: () => dispatch(push(routes.loginPage))
})

export default connect(null, mapDispatchToProps)(SignUp)
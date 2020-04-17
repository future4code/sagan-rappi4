import React, { Component } from 'react';
import { requestEditUser } from '../../actions/editUser';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { TextField, Typography, Button, Text } from '@material-ui/core/';
import LogoInv from '../../images/logo/logo-future-eats-invert.svg';
import TopBar from '../../Components/TopBar'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { push } from "connected-react-router";
import { routes } from '../Router';


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
const Logo = styled.img`
  margin: 7vh 0 3vh;
`
const Form = styled.form`
  width: 95%;
`
const Title = styled(Typography)`
  letter-spacing: -0.39px;
  text-align: center;
`
const Container = styled.div`
  margin: 5vh 0;
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
    }
]

class EditUser extends Component {
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
        this.props.requestEditUser(this.state.form)
    }

    render() {
        return (
            <Wrapper>
                <TopBar
                    title={this.state.showTopBarTitle}
                    returnButton={<ArrowBackIosIcon onClick={this.props.redirectToProfile} fontSize='small' />}
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
    requestEditUser: (formData) => dispatch(requestEditUser(formData)),
    redirectToProfile: () => dispatch(push(routes.profilePage))
})

export default connect(null, mapDispatchToProps)(EditUser)
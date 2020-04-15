import React, { Component } from 'react';
import { signUp } from '../../actions/signUp';
import { connect } from 'react-redux';


const form = [
    {
        name: "name",
        type: "text",
        label: "Nome",
        pattern: "^[a-z-A-Z\\s]{3,}$",
        required: true,
    },
    {
        name: "email",
        type: "email",
        label: "E-mail",
        required: true,
    },
    {
        name: "cpf",
        type: "text",
        label: "CPF",
        //pattern: "^[a-z-A-Z\\s]{3,}$",
        required: true,
    },
    {
        name: "password",
        type: "text",
        label: "Senha",
        pattern: "^[a-z-A-Z\\s]{3,}$",
        required: true,
    },
    {
        name: "confirmPassword",
        type: "text",
        label: "Confirmar",
        pattern: "^[a-z-A-Z\\s]{3,}$",
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

    handleOnSubmit = () => {
        alert('chegou aqui')
        this.props.signUp(this.state.form)
    }

    render() {
        return (
            <div onSubmit={this.handleOnSubmit}>
                <input type='text' name="name" placeholder="Nome do usuario" onChange={this.handleOnChangeForm}/> 
                <input type='text' name="email" placeholder="email" onChange={this.handleOnChangeForm}/> 
                <input type='text' name="cpf" placeholder="cpf" onChange={this.handleOnChangeForm}/> 
                <input type='text' name="password" placeholder="Senha" onChange={this.handleOnChangeForm}/> 
                <input type='text' name="confirmPassword" placeholder="Confirme senha" onChange={this.handleOnChangeForm}/> 
                <button onClick={() => this.handleOnSubmit()}> Criar </button>
            </div>

        )
    }
}    

const mapDispatchToProps = dispatch => ({
    signUp: (formData) => dispatch(signUp(formData))
})

export default connect(null, mapDispatchToProps)(SignUp)
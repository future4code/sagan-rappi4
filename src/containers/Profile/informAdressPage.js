import React, { Component } from "react";
import * as IAS from "./informAddressPageStyled";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from '../Router';
import { createAddress } from '../../Actions/ActionsSignUp'

import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import TopBar from "../../Components/TopBar";

class informAddressPage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      street: "R. Afonso Braz",
      number: "177",
      neighbourhood: "Vila N. Conceição",
      city: "São Paulo",
      state: "SP",
      complement: "71"
    };
  }

  handleFieldStreet = (event) => {
    this.setState({ street: event.target.value })
  };

  handleFieldNumber = (event) => {
    this.setState({ number: event.target.value })
  };

  handleFieldComplement = (event) => {
    this.setState({ complement: event.target.value })
  };

  handleFieldNeighbourhood = (event) => {
    this.setState({ neighbourhood: event.target.value })
  };

  handleFieldCity = (event) => {
    this.setState({ city: event.target.value })
  };

  handleFieldState = (event) => {
    this.setState({ state: event.target.value })
  };

  handleAddress = (event) => {
    event.preventDefault();
    
    const userAddress = {
      strett: this.state.street,
      number: this.state.number,
      neighbourhood: this.state.neighbourhood,
      city: this.state.city,
      state: this.state.state,
      complement: this.state.complement,
    }
    
    this.props.createAddress(userAddress)

  }


  render() {


    return (
      <div>
        <TopBar/>
          <IAS.FormAddressWrapper onSubmit={this.handleAddress}>
              <IAS.Title>Meu endereco</IAS.Title>

              <IAS.ContainerTextField>
                <TextField
                    required
                    id="filled-required"
                    label="Logradouro"
                    defaultValue="Rua / Av."
                    variant="outlined"
                    fullWidth={true}
                    value={this.state.street}
                    onChange={this.handleFieldStreet}
                    />
              </IAS.ContainerTextField>

              <IAS.ContainerTextField>
                <TextField
                    required
                    id="filled-required"
                    label="Número"
                    defaultValue="Número"
                    variant="outlined"
                    fullWidth={true}
                    value={this.state.number}
                    onChange={this.handleFieldNumber}
                    />
              </IAS.ContainerTextField>

              <IAS.ContainerTextField>
                <TextField
                    required
                    id="filled-required"
                    label="Complemento"
                    defaultValue="Complemento"
                    variant="outlined"
                    fullWidth={true}
                    value={this.state.complement}
                    onChange={this.handleFieldComplement}
                    />
              </IAS.ContainerTextField>

              <IAS.ContainerTextField>
                <TextField
                    required
                    id="filled-required"
                    label="Bairro"
                    defaultValue="Bairro"
                    variant="outlined"
                    fullWidth={true}
                    value={this.state.neighbourhood}
                    onChange={this.handleFieldNeighbourhood}
                    />
              </IAS.ContainerTextField>

              <IAS.ContainerTextField>
                <TextField
                    required
                    id="filled-required"
                    label="Cidade"
                    defaultValue="Cidade"
                    variant="outlined"
                    fullWidth={true}
                    value={this.state.city}
                    onChange={this.handleFieldCity}
                    />
              </IAS.ContainerTextField>

              <IAS.ContainerTextField>
                <TextField
                    required
                    id="filled-required"
                    label="Estado"
                    defaultValue="Estado"
                    variant="outlined"
                    fullWidth={true}
                    value={this.state.state}
                    onChange={this.handleFieldState}
                    />
              </IAS.ContainerTextField>

                <Button 
                    variant="contained" 
                    type="submit"
                    fullWidth={true}                    
                    >Salvar
                </Button>

          </IAS.FormAddressWrapper>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
    return{
      createAddress: (userAddress) => dispatch(createAddress(userAddress))
    }
}
export default connect(null, mapDispatchToProps) (informAddressPage)
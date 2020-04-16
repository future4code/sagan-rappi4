import React, { Component } from "react";
import * as IAS from "./informAdressPageStyled";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from '../Router';
import { createAddress } from '../../actions/ActionsSignUp'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import TopBar from "../../Components/TopBar";

class informAddressPage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      street: "",
      number: "",
      neighbourhood: "",
      city: "",
      state: "",
      complement: "",
      showBackButton: true
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
      street: this.state.street,
      number: this.state.number,
      neighbourhood: this.state.neighbourhood,
      city: this.state.city,
      state: this.state.state,
      complement: this.state.complement
    }
    
    this.props.createAddress(userAddress)

  }

  // goToHomePage = (event) => {
    
  // }


  render() {
    

    this.componentDidMount = () => {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InFhSzlGQVZ2QkttUGVhMkFHdnN0IiwibmFtZSI6IlZpdG9yTG9wZXMiLCJlbWFpbCI6ImxvcGVzc3NickBnbWFpbC5jb20iLCJjcGYiOiI5OTkuOTk5Ljk5OS05OSIsImhhc0FkZHJlc3MiOnRydWUsImFkZHJlc3MiOiJSLiBMb3JvLCAxNTI2LCAyMjMgLSBuYWRhIiwiaWF0IjoxNTg2ODkxODcwfQ.SRXANWnaclJIAj8SONM_IFwXk1-4q-y30RSCY4RqKQY"
      if( !token ){        
        this.props.goToHomePage()
      }
    }


    return (
      <div>
        <TopBar 
        title={"Meu endereço"} 
        returnButton={this.state.showBackButton ? <ArrowBackIosIcon fontSize='small' /> : ''}

        />
          <IAS.FormAddressWrapper onSubmit={this.handleAddress}>

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
      createAddress: (userAddress) => dispatch(createAddress(userAddress)),
      goToLoginPage: () => dispatch(push(routes.loginPage))
    }
}
export default connect(null, mapDispatchToProps) (informAddressPage)
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

  componentDidMount = () => {
    const token = window.localStorage.getItem('token')
    const { user } = this.props
    if( !token ){        
      this.props.goToHomePage()
    } else if (user.hasAddress) {
      this.props.goToFeedPage()
    }
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

function mapStateToProps(state){
  return{
    user: state.users.user
  }
}
function mapDispatchToProps(dispatch){
    return{
      createAddress: (userAddress) => dispatch(createAddress(userAddress)),
      goToHomePage: () => dispatch(push(routes.root)),
      goToFeedPage: () => dispatch(push(routes.feedPage)),

    }
}
export default connect(mapStateToProps, mapDispatchToProps) (informAddressPage)
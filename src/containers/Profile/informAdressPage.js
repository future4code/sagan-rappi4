import React, { Component } from "react";
import * as IAS from "./informAdressPageStyled";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from '../Router';

import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

class informAdressPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  render() {
    return (
      <div>
          <form>
              <IAS.Title>Meu endereco</IAS.Title>

              <IAS.ContainerTextField>
                <TextField
                    required
                    id="filled-required"
                    label="Logradouro"
                    defaultValue="Rua / Av."
                    variant="outlined"
                    fullWidth={true}
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
                    />
              </IAS.ContainerTextField>

                <Button 
                    variant="contained" 
                    type="submit"
                    fullWidth={true}
                    >Salvar
                </Button>

          </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
    return{

    }
}
export default connect(null, mapDispatchToProps) (informAdressPage)
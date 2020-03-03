import React from "react";
import axios from "axios";
import { Card } from "antd";
import ModifyCeForm from "../../components/currencyExchangeComponents/modifyCeForm";

class CurrencyExchangeDetail extends React.Component {
  state = {
    currency: {}
  };

  componentDidMount() {
    const currencyID = this.props.match.params.currencyID;
    axios.get(`http://127.0.0.1:8000/rest/currency/${currencyID}`).then(res => {
      this.setState({
        currency: res.data
      });
    });
  }

  isAvailable = varBool => {
    return varBool === true ? "Si" : "No";
  };

  render() {
    return (
      <>
        <h2>Tasa:</h2>
        <Card
          title={
            "Bolívar:" +
            this.state.currency.bs_exchange +
            " - Euro:" +
            this.state.currency.euro_exchange +
            " (" +
            this.state.currency.id +
            ")"
          }
        >
          <p>Fecha de la Tasa: {this.state.currency.date}</p>
          <p>Esta activo: {this.isAvailable(this.state.currency.is_Active)}</p>
          <p>Habilitado: {this.isAvailable(this.state.currency.availible)}</p>
        </Card>
        <br />
        <h2 style={{ marginLeft: 650 }}>Modificar Tasa:</h2>
        <ModifyCeForm currencyID={this.props.match.params.currencyID} />
      </>
    );
  }
}

export default CurrencyExchangeDetail;

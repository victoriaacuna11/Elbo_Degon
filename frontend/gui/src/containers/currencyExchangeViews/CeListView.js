import React from "react";
import axios from "axios";
import CurrencyExchanges from "../../components/currencyExchangeComponents/currencyExchanges";
import CeForm from "../../components/currencyExchangeComponents/ceForm";

class CurrencyExchangesList extends React.Component {
  state = {
    currencyExchanges: []
  };

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/rest/currency/").then(res => {
      this.setState({
        currencyExchanges: res.data
      });
    });
  }

  render() {
    return (
      <>
        <CurrencyExchanges data={this.state.currencyExchanges} />
        <br />
        <h2>Crear una Tasa de Cambio</h2>
        <CeForm currencyID={null} />
      </>
    );
  }
}

export default CurrencyExchangesList;

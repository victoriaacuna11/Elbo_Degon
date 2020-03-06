import React from "react";
import axios from "axios";
import { Card } from "antd";
import ModifyTaxForm from "../../components/taxComponents/modifyTaxForm";

class TaxDetail extends React.Component {
  state = {
    tax: {}
  };

  componentDidMount() {
    const taxID = this.props.match.params.taxID;
    axios.get(`http://127.0.0.1:8000/rest/tax/${taxID}`).then(res => {
      this.setState({
        tax: res.data
      });
      console.log(this.state.tax);
    });
  }

  isAvailable = bool => {
    return bool === true ? "Si" : "No";
  };

  render() {
    return (
      <>
        <h2>Impuesto:</h2>
        <Card
          title={
            "Valor: " + this.state.tax.tax + " -- Fecha: " + this.state.tax.date
          }
        >
          <p>Valor: {this.state.tax.tax}</p>
          <p>Fecha del impuesto: {this.state.tax.date}</p>
          <p>Esta activo: {this.isAvailable(this.state.tax.is_Active)}</p>
          <p>Habilitado: {this.isAvailable(this.state.tax.available)}</p>
        </Card>
        <br />
        <h2 style={{ marginLeft: 650 }}>Modificar Impuesto:</h2>
        <ModifyTaxForm taxID={this.props.match.params.taxID} />
      </>
    );
  }
}

export default TaxDetail;

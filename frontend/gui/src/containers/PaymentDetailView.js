import React from "react";
import axios from "axios";
import { Card } from "antd";

class paymentDetail extends React.Component {
  state = {
    payments: [],
    payment: {},
    payment: {},
    payment: {},
    local: {},


    payment:{}
  };

  componentDidMount() {
    const paymentID = this.props.match.params.paymentID;
    axios.get(`http://127.0.0.1:8000/rest/pay/${paymentID}`).then(res => {
      this.setState({
        payment: res.data
      });
    });
  }

  isAvailable = bool => {
    return bool === true ? "Si" : "No";
  };

  render() {
    return (
      <>
        <h2>Payment:</h2>
        {/* {this.matchingpayment()} */}
        <Card
          title={
            "ID del pago: " + this.state.payment.id 
          }
        >
          <p>Metodo de pago: {this.state.payment.payment_method}</p>
          <p>Moneda de pago: {this.state.payment.currency}</p>
          <p>Nombre del acreedor: {this.state.payment.account_holder}</p>
          <p>Numero de cuenta del acreedor: {this.state.payment.account_n}</p>
          <p>Monto: {this.state.payment.amount}$</p>
          <p>Habilitado: {this.isAvailable(this.state.payment.availible)}</p>
        </Card>
        <br />
        {/* <h2 style={{ marginLeft: 650 }}>Modificar payment:</h2>
        <ModifyPuForm paymentID={this.props.match.params.paymentID} /> */}
      </>
    );
  }
}

export default paymentDetail;
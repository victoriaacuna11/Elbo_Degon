import React from "react";
import axios from "axios";
import { Card } from "antd";
import ModifyPuForm from "../../components/pickupComponents/modifyPuForm";

class PickupDetail extends React.Component {
  state = {
    pickups: [],
    pickup: {},
    finalP: {},
    bill: {},
    local: {}
  };

  componentDidMount() {
    const pickupID = this.props.match.params.pickupID;
    axios.get(`http://127.0.0.1:8000/rest/pickup/${pickupID}`).then(res => {
      this.setState({
        pickup: res.data
      });
      axios
        .get(`http://127.0.0.1:8000/rest/bill/${this.state.pickup.bill_id}`)
        .then(res => {
          this.setState({
            bill: res.data
          });
        });

      axios
        .get(`http://127.0.0.1:8000/rest/local/${this.state.pickup.local}`)
        .then(res => {
          this.setState({
            local: res.data
          });
        });

      axios.get("http://127.0.0.1:8000/rest/wilfredo").then(res => {
        this.setState({
          pickups: res.data.data
        });
        console.log(this.state.pickups);
        this.state.finalP = this.state.pickups[this.state.pickup.id - 1];
        console.log(this.state.finalP);
      });
    });
  }

  isAvailable = bool => {
    return bool === true ? "Si" : "No";
  };

  render() {
    return (
      <>
        <h2>PickUp:</h2>
        {/* {this.matchingPickup()} */}
        <Card
          title={
            this.state.finalP.id +
            "- " +
            this.state.finalP.ci +
            " - " +
            this.state.finalP.date
          }
        >
          <p>Factura: {this.state.pickup.bill_id}</p>
          <p>Subtotal: {this.state.bill.subtotal}</p>
          <p>Nombre del cliente: {this.state.finalP.ci}</p>
          <p>Fecha: {this.state.finalP.date}</p>
          <p>Hora de pickup: {this.state.pickup.pick_up_time}</p>
          <p>Local del pickup: {this.state.finalP.local}</p>
          <p>Entregado: {this.isAvailable(this.state.pickup.delivered)}</p>
          <p>Habilitado: {this.isAvailable(this.state.pickup.availible)}</p>
        </Card>
        <br />
        <h2 style={{ marginLeft: 650 }}>Modificar pickup:</h2>
        <ModifyPuForm pickupID={this.props.match.params.pickupID} />
      </>
    );
  }
}

export default PickupDetail;

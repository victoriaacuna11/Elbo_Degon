import React from "react";
import axios from "axios";
import { Card } from "antd";
import ModifyDeliveryForm from "../../components/deliveryComponents/modifyDeliveryForm";

class DeliveryDetail extends React.Component {
  state = {
    deliverys: [],
    delivery: {},
    finalD: {},
    bill: {},
    employee: {},
    zone: {}
  };

  componentDidMount() {
    const deliveryID = this.props.match.params.deliveryID;
    axios.get(`http://127.0.0.1:8000/rest/delivery/${deliveryID}`).then(res => {
      this.setState({
        delivery: res.data
      });
      axios
        .get(`http://127.0.0.1:8000/rest/bill/${this.state.delivery.bill_id}`)
        .then(res => {
          this.setState({
            bill: res.data
          });
        });

      axios
        .get(
          `http://127.0.0.1:8000/rest/emp/${this.state.delivery.delivery_boy}`
        )
        .then(res => {
          this.setState({
            employee: res.data
          });
        });

      axios
        .get(`http://127.0.0.1:8000/rest/zone/${this.state.delivery.zone}`)
        .then(res => {
          this.setState({
            zone: res.data
          });
        });

      axios.get("http://127.0.0.1:8000/rest/vista_delivery").then(res => {
        this.setState({
          deliverys: res.data.data
        });
        console.log(this.state.deliverys);
        this.state.finalD = this.state.deliverys[this.state.delivery.id - 1];
        console.log(this.state.finalD);
      });
    });
  }

  isAvailable = bool => {
    return bool === true ? "Si" : "No";
  };

  render() {
    return (
      <>
        <h2>Delivery:</h2>
        <Card
          title={
            "CI del cliente:" +
            this.state.finalD.ci +
            " - " +
            "Fecha de delivery: " +
            this.state.finalD.date +
            " - " +
            "ID del delivery: " +
            this.state.finalD.id
          }
        >
          <p>Fecha del delivery: {this.state.finalD.date}</p>
          <p>Direccion para hacer el delivery: {this.state.delivery.address}</p>
          <p>Zona en la que se hace el delivery: {this.state.zone.name}</p>
          <p>Tiempo a realizar la entrega: {this.state.delivery.min_time}</p>
          <p>CI del cliente: {this.state.finalD.ci}</p>
          <p>Repartidor asignado: {this.state.employee.name}</p>
          <p>Entregado: {this.isAvailable(this.state.delivery.delivered)}</p>
          <p>Habilitado: {this.isAvailable(this.state.delivery.availible)}</p>
        </Card>
        <br />
        <h2 style={{ marginLeft: 650 }}>Modificar pickup:</h2>
        <ModifyDeliveryForm deliveryID={this.props.match.params.deliveryID} />
      </>
    );
  }
}

export default DeliveryDetail;

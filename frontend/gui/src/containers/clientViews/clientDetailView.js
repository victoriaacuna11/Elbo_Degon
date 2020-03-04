import React from "react";
import axios from "axios";
import { Card } from "antd";
import ModifyClientForm from "../../components/clientComponents/modifyClientForm";

class ClientDetail extends React.Component {
  state = {
    client: {},
    zone: {}
  };

  componentDidMount() {
    const clientID = this.props.match.params.clientID;
    axios.get(`http://127.0.0.1:8000/rest/client/${clientID}`).then(res => {
      this.setState({
        client: res.data
      });
      axios
        .get(`http://127.0.0.1:8000/rest/zone/${this.state.client.zone}`)
        .then(res => {
          this.setState({
            zone: res.data
          });
          console.log(this.state.zone);
        });
    });
  }

  isAvailable = bool => {
    return bool === true ? "Si" : "No";
  };

  render() {
    return (
      <>
        <h2>Cliente:</h2>
        <Card
          title={
            this.state.client.name +
            " " +
            this.state.client.last_name +
            " (" +
            this.state.client.id +
            ")"
          }
        >
          <p>C.I.: {this.state.client.ci}</p>
          <p>Zona asociada: {this.state.zone.name}</p>
          <p>Es miembro: {this.isAvailable(this.state.client.is_member)}</p>
          <p>Habilitado: {this.isAvailable(this.state.client.availible)}</p>
        </Card>
        <br />
        <h2 style={{ marginLeft: 650 }}>Modificar Cliente:</h2>
        <ModifyClientForm clientID={this.props.match.params.clientID} />
      </>
    );
  }
}

export default ClientDetail;

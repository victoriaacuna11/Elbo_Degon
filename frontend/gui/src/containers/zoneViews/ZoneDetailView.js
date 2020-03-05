import React from "react";
import axios from "axios";
import { Card } from "antd";
import ModifyZForm from "../../components/zoneComponents/modifyZoneForm";

class ZoneDetail extends React.Component {
  state = {
    zone: {}
  };

  componentDidMount() {
    const zoneID = this.props.match.params.zoneID;
    axios.get(`http://127.0.0.1:8000/rest/zone/${zoneID}`).then(res => {
      this.setState({
        zone: res.data
      });
    });
  }

  isAvailable = () => {
    return this.state.zone.availible === true ? "Si" : "No";
  };

  render() {
    return (
      <>
        <h2>Zona:</h2>
        <Card title={this.state.zone.name + " (" + this.state.zone.id + ")"}>
          <p>Costo: {this.state.zone.cost}</p>
          <p>Habilitado: {this.isAvailable()}</p>
        </Card>
        <br />
        <h2 style={{ marginLeft: 650 }}>Modificar Producto:</h2>
        <ModifyZForm zoneID={this.props.match.params.zoneID} />
      </>
    );
  }
}

export default ZoneDetail;

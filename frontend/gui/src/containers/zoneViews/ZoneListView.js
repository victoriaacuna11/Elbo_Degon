import React from "react";
import axios from "axios";
import Zones from "../../components/zoneComponents/zones";
import ZForm from "../../components/zoneComponents/zoneForm";

class ZoneList extends React.Component {
  state = {
    zones: []
  };

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/rest/zone/").then(res => {
      this.setState({
        zones: res.data
      });
    });
  }

  render() {
    return (
      <>
        <Zones data={this.state.zones} />
        <br />
        <h2>Crear una Zona</h2>
        <ZForm requestType="post" productID={null} buttonText="Crear" />
      </>
    );
  }
}

export default ZoneList;

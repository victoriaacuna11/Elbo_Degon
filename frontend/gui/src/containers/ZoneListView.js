import React from "react";
import axios from "axios";
import Zones from "../components/zones";


class ZoneList extends React.Component {
    state = {
      zones: [],
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
          <Zones data={this.state.zones}/>
          <br />
          {/* <h2>Crear un producto</h2>
          <PForm requestType="post" productID={null} buttonText="Crear" /> */}
        </>
      );
    }
  }
  
  export default ZoneList;
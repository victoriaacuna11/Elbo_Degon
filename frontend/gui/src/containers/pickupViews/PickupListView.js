import React from "react";
import axios from "axios";
import Pickup from "../../components/pickupComponents/pickup";

class PickupListView extends React.Component {
  state = {
    data: []
  };

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/rest/vista_pickup").then(res => {
      this.setState({
        data: res.data.data
      });
    });
  }

  render() {
    return (
      <>
        <Pickup data={this.state.data} />

        <br />
      </>
    );
  }
}

export default PickupListView;

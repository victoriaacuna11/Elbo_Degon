import React from "react";
import axios from "axios";
import Delivery from "../../components/deliveryComponents/delivery";

class DeliveryListView extends React.Component {
  state = {
    data: []
  };

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/rest/vista_delivery").then(res => {
      this.setState({
        data: res.data.data
      });
      console.log(this.state.data);
    });
  }

  render() {
    return (
      <>
        <Delivery data={this.state.data} />

        <br />
      </>
    );
  }
}

export default DeliveryListView;

import React from "react";
import axios from "axios";
import { Card } from "antd";
import Offer from "../components/ofert_list";

class Ofertas extends React.Component {
  state = {
    data: []
  };

  componentDidMount() {
    const productID = this.props.match.params.productID;
    axios.get('http://127.0.0.1:8000/rest/ofertas').then(res => {
      this.setState({
        data: res.data.data
      });
    });
  }

  render() {
    return (
      <>
        
        <Offer data={this.state.data}  />

      </>
    );
  }
}

export default Ofertas;
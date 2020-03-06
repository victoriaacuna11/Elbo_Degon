import React from "react";
import axios from "axios";
import Tax from "../../components/taxComponents/tax";
import TaxForm from "../../components/taxComponents/taxForm";

class TaxList extends React.Component {
  state = {
    data: []
  };

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/rest/tax/").then(res => {
      this.setState({
        data: res.data
      });
      console.log(this.state.data);
    });
  }

  render() {
    return (
      <>
        <Tax data={this.state.data} />

        <br />
        <h2>Crear un Impuesto</h2>
        <TaxForm productID={null} />
      </>
    );
  }
}

export default TaxList;

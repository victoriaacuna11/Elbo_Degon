import React from "react";
import axios from "axios";
import Providers from "../../components/providerComponents/providers";
import ProvForm from "../../components/providerComponents/providerForm";

class ProviderList extends React.Component {
  state = {
    providers: []
  };

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/rest/prov/").then(res => {
      this.setState({
        providers: res.data
      });
    });
  }

  render() {
    return (
      <>
        <Providers data={this.state.providers} />
        <br />
        <h2 style={{ marginLeft: 650 }}>Crear un proveedor</h2>
        <ProvForm />
      </>
    );
  }
}

export default ProviderList;

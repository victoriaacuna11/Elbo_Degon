import React from "react";
import axios from "axios";
import Clients from "../../components/clientComponents/clients";
import ClientForm from "../../components/clientComponents/clientForm";

class ClientList extends React.Component {
  state = {
    clients: []
  };

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/rest/client/").then(res => {
      this.setState({
        clients: res.data
      });
      console.log(this.state.clients);
    });
  }

  render() {
    return (
      <>
        <Clients data={this.state.clients} loading={false} hasMore={true} />
        <br />
        <h2 style={{ marginLeft: 650 }}>Crear un Cliente</h2>
        <ClientForm clientID={null} />
      </>
    );
  }
}

export default ClientList;

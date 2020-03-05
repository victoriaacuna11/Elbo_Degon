import React from "react";
import axios from "axios";
import { Card } from "antd";
import ModifyMemForm from "../../components/membershipComponents/modifyMemForm";

class MemDetail extends React.Component {
  state = {
    mems: [],
    mem: {},
    finalM: {},
    client: {}
  };

  componentDidMount() {
    const memID = this.props.match.params.memID;
    axios.get(`http://127.0.0.1:8000/rest/mem/${memID}`).then(res => {
      this.setState({
        mem: res.data
      });
      axios
        .get(`http://127.0.0.1:8000/rest/client/${this.state.mem.client}`)
        .then(res => {
          this.setState({
            client: res.data
          });
        });

      axios.get("http://127.0.0.1:8000/rest/qwill2").then(res => {
        this.setState({
          mems: res.data.data
        });
        console.log(this.state.mems);
        this.state.finalM = this.state.mems[this.state.mem.id - 1];
        console.log(this.state.finalM);
      });
    });
  }

  isAvailable = () => {
    return this.state.mem.availible === true ? "Si" : "No";
  };

  render() {
    return (
      <>
        <h2>Membresia:</h2>
        <Card
          title={
            this.state.client.name +
            " " +
            this.state.client.last_name +
            " (ID de la membresia: " +
            this.state.mem.id +
            ")"
          }
        >
          <p>C.I. del miembro: {this.state.client.ci}</p>
          <p>Zona en donde vive: {this.state.finalM.zone}</p>
          <p>Puntos acumulados: {this.state.mem.points}</p>
          <p>Telefono: {this.state.mem.phone}</p>
          <p>Genero: {this.state.mem.gender}</p>
          <p>Direccion: {this.state.mem.address}</p>
          <p>Cumpleanos: {this.state.mem.birth_date}</p>
          <p>E-mail: {this.state.mem.email}</p>
          <p>Fecha en que se registro: {this.state.mem.date_registered}</p>
          <p>Contrasena: {this.state.mem.password}</p>
          <p>Habilitado: {this.isAvailable()}</p>
        </Card>
        <br />
        <h2 style={{ marginLeft: 650 }}>Modificar Membresia:</h2>
        <ModifyMemForm memID={this.props.match.params.memID} />
      </>
    );
  }
}

export default MemDetail;

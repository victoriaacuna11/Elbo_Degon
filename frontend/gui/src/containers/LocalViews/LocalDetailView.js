import React from "react";
import axios from "axios";
import { Card } from "antd";
import ModifyLocForm from "../../components/localComponents/modifyLocForm";

class LocalDetail extends React.Component {
  state = {
    local: {},
    employee: {}
  };

  componentDidMount() {
    const localID = this.props.match.params.localID;
    axios.get(`http://127.0.0.1:8000/rest/local/${localID}`).then(res => {
      this.setState({
        local: res.data
      });
      axios
        .get(`http://127.0.0.1:8000/rest/emp/${this.state.local.manager}`)
        .then(res => {
          this.setState({
            employee: res.data
          });
          console.log(this.state.employee);
        });
    });
  }

  isAvailable = () => {
    console.log(this.state.local.availible);
    return this.state.local.availible === true ? "Si" : "No";
  };

  render() {
    return (
      <>
        <h2>Local:</h2>
        <Card
          title={this.state.local.address + " (" + this.state.local.id + ")"}
        >
          <p>Hora de apertura: {this.state.local.opening_time}</p>
          <p>Hora de clausura: {this.state.local.closing_time}</p>
          <p>
            Gerente del local:
            {this.state.employee.name + " " + this.state.employee.last_name} (
            {this.state.employee.id})
          </p>
          <p>Habilitado: {this.isAvailable()}</p>
        </Card>
        <br />
        <h2 style={{ marginLeft: 650 }}>Modificar Local:</h2>
        <ModifyLocForm localID={this.props.match.params.localID} />
      </>
    );
  }
}

export default LocalDetail;

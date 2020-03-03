import React from "react";
import axios from "axios";
import { Card } from "antd";
import ModifyEmpForm from "../../components/employeeComponents/modifyEmpForm";

class ProductDetail extends React.Component {
  state = {
    employee: {}
  };

  componentDidMount() {
    const employeeID = this.props.match.params.employeeID;
    axios.get(`http://127.0.0.1:8000/rest/emp/${employeeID}`).then(res => {
      this.setState({
        employee: res.data
      });
    });
  }

  isAvailable = () => {
    return (this.state.employee.availible = true ? "Si" : "No");
  };

  render() {
    return (
      <>
        <h2>Empleado:</h2>
        <Card
          title={
            this.state.employee.name +
            " " +
            this.state.employee.last_name +
            " (" +
            this.state.employee.id +
            ")"
          }
        >
          <p>CI: {this.state.employee.ci}</p>
          <p>Telefono: {this.state.employee.phone}</p>
          <p>Puntos: {this.state.employee.points}</p>
          <p>Direccion: {this.state.employee.adress}</p>
          <p>Genero: {this.state.employee.gender}</p>
          <p>Fecha de nacimiento: {this.state.employee.birth_date}</p>
          <p>Fecha de contratado: {this.state.employee.date_hired}</p>
          <p>Trabajo: {this.state.employee.job_id}</p>
          <p>Email: {this.state.employee.email}</p>
          <p>Habilitado: {this.isAvailable()}</p>
        </Card>
        <br />
        <h2 style={{ marginLeft: 650 }}>Modificar Empleado:</h2>
        <ModifyEmpForm employeeID={this.props.match.params.employeeID} />
      </>
    );
  }
}

export default ProductDetail;

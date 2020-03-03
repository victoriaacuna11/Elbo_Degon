import React from "react";
import axios from "axios";
import { Card } from "antd";
import ModifyMEForm from "../../components/monthEmpComponents/modifyMonthEmpForm";

class MEDetail extends React.Component {
  state = {
    mEmployee: {},
    employee: {}
  };

  componentDidMount() {
    const employeeID = this.props.match.params.employeeID;
    axios.get(`http://127.0.0.1:8000/rest/memp/${employeeID}`).then(res => {
      this.setState({
        mEmployee: res.data
      });
      axios
        .get(`http://127.0.0.1:8000/rest/emp/${this.state.mEmployee.employee}`)
        .then(res => {
          this.setState({
            employee: res.data
          });
        });
    });
  }

  isAvailable = () => {
    return this.state.mEmployee.availible === true ? "Si" : "No";
  };

  render() {
    return (
      <>
        <h2>Producto:</h2>
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
          <p>Mes: {this.state.mEmployee.month}</p>
          <p>Año: {this.state.mEmployee.year}</p>
          <p>Habilitado: {this.isAvailable()}</p>
        </Card>
        <br />
        <h2 style={{ marginLeft: 650 }}>Modificar Producto:</h2>
        <ModifyMEForm employeeID={this.props.match.params.employeeID} />
      </>
    );
  }
}

export default MEDetail;

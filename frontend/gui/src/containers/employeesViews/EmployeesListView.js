import React from "react";
import axios from "axios";
import Employees from "../../components/employeeComponents/employees";
import EmpForm from "../../components/employeeComponents/empForm";

class EmployeeList extends React.Component {
  state = {
    employees: []
  };

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/rest/emp/").then(res => {
      this.setState({
        employees: res.data
      });
    });
  }

  render() {
    return (
      <>
        <Employees data={this.state.employees} />
        <br />
        <h2>Crear un Empleado</h2>
        <EmpForm employeeID={null} />
      </>
    );
  }
}

export default EmployeeList;

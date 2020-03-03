import React from "react";
import axios from "axios";
import MonthEmployees from "../../components/monthEmpComponents/monthEmployees";
import MEForm from "../../components/monthEmpComponents/monthEmpForm";

class MonthEmployeeList extends React.Component {
  state = {
    employees: []
  };

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/rest/memp/").then(res => {
      this.setState({
        employees: res.data
      });
    });
  }

  render() {
    return (
      <>
        <MonthEmployees data={this.state.employees} />
        <br />
        <h2>Crear un Empleado del Mes</h2>
        <MEForm employeeID={null} />
      </>
    );
  }
}

export default MonthEmployeeList;

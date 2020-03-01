import React from "react";
import axios from "axios";
import MonthEmployees from "../components/monthEmployees";


class MonthEmployeeList extends React.Component {
    state = {
      employees: [],
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
          <MonthEmployees data={this.state.employees}/>
          <br />
          {/* <h2>Crear un producto</h2>
          <PForm requestType="post" productID={null} buttonText="Crear" /> */}
        </>
      );
    }
  }
  
  export default MonthEmployeeList;
import React from "react";
import axios from "axios";
import Bills from "../components/bills";


class BillList extends React.Component {
    state = {
      bills: [],
    };

    componentDidMount() {
      axios.get("http://127.0.0.1:8000/rest/bill/").then(res => {
        this.setState({
          bills: res.data
        });
      });
    }
  
    render() {
      return (
        <>
          <Bills data={this.state.bills}/>
          <br />
          {/* <h2>Crear un producto</h2>
          <PForm requestType="post" productID={null} buttonText="Crear" /> */}
        </>
      );
    }
  }
  
  export default BillList;

import React from "react";
import axios from "axios";
import Payments from "../components/payments";


class PaymentList extends React.Component {
    

    constructor(props){
      super(props);

      this.state = {
        payments: [],
      };

    }

    componentDidMount() {
      axios.get("http://localhost:8000/rest/pay/").then(res => {
        this.setState({
          ...this.state,
            payments: res.data
        });
        
      });
    }
  
    render() {
      return (
        <>
          <Payments data={this.state.payments}/>
          <br />
          {/* <h2>Crear un producto</h2>
          <PForm requestType="post" productID={null} buttonText="Crear" /> */}
        </>
      );
    }
  }
  
  export default PaymentList;
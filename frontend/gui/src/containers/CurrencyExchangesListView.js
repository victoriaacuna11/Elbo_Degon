import React from "react";
import axios from "axios";
import CurrencyExchanges from "../components/currencyExchanges";


class CurrencyExchangesList extends React.Component {
    state = {
      currencyExchanges: [],
    };

    componentDidMount() {
      axios.get("http://127.0.0.1:8000/rest/currency/").then(res => {
        this.setState({
            currencyExchanges: res.data
        });
      });
    }
  
    render() {
      return (
        <>
          <CurrencyExchanges data={this.state.currencyExchanges}/>
          <br />
          {/* <h2>Crear un producto</h2>
          <PForm requestType="post" productID={null} buttonText="Crear" /> */}
        </>
      );
    }
  }
  
  export default CurrencyExchangesList;
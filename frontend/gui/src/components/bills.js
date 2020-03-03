import React from "react";
import axios from "axios";
import { List} from "antd";
import { fixControlledValue } from "antd/lib/input/Input";


class Bills extends React.Component {

  state = {
    client: [],
    tax: [],
  };

  getCI = (clients, clientID) => {
      return clients.filter( c => (
        c.id == clientID
      ))[0].ci;
  }

  getTotal = (tax, subtotal) => {
    const taxSelected = tax.filter( t => (
      t.is_Active == true
    ))[0].tax;
    console.log(subtotal * (1+taxSelected))
    const num = subtotal * (1+taxSelected)
    return (num.toFixed(2))
  }
    componentDidMount(){
      // const id = this.props.data.client;
      // console.log(id);
      axios.get('http://127.0.0.1:8000/rest/client/').then(res => {
        this.setState({
          client: res.data
        });
        console.log(this.state.client)
      });

      axios.get('http://127.0.0.1:8000/rest/tax/').then(res => {
        this.setState({
          tax: res.data
        });
        console.log(this.state.tax)
      });
    }

      render(){
        return (
          <div className="demo-infinite-container">
              <h2>Facturas</h2>
              <List
                dataSource={this.props.data}
                renderItem={item => (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      title={<a href={`bill/${item.id}`}> 
                      C.I. Cliente: {this.getCI(this.state.client, item.client)} (Fecha compra: {item.date_time}) Total: {this.getTotal(this.state.tax, item.subtotal)}
                      </a>}
                    />
                  </List.Item>
                )}
              >
            </List>
        </div>
        );
      };
    } 

export default Bills;
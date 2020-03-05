import React from "react";
import axios from "axios";
import { List} from "antd";
import { fixControlledValue } from "antd/lib/input/Input";


class Bills extends React.Component {

  state = {
    ci_tot:[],
  };

  componentDidMount(){
    axios.get('http://127.0.0.1:8000/rest/query_Bill_Client/').then(res => {
      this.setState({
        ci_tot: res.data.data
      });
      console.log(this.state.ci_tot)
    });
  }

  getCI = (billID) => {
    return this.state.ci_tot.map(item => {
      if(item.id == billID){
        return item.cedula
      }
    })
  }

  getTotal = (billID) => {
    return this.state.ci_tot.map(item => {
      if(item.id == billID){
        return item.total
      }
    })
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
                      C.I. Cliente: {this.getCI(item.id)} (Fecha compra: {item.date_time}) Total: {this.getTotal(item.id)}$
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
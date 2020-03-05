import React from "react";
import axios from "axios";
import { Card, List } from "antd";

class BillDetail extends React.Component {

    state = {
      bill1:{},
      bill2:{},
      finalBill:{},
      client:{},
      products:[]
    };
  
    componentDidMount() {
      const billID = this.props.match.params.billID;
      axios.get(`http://127.0.0.1:8000/rest/bill/${billID}`).then(res => {
        this.setState({
          bill1: res.data
        });
        axios
          .get(`http://127.0.0.1:8000/rest/client/${this.state.bill1.client}`)
          .then(res => {
            this.setState({
              client: res.data
            });
          });
  
        axios.get(`http://127.0.0.1:8000/rest/detalle_fac/${billID}`).then(res => {
          this.setState({
            bill2: res.data.data
          });  

          this.setState({
            finalBill : this.state.bill2[0]
          
          });
          console.log(this.state.finalBill)
          console.log(this.state.finalBill.products)
    
        });
      });
    }
  
    isAvailable = (bool) => {
      return bool === true ? "Si" : "No";
    };


    fixBill2 = () =>{

    }
    
  
    render() {
      return (
        <>
          <h2>Factura:</h2>
          <Card
            title={
              "ID de la factura: " +
              this.state.finalBill.id +
              "--- Subtotal: " +
              this.state.finalBill.subtotal + " --- Cliente: " + this.state.finalBill.name + " " + this.state.finalBill.ln  
            }
          >
            <p>Tiene delivery: {this.isAvailable(this.state.bill1.is_delivery)}</p>
            <p>Fecha de la factura: {this.state.bill1.date_time}</p>

            <p>Productos comprados:</p>
            <List
                dataSource={this.state.finalBill.products}
                renderItem={item => (
                  <List.Item key={item.id} style={{ border: 0}}>
                    <p>-------->{ item.name + "-Cantidad: " + item.quantity}</p>
                  </List.Item>
                )}
                >
            </List>



  
            <p>Habilitado: {this.isAvailable(this.state.bill1.availible)}</p>
          </Card>
          <br />
        </>
      );
    }
  }
  

export default BillDetail;
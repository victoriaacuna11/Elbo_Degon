import React from "react";
import axios from "axios";
import { List } from "antd";
import InfiniteScroll from "react-infinite-scroller";
import { fixControlledValue } from "antd/lib/input/Input";

class Payments extends React.Component {

    state = {
        payment_bill_relationships: [],
        bills: [],
        clients: [],
        tax: [],
    }

    componentDidMount(){
        // Trae todos las facturas.
        axios.get('http://127.0.0.1:8000/rest/bill/').then(res => {
            this.setState({
            bills: res.data
            });
            // console.log(this.state.bills)
        });
        // Trae la relación Factura - Pago.
        axios.get('http://127.0.0.1:8000/rest/paybill/').then(res => {
            this.setState({
                payment_bill_relationships: res.data
            });
            // console.log(this.state.payment_bill_relationships)
        });
        // Trae todos los clientes
        axios.get('http://127.0.0.1:8000/rest/client/').then(res => {
            this.setState({
                clients: res.data
            });
            // console.log(this.state.clients)
        });
        axios.get('http://127.0.0.1:8000/rest/tax/').then(res => {
            this.setState({
            tax: res.data
            });
        });
    }

    // getCI = (paymentID, payment_bill_relationsips, bills, clients) => {
        
    //     // Una vez que sabe cuál es el ID de la factura asociada al pago, busca el id del cliente asociado a ella.
    //     const clientID = bills.filter(item => {
    //         item.id == billID
    //     })[0].client;
    //     console.log('ID cliente de la Bill: ' + clientID);
    //     // Con el id del cliente, busca los datos del cliente para encontrar la cédula.
    //     const ci = clients.filter( item => {
    //         item.id == clientID
    //     })[0].ci
    //     console.log('CI de la Bill: ' + ci)
        
    // }

    getBillID = (paymentID, payment_bill_relationsips) => {
        // Busca, en la tabla de Pago-Factura, cuál es la factura que está asociada al pago.
        const billID = payment_bill_relationsips.filter(item => (
            item.payment == paymentID
        ))[0].bill
        console.log('BillID: ' + billID);
        return billID;
    }

    getClientID = (billID, bills) => {
        // Una vez que sabe cuál es el ID de la factura asociada al pago, busca el id del cliente asociado a ella.
        const clientID = bills.filter(item => (
            item.id == billID
        ))[0].client;
        return clientID;
    }

    getClientCI = (clientID, clients) => {
        // Con el id del cliente, busca los datos del cliente para encontrar la cédula.
        const ci = clients.filter(item => (
            item.id == clientID
        ))[0].ci;
        return ci;
    }

    getTotal = (taxes, subtotal) => {
        
        const taxSelected = taxes.filter( t => (
            t.is_Active == true
        ))[0].tax;
        const total = subtotal*(1+taxSelected)
        return total.toFixed(2);
    }

    getSubtotal = (billID, bills) => {
        console.log(billID)
        return bills.filter( item => (
            item.id == billID
        ))[0].subtotal;
    }

    getHabilidado = (available) => {
        if(available){
            return 'Sí'
        } else {
            return 'No'
        }
    }

      render(){
        return (
          <div className="demo-infinite-container">
            <InfiniteScroll initialLoad={false} pageStart={0} useWindow={false}>
              <h2>Pagos</h2>
              <List
                dataSource={this.props.data}
                renderItem={item => (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      title={<a href={`pay/${item.id}`}>
                          Monto: {item.amount}$ - Método de pago: {item.payment_method} - Moneda: {item.currency} - 
                          Cliente CI: {this.getClientCI(this.getClientID(this.getBillID(item.id, this.state.payment_bill_relationships), this.state.bills), this.state.clients)} -  
                          Total Factura: {this.getTotal(this.state.tax, this.getSubtotal(this.getBillID(item.id, this.state.payment_bill_relationships), this.state.bills))}$ - 
                          Habilitado: {this.getHabilidado(item.availible)}
                      
                      </a>}
                    />
                  </List.Item>
                )}
              ></List>
            </InfiniteScroll>
          </div>
        );
      };
    } 

export default Payments;
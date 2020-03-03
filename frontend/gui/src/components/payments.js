import React from "react";
import axios from "axios";
import { List } from "antd";
import InfiniteScroll from "react-infinite-scroller";
import { fixControlledValue } from "antd/lib/input/Input";

class Payments extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ci_total: [],
        };
    }
    
    componentDidMount(){

        axios.get('http://127.0.0.1:8000/rest/query_pay_tot_ci/').then(res => {
            this.setState({
                ...this.state,
                ci_total: res.data.data
            })
            console.log(this.state.ci_total)
        })
    }

    getHabilidado = (available) => {
        if(available){
            return 'Sí'
        } else {
            return 'No'
        }
    }

    getCI=(paymentID)=>{
        return this.state.ci_total.map(item=>{
            if(item.id==paymentID){
                return item.cedula
            }
        })
    }

    getTotal=(paymentID)=>{
        return this.state.ci_total.map(item=>{
            if(item.id==paymentID){
                return item.total
            }
        })
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
                          Cliente CI: {this.getCI(item.id)} - Total Factura: {this.getTotal(item.id)}$ - 
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

    // getBillID(paymentID) {
    //     // Busca, en la tabla de Pago-Factura, cuál es la factura que está asociada al pago.
    //     const billID = this.state.payment_bill_relationships.filter(item => (
    //         item.payment === paymentID
    //     ));
    //     return billID[0].bill;
    // }


    // getClientID(billID) {
    //     // Una vez que sabe cuál es el ID de la factura asociada al pago, busca el id del cliente asociado a ella.
    //     const clientID = this.state.bills.filter(item => (
    //         item.id === billID
    //     ));
    //     return clientID[0].client;
    // }

    // getClientCI(clientID) {
    //     // Con el id del cliente, busca los datos del cliente para encontrar la cédula.
    //     const client = this.state.clients.filter(item => (
    //         item.id === clientID
    //     ));
    //     return client[0].ci;
    // }

    // getCI = (paymentID) => {
    //     const ci = this.state.ci_pay.map( item => {
    //         if(paymentID == item.paymentID){
    //             return item.ci;
    //         }
    //     })
    //     return ci;
        
    // }

    // // getTotal = (taxes, subtotal) => {
    // //     console.log(taxes)
    // //     const taxSelected = taxes.filter( t => (
    // //         t.is_Active == true
    // //     ))[0].tax;
    // //     const total = subtotal*(1+taxSelected)
    // //     return total.toFixed(2);
    // // }

    // // getSubtotal = (billID, bills) => {
    // //     console.log(billID)
    // //     return bills.filter( item => (
    // //         item.id == billID
    // //     ))[0].subtotal;
    // // }
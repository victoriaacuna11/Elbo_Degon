import React from "react";
import axios from "axios";
import { List } from "antd";
import InfiniteScroll from "react-infinite-scroller";
import { fixControlledValue } from "antd/lib/input/Input";

class Payments extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            payment_bill_relationships: [],
            bills: [],
            clients: [],
            tax: [],
            payments: [],
            ci_pay: [],
        };

        this.getBillID = this.getBillID.bind(this);
        this.getClientID = this.getClientID.bind(this);
        this.getClientCI = this.getClientCI.bind(this);
    }
    

    componentDidMount(){
        
        // Trae todos las facturas.
        axios.get('http://127.0.0.1:8000/rest/bill/').then(res => {
            this.setState({
                ...this.state,
                bills: res.data
            });
            // console.log(this.state.bills)
            axios.get('http://127.0.0.1:8000/rest/paybill/').then(res => {
                this.setState({
                    ...this.state,
                    payment_bill_relationships: res.data
                });
                // console.log(this.state.payment_bill_relationships)
                axios.get('http://127.0.0.1:8000/rest/client/').then(res => {
                    this.setState({
                        ...this.state,
                        clients: res.data
                    });
                    // console.log(this.state.clients)
                    axios.get('http://127.0.0.1:8000/rest/tax/').then(res => {
                        this.setState({
                            ...this.state,
                            tax: res.data
                        });

                        axios.get('http://127.0.0.1:8000/rest/pay/').then(res => {
                            this.setState({
                                ...this.state,
                                payments: res.data
                            });

                            // console.log(this.state.bills)
                            // console.log(this.state.payment_bill_relationships)
                            // console.log(this.state.clients)
                            // console.log(this.state.payments)
                            // console.log(this.state.tax)

                            const ci = this.state.payments.map( item => {
                                const billID = this.getBillID(item.id)
                                // console.log(billID);
                                const clientID = this.getClientID(billID);
                                // console.log(clientID)
                                const clientCI = this.getClientCI(clientID);
                                // console.log(clientCI);
                                return clientCI;
                            })
                            
                            const ci_pay = [];
                            this.state.payments.forEach((item, index) => {
                                const objeto = {
                                    paymentID: item.id,
                                    ci : ci[index]
                                }
                                ci_pay.push(objeto);
                            })
                            this.setState({
                                ...this.state,
                                ci_pay: ci_pay,
                            })



                            // console.log(this.state.ci_pay);

                        });
                    });
                });
            });
        });
    }



    getBillID(paymentID) {
        // Busca, en la tabla de Pago-Factura, cuál es la factura que está asociada al pago.
        const billID = this.state.payment_bill_relationships.filter(item => (
            item.payment === paymentID
        ));
        return billID[0].bill;
    }


    getClientID(billID) {
        // Una vez que sabe cuál es el ID de la factura asociada al pago, busca el id del cliente asociado a ella.
        const clientID = this.state.bills.filter(item => (
            item.id === billID
        ));
        return clientID[0].client;
    }

    getClientCI(clientID) {
        // Con el id del cliente, busca los datos del cliente para encontrar la cédula.
        const client = this.state.clients.filter(item => (
            item.id === clientID
        ));
        return client[0].ci;
    }

    getCI = (paymentID) => {
        const ci = this.state.ci_pay.map( item => {
            if(paymentID == item.paymentID){
                return item.ci;
            }
        })
        return ci;
        
    }

    // getTotal = (taxes, subtotal) => {
    //     console.log(taxes)
    //     const taxSelected = taxes.filter( t => (
    //         t.is_Active == true
    //     ))[0].tax;
    //     const total = subtotal*(1+taxSelected)
    //     return total.toFixed(2);
    // }

    // getSubtotal = (billID, bills) => {
    //     console.log(billID)
    //     return bills.filter( item => (
    //         item.id == billID
    //     ))[0].subtotal;
    // }

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
                dataSource={this.state.payments}
                renderItem={item => (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      title={<a href={`pay/${item.id}`}>
                          {/* {this.getBillID(item.id)} */}
                          Monto: {item.amount}$ - Método de pago: {item.payment_method} - Moneda: {item.currency} - 
                          Cliente CI: {this.getCI(item.id)} -  
                          {/* Total Factura: {this.getTotal(this.state.tax, this.getSubtotal(this.getBillID(item.id, this.state.payment_bill_relationships), this.state.bills))}$ -  */}
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
import React from "react";
import { Form, Input, Button, Select, InputNumber, TimePicker, List} from "antd";
import moment from 'moment';
import axios from "axios";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import CreatePaymentForm from './createPaymentForm';
import { Redirect } from 'react-router-dom'; 

const layout = {
  labelCol: {
    span: 11
  }
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 24, offset: 0 },
  },
};

const format = 'HH:mm';

const { Option } = Select;

const currencyLabel= "Moneda utilizada:"
const amountLabel= "Monto a pagar:"

class CreateBillForm extends React.Component {
  formRef = React.createRef();

  onReset = () => {
    this.formRef.current.resetFields();
  };

  constructor(props){
    super(props);
    this.state = {
      clients: [],
      products: [],
      productBatchs: [],
      categories: [],
      hasDelivery: false,
      zones: [],
      locals: [],
      hasProducts: false,
      productsSelected:[],
      quantitiesSelected:[],
      employees: [],
      amountCash:[],
      currencyCash:[],
      amountOnline: [],
      currencyOnline: [],
      accountHolder: [],
      accountNumber: [],   
      currentBill: {},
      create: false,
      billData: [],
      tax: [],

   };
    this.handleDelivery = this.handleDelivery.bind(this);
  }
  
  componentDidMount() {
    
    axios.get("http://127.0.0.1:8000/rest/client/").then(res => {
      this.setState({
          ...this.state.props,
          clients: res.data
        });
        // console.log(this.state.clients);
    });
    axios.get("http://127.0.0.1:8000/rest/query_productos_disp").then(res => {
      this.setState({
          ...this.state.props,
          products: res.data.data,
        });
        console.log(this.state.products);
    });
    axios.get("http://127.0.0.1:8000/rest/query_AddProductsToABill").then(res => {
      this.setState({
          ...this.state.props,
          productBatchs: res.data.data
        });
        // console.log(this.state.productBatchs);
    });
    axios.get("http://127.0.0.1:8000/rest/category/").then(res => {
      this.setState({
          ...this.state.props,
          categories: res.data
        });
        // console.log(this.state.categories);
    });
    axios.get("http://127.0.0.1:8000/rest/local/").then(res => {
      this.setState({
          ...this.state.props,
          locals: res.data
        });
        // console.log(this.state.locals);
    });
    axios.get("http://127.0.0.1:8000/rest/zone/").then(res => {
      this.setState({
          ...this.state.props,
          zones: res.data
        });
        // console.log(this.state.zones);
    });
    this.setState({
      ...this.state,
      hasDelivery: true
    })
    axios.get("http://127.0.0.1:8000/rest/empleados_disp").then(res => {
      this.setState({
          ...this.state.props,
          employees: res.data.data
        });
        // console.log(this.state.employees);
    });
    axios.get("http://127.0.0.1:8000/rest/taxAvailable").then(res => {
      this.setState({
          ...this.state.props,
          tax: res.data.data[0]
        });
        console.log(this.state.tax);
    });
  }

  handleProductAdd = (value, index) => {
    this.state.productsSelected[index] = value;

    this.setState({
      ...this.state,
      productsSelected: this.state.productsSelected
    })
  }
  
  handleQuantityAdd = (value, index) => {
    this.state.quantitiesSelected[index] = value;

    this.setState({
      ...this.state,
      quantitiesSelected: this.state.quantitiesSelected
    })
  }
  handleRemove(index){
    this.state.productsSelected.splice(index,1);
    this.state.quantitiesSelected.splice(index,1);
    this.setState({
      ...this.state,
      quantitiesSelected: this.state.quantitiesSelected,
      productsSelected: this.state.productsSelected
    })
  }

  isDisabled = (prod) => {
    var qty = 0;
    prod.lote.forEach( l => {
      qty= (qty+l.cant)
    })
    // console.log(qty)
    if(qty>0){
      return false
    } else {
      return true
    }
  }

  handleDelivery = value => {
    //  console.log(value);
      if(value){
        this.setState({
          ...this.state,
          hasDelivery: true
        })
      } else {
        this.setState({
          ...this.state,
          hasDelivery: false
        })
      }
      
   }

  isAvailable = (prodID, qty, stateProd) => {
    
    let batches = -1;
    var i=0;
    while(batches==-1){
      if(stateProd[i].id===prodID){
        batches=i;
      }
      i=i+1;
    }
    if(stateProd[batches].lote.length>0){
      if(qty>stateProd[batches].lote[0].cant){
        return false
      } else {
        return true;
      }
    } else {
      return false;
    }

  }

  getProductName=(id)=>{
    // console.log(id)
    let found = false;
    let indexP = -1;
    let i =0;
    while(found==false){
      if(id==this.state.products[i].id){
        indexP = i;
        found = true;
      }
      i=i+1;
    }
    return this.state.products[indexP].nombre
  }

  isAvailableAtLocal = (idLocal, idProd) =>{
    var productBatches = []
    this.state.productBatchs.forEach(batch => {
      if(batch.product==idProd){
        productBatches.push(batch);
      }
    })
    console.log(productBatches)
    var productBatchesAtLocal = []
    productBatches.forEach( batch => {
      if(batch.local==idLocal){
        productBatchesAtLocal.push(batch)
      }
    })
    console.log(productBatchesAtLocal)
    return productBatchesAtLocal; 
  }

  isQuantityAvailableAtLocal = (batchesAtLocal, qty, idProd) => {
    let found = false;
    let i = 0;
    while(found==false){
      if(batchesAtLocal[i][0].product==idProd){
        found=true;
        i=i-1;
      }
      i=i+1;
    }

    let prodName = this.getProductName(batchesAtLocal[i][0].product);
    if(batchesAtLocal[i][0].quan>=qty){
      return true;
    } else {
      alert('Solo tenemos ' +batchesAtLocal[i][0].quan+' '+ prodName +' disponibles en el local seleccionado. Lo sentimos.');
      return false;
    }
    
  }

  isThisProductMissing = (idProd, batchesAtLocal) => {
      let i = 0;
      let found = false;

      console.log('lenght: ' + batchesAtLocal.length)
      while(i<batchesAtLocal.length && found==false){
          if(batchesAtLocal[i][0].product==idProd){
            found=true;
          }
         i= i+1;
      }

      if(found==false){
        alert('No se encuentra disponible el/la ' + this.getProductName(idProd) + ' en el local elegido')
        return true;
      } else {
        return false;
      }
      
  }

  isThereAnyProductSelectedMoreThanOnce = (products) => {
      let isThere = false;
      let i =0;
      let j =0;
      while(i<products.length && isThere==false){
        j=i+1;
        while(j<products.length && isThere==false){
          if(products[i]==products[j]){
            isThere=true;
          }
          j=j+1;
        }
        i=i+1;
      }

      return isThere;
  }

  generateDelivery = (zone, address, time) => {
    let del = {
      zone: zone,
      address: address,
      delivery_boy: this.state.employees[0],
      min_time: time,
      delivered: false,
      availible: true,
      bill_id: null,
    }
    return del;
  }
  generatePickUp = (local, time) =>{
    let pickUp = {
      local: local,
      pick_up_time: time,
      delivered: false,
      availible: true,
      bill_id: null,
    }
    return pickUp;
  }
  generateBill = (clientID, hasDelivery, subtotal) => {
    let bill = {
      client: clientID,
      is_delivery: hasDelivery,
      date_time: moment(Date.now()).format(),
      subtotal: subtotal,
      availible: true,
    }
    return bill;
  }
  generateBatchesDelivery = (products, productsSelected, quantities) => {
    let batchSold = []
    productsSelected.forEach( (prod, index) => {
      let ind = this.getProdID(products, prod);
      let prodName = this.getProductName(prod);
      let batch = {
        prodID : prod,
        prodName: prodName,
        qty : quantities[index],
        batchID : products[ind].lote[0].id,
        batchPrice: products[ind].lote[0].price,
        batchDiscount: products[ind].lote[0].discount,
        batchActualQty: products[ind].lote[0].cant,
      }
      batchSold.push(batch);
    }) 
    console.log(batchSold);
    console.log(batchSold);
    return batchSold
  }
  generateBatchesPickUp = (batchesAtLocal, productsSelected, quantities) => {
    let batchSold = []
    productsSelected.forEach((prod,index) => {
      let ind = this.getIndexProductBatch(prod, batchesAtLocal);
      let prodName = this.getProductName(prod);
      let batch = {
        prodID: prod,
        prodName: prodName,
        qty: quantities[index],
        batchID: batchesAtLocal[ind][0].id,
        batchPrice: batchesAtLocal[ind][0].price,
        batchDiscount: batchesAtLocal[ind][0].sold,
        batchActualQty: batchesAtLocal[ind][0].quan,
      }
      batchSold.push(batch);
      console.log('BATCH SOLD OBJ')
      console.log(batch)
    })
    console.log('BATCH SOLD OBJ COMPLETICO')
    console.log(batchSold);
    return batchSold
  }
  getProdID = (products, prodID) =>{
    let i = 0;
    let found=false;
    while(found==false){
      if(products[i].id == prodID){
        found=true;
        i=i-1;
      }
      i=i+1;
    }
    return i;
  }
  getIndexProductBatch = (prodID, batchAtLocal) => {
    let i = 0;
    let found=false;
    while(found==false){
      if(batchAtLocal[i][0].product == prodID){
        found=true;
        i=i-1;
      }
      i=i+1;
    }
    return i;
  }
  generateSubtotal=(batches, deliveryZoneID)=>{
    let found = false;
    let i =0;
    let subtotal=0;
    // Si tiene delivery...
    if(deliveryZoneID>-1){
      while(found==false){
        if(this.state.zones[i].id==deliveryZoneID){
          found=true;
          subtotal=subtotal+this.state.zones[i].cost;
          i=i-1;
        }
        i=i+1;
      }
    } 
    
    batches.forEach(batch => {
      let add = ((batch.batchPrice)*(1-batch.batchDiscount)*batch.qty);
      subtotal = subtotal + add;
    })
    subtotal = subtotal.toFixed(2);
    return subtotal;
  }
  generateTotal=(subtotal, tax)=>{
    let t = ((subtotal*(1+tax)));
    t = t.toFixed(2);
    return t;
  }
  generateBatchPriceText = (batches, deliveryZoneID) =>{
    let text = '';
    let textBatches = [];
    batches.forEach(batch=>{
      text = ''+ batch.qty + 'x' + batch.prodName + '($' + batch.batchPrice + ' c/u)'
      if(batch.batchDiscount>0){
        text = text + <br/> +'DESCUENTO: -' + batch.batchDiscount+"%";
      }
      textBatches.push(text);
    })
    if(deliveryZoneID>-1){
      let found = false;
      let i =0;
      let cost = 0;
      while(found==false){
        if(this.state.zones[i].id==deliveryZoneID){
          found=true;
          cost = this.state.zones[i].cost
          i=i-1;
        }
        i=i+1;
      }
      text = 'Delivery: $' + cost;
      textBatches.push(text);
    }
    console.log(this.state.tax)
    var tax = (this.state.tax*100)
    tax = tax.toString();
    text = 'Impuesto: ' + tax +'%';
    textBatches.push(text);
    return textBatches;
  }

  // Métodos para tomar los valores del form iterativo de pagos.
  handleAmountCash = (value, index) => {
    this.state.amountCash[index] = value;

    this.setState({
      ...this.state,
      amountCash: this.state.amountCash
    })
  }
  handleCurrencyCash= (value, index) => {
    this.state.currencyCash[index] = value;

    this.setState({
      ...this.state,
      currencyCash: this.state.currencyCash
    })
  }
  handleAmountOnline = (value, index) => {
    this.state.amountOnline[index] = value;

    this.setState({
      ...this.state,
      amountOnline: this.state.amountOnline
    })
  }
  handleCurrencyOnline = (value, index) => {
    this.state.currencyOnline[index] = value;

    this.setState({
      ...this.state,
      currencyOnline: this.state.currencyOnline
    })
  }
  handleAccountHolderOnline = (value, index) => {
    this.state.accountHolder[index] = value.target.value;

    this.setState({
      ...this.state,
      accountHolder: this.state.accountHolder
    })
  }
  handleAccountNumberOnline = (value, index) => {
    this.state.accountNumber[index] = value.target.value;

    this.setState({
      ...this.state,
      accountNumber: this.state.accountNumber
    })
  }
  handleRemoveCash(index){
    this.state.currencyCash.splice(index,1);
    this.state.amountCash.splice(index,1);
    this.setState({
      ...this.state,
      currencyCash: this.state.currencyCash,
      amountCash: this.state.amountCash
    })
  }

  handleRemoveOnline(index){
    this.state.currencyOnline.splice(index,1);
    this.state.amountOnline.splice(index,1);
    this.state.accountHolder.splice(index,1);
    this.state.accountNumber.splice(index,1);
    this.setState({
      ...this.state,
      currencyOnline: this.state.currencyOnline,
      amountOnline: this.state.amountOnline,
      accountHolder: this.state.accountHolder,
      accountNumber: this.state.accountNumber,
    })
  }

  handleFormSubmit = (event) => {
      // event.preventDefault();
    var found = false; 
    const ci = JSON.stringify(event.clientCI);
    var i = 0;
    var clientID;
    while(i<this.state.clients.length && found==false){
      
      if(ci == JSON.stringify(this.state.clients[i].ci)){
        found=true;
        clientID = this.state.clients[i].id;
      }
      i = (i + 1);
    }
    // Valida que haya productos en la factura.
    if(this.state.hasProducts){
      // Valida que el cliente se registró.
      if(found){
        const time = moment(event.time).format("HH:mm");
        const delivery = event.hasDelivery;
        const products = this.state.productsSelected;
        const quantities = this.state.quantitiesSelected;
        //Valida que no haya  ningún producto repetido en diferentes campos.
        if(this.isThereAnyProductSelectedMoreThanOnce(products)==false){
        // Valida si tiene o no delivery. 
          if(delivery){
            const zoneID = event.zone;
            const addressID = event.address;
            var goToPayments = true;
            var j = 0;
            while(j<products.length && goToPayments==true){
              if(this.isAvailable(products[j], quantities[j], this.state.products)==false){
                  goToPayments=false;
              }
              j = (j+1)
            }
            // Valida si tiene la cantidad disponible.
            if(goToPayments){
              //Valida que haya empleados disponibles para hacer el delivery
              if(this.state.employees.length>0){
                
                const delivery = this.generateDelivery(zoneID, addressID, time);
                const pickUp = null;
                const batches = this.generateBatchesDelivery(this.state.products, products, quantities);
                const subtotal = this.generateSubtotal(batches, delivery.zone);
                const total = this.generateTotal(subtotal, this.state.tax);
                const billText = this.generateBatchPriceText(batches, delivery.zone);
                const bill = this.generateBill(clientID, true, subtotal)
                const billdata = {
                  delivery: delivery,
                  pickUp: pickUp,
                  batches: batches,
                  subtotal: subtotal,
                  total: total,
                  billText: billText,
                  bill: bill,
                }
                this.setState({
                  ...this.state,
                  billData: billdata,
                }, () => {
                  this.setState({
                    ... this.state,
                    create: true
                  })
                  console.log(this.state.billData)
                }
                )
              }else{
                alert('Lo sentimos, no hay nadie disponible en estos momentos para que realice su delivery.')
              }
            } else {
              var k = 0;
              var indexProdNotAvailable = -1;
              goToPayments=true;
              while(k<products.length && goToPayments==true){
                if(this.isAvailable(products[k], quantities[k], this.state.products)==false){
                    goToPayments=false;
                    indexProdNotAvailable = (k);
                }
                k = (k+1)
              }
              alert('No tenemos disponibles ' + quantities[indexProdNotAvailable] + ' ' + this.getProductName(products[indexProdNotAvailable]))
            }

          } else {
            // Para el caso de pickUp...
            const localID = event.local;
            var batchesAtLocal = [] 
            // var isThereBatchesAtLocal = false;
            products.forEach(prod => {
              var batches = this.isAvailableAtLocal(localID, prod)
              if(batches.length>0){
                batchesAtLocal.push(batches);
              }
            })
            console.log('BATCHES AT LOCAL')
            console.log(batchesAtLocal)
            if(batchesAtLocal.length==products.length){
              console.log('ESTA EN EL LOCAL')
              let availableAtLocal = true;
              var l = 0;
              while(l<batchesAtLocal.length && availableAtLocal==true){
                let av = this.isQuantityAvailableAtLocal(batchesAtLocal,quantities[l],products[l]);
                if(av==false){
                  availableAtLocal=false;
                }
                l=l+1;
              }
              // Si todo está disponible en el local.
              if(availableAtLocal){
                console.log('ALL GOOD')
                const delivery = null;
                const pickUp = this.generatePickUp(localID, time);
                const batches = this.generateBatchesPickUp(batchesAtLocal, products, quantities);
                console.log('BAAAATCH')
                console.log(batches)
                const subtotal = this.generateSubtotal(batches,-1);
                const total = this.generateTotal(subtotal, this.state.tax);
                const billText = this.generateBatchPriceText(batches,-1);
                const bill = this.generateBill(clientID, false, subtotal)
                const billdata = {
                  delivery: delivery,
                  pickUp: pickUp,
                  batches: batches,
                  subtotal: subtotal,
                  total: total,
                  billText: billText,
                  bill: bill,
                }
                this.setState({
                  ...this.state,
                  billData: billdata,
                }, () => {
                  this.setState({
                    ... this.state,
                    create: true
                  })
                  console.log(this.state.billData)
                }
                )

              }
            } else {
              console.log('NO ESTA EN EL LOCAL')
              let m = 0;
              found = false;

              while(found==false){
                if(products.length==1){
                  let name = this.getProductName(products[0])
                  found=true;
                  alert('No está disponible el/la '+ name +' en el local electo.')
                } else {
                  console.log('entro else')
                  if(this.isThisProductMissing(products[m], batchesAtLocal)){
                    found=true;
                  }
                }
                m=m+1;
              }
            }
            
          }
        } else {
          alert('Por favor, coloque la cantidad total del producto que desea adquirir en el mismo campo.')
        }
      } else {
        alert('La cédula que introdujo no está registrada. Por favor, regístrese primero como cliente.')
      }
  }else {
    alert('No ha agregado ningún producto.')
  }


  
  }

  showStyle = () => {
    return this.state.create === true? "none" : "block";
  }

  showPayments = () => {
    return this.state.create === true? "block" : "none";
  }

  handlePayments = (event) =>{
    var paymentsCash = [];
      // Construye el objeto payment y lo agrega al vector de payments de efectivo.
      this.state.currencyCash.forEach((item, index) => {
          const payment = {
            payment_method: 'Efectivo',
            currency: item,
            amount: this.state.amountCash[index],
            account_n: null,
            account_holder: null,
            availible: true,
          }
          paymentsCash.push(payment);
      })
      console.log('CASH')
      console.log(paymentsCash)
      var paymentsOnline = [];
      // Construye el objeto payment y lo agrega al vector de payments de online.
      this.state.currencyOnline.forEach((item, index) => {
        const payment = {
          payment_method: 'Online',
          currency: item,
          amount: this.state.amountOnline[index],
          account_n: this.state.accountNumber[index],
          account_holder: this.state.accountHolder[index],
          availible: true,
        }
        paymentsOnline.push(payment);
      
    })
    console.log('Online')
    console.log(paymentsOnline)
    if(paymentsCash.length==0 && paymentsOnline==0){
      alert('Tiene que añadir un pago.')
    } else {
      if(this.state.billData.total==this.getTotalPaid(paymentsOnline, paymentsCash)){
        // POSTEO
        axios.post("http://127.0.0.1:8000/rest/bill/", {
          client: this.state.billData.bill.client,
          is_delivery: this.state.billData.bill.is_delivery,
          date_time: this.state.billData.bill.date_time,
          subtotal: this.state.billData.bill.subtotal,
          availible: this.state.billData.bill.availible,
        })
        .then(res => {
          // Busco la factura que inserté.
          var bills = []
          var lastBill;
          axios.get("http://127.0.0.1:8000/rest/bill/").then(res => {
            bills = res.data;
            bills.forEach((bill,index)=>{
              if(index==(bills.length-1)){
                lastBill = bill;
              }
            })
            const currentBillID = lastBill.id;
            if(this.state.billData.bill.is_delivery){
              // Postear delivery o pickup
              axios.post("http://127.0.0.1:8000/rest/delivery/", {
                bill_id: currentBillID,
                address: this.state.billData.delivery.address,
                min_time: this.state.billData.delivery.min_time,
                delivery_boy: this.state.billData.delivery.delivery_boy,
                delivered: this.state.billData.delivery.delivered,
                zone: this.state.billData.delivery.zone,
                availible: this.state.billData.delivery.availible
              })
              .then(res => console.log(res))
              .catch(error => console.err(error));
            } else {
              axios.post("http://127.0.0.1:8000/rest/pickup/", {
                bill_id: currentBillID,
                local: this.state.billData.pickUp.local,
                pick_up_time: this.state.billData.pickUp.pick_up_time,
                delivered: this.state.billData.pickUp.delivered,
                availible: this.state.billData.pickUp.availible
              })
              .then(res => console.log(res))
              .catch(error => console.err(error));
            }
            
            // Relación con lotes de productos
            axios.get("http://127.0.0.1:8000/rest/pbatch").then(res => {
              const allBatches = res.data;
              var desiredQty;
              this.state.billData.batches.forEach( batch => {
                  desiredQty = batch.qty;
                  // Actualiza relación lote - producto.
                  axios.post("http://127.0.0.1:8000/rest/billp/", {
                    bill_id: currentBillID,
                    batch: batch.batchID,
                    quantity: batch.qty,
                    discount: batch.batchDiscount,
                    availible: true,
                  })
                  .then(res => console.log(res))
                  .catch(error => console.err(error));
                 
                  let batchID = batch.batchID;
                  let particularBatch = {};
                  axios.get(`http://127.0.0.1:8000/rest/pbatch/${batchID}/`).then(res => {
                    particularBatch = res.data;
                    let av = true;
                    var actual_quantity = (particularBatch.actual_quantity - desiredQty);
                    if(actual_quantity==0){
                      av=false;
                    }

                    axios.put(`http://127.0.0.1:8000/rest/pbatch/${batchID}/`, {
                      expiration_date : particularBatch.expiration_date,
                      elaboration_date : particularBatch.elaboration_date,
                      actual_quantity : actual_quantity,
                      quantity_sold : particularBatch.quantity_sold,
                      cost : particularBatch.cost,
                      discount : particularBatch.discount,
                      price : particularBatch.price,
                      point_cost : particularBatch.point_cost,
                      availible: av,
                      product: particularBatch.product,
                      local: particularBatch.local
                    })
                    .then(res => console.log(res))
                    .catch(error => console.err(error));


                    
                  },{ 
                        
                  //       
                  // }
                  }
                );


              })

            });
            
            // Añadir pagos.
            // Online
            paymentsOnline.forEach(pay => {

              axios.post("http://127.0.0.1:8000/rest/pay/", {
                payment_method: pay.payment_method,
                currency: pay.currency,
                amount: pay.amount,
                availible: pay.availible,
                account_n: pay.account_n,
                account_holder: pay.account_holder,
              })
              .then(res => {
                let payID = res.data.id;
                axios.post("http://127.0.0.1:8000/rest/paybill/", {
                  bill: currentBillID,
                  payment: payID,
                  availible: true,
                })

              })
              .catch(error => console.err(error));

            })
            //Efectivo
            paymentsCash.forEach(pay => {

              axios.post("http://127.0.0.1:8000/rest/pay/", {
                payment_method: pay.payment_method,
                currency: pay.currency,
                amount: pay.amount,
                availible: pay.availible,
                account_n: pay.account_n,
                account_holder: pay.account_holder,
              })
              .then(res => {
                let payID = res.data.id;
                axios.post("http://127.0.0.1:8000/rest/paybill/", {
                  bill: currentBillID,
                  payment: payID,
                  availible: true,
                })

              })
              .catch(error => console.err(error));

            })
            

          },
          );
        })
        .catch(error => console.error(error));
        
      } else {
        alert('El monto que introdujo no coincide con lo que ha de pagar')
      }
    }
  } 

  getTotalPaid = (paymentsOnline,paymentsCash, total) => {
      let paid = 0;
      paymentsOnline.forEach(pay => {
        paid = paid + pay.amount
      })
      paymentsCash.forEach(pay=>{
        paid = paid + pay.amount;
      })
      console.log('Paid ' + paid);
      return paid.toFixed(2);
  }

  render() {
    return (
      <div>
        <div style={{display: this.showStyle()}}>
        <h1>Crear una factura</h1>
          <Form
          {...layout}
          ref={this.formRef}
          name="form"
          onFinish={this.handleFormSubmit}
            >
            <Form.Item
              name="clientCI"
              rules={[{required: true}]}
              label="Cédula del cliente"
              key={this.state.currentBill.client}
              
              >
              <Input
                name="clientCI"
                placeholder="Cédula del cliente"
                style={{width:200}}
                />
            </Form.Item>

            {/* PRODUCTOS */}

            <Form.List name="formProducts" >
              { (fields, { add, remove }) => {
                return (
                  <div>
                    <h3>Productos</h3>
                    {fields.map((field, index) => (
                      <div key={'div'+field.key}>
                      <Form.Item
                        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                        label={index === 0 ? '':''}
                        required={true}
                        key={'product.'+field.key}
                      >
                        <Select 
                          onChange={(value) => this.handleProductAdd(value,index)}
                          style={{width:200}}
                          placeholder="Seleccione su producto"
                          optionFilterProp="children"
                          showSearch
                          filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                          >
                          {this.state.products.map(prod => (
                            <Option value={prod.id} key={prod.id} disabled={this.isDisabled(prod)}>
                              {prod.nombre}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                        <Form.Item
                          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                          label={index === 0 ? '':''}
                          required={true}
                          key={'quantity.'+field.key}
                          >
                          <InputNumber
                            placeholder="Cantidad del producto"
                            style={{width:200}}
                            min={1} max={10}
                            onChange={(value) => this.handleQuantityAdd(value,index)}
                          />
                        </Form.Item>
                        {fields.length > 1 ? (
                        <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => {
                              remove(field.name);
                              this.handleRemove(index)
                            }}
                        />
                        ) : null}
                      </div>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                          this.setState({
                            ...this.state,
                            hasProducts: true
                          })
                        }}
                        style={{ width: 200 }}
                      >
                        <PlusOutlined /> Añadir producto
                      </Button>
                    </Form.Item>
                  </div>
                );
              }}
            </Form.List>
            
            {/* DELIVERY O PICKUP */}
            <Form.Item
              name="hasDelivery"
              rules={[{required: true}]}
              label="¿Desea delivery?"
              key={this.state.currentBill.delivery}
              >
              <Select
                  placeholder="¿Desea delivery?"
                  name="hasDelivery"
                  style={{width:200}}
                  allowClear
                  onChange={this.handleDelivery}
                  >
                <Option value={false}>
                  No
                </Option>
                <Option value={true}>
                  Sí
                </Option>
                </Select>
            </Form.Item>

          {/* SI DESEA DELIVERY, SE MUESTRA ESTE FORM */}
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.hasDelivery !== currentValues.hasDelivery}
            >
            {({ getFieldValue }) => {
              return getFieldValue('hasDelivery') == true ? (
                // ZONA DELIVERY
                <div>
                  <h3>Delivery</h3>
                  {/* DIRECCIÓN */}
                  <Form.Item name="address" label="Dirección" rules={[{ required: true }]}>
                    <Input placeholder="Introduzca la dirección"
                      name="address"
                      style={{width:200}}
                      allowClear/>
                  </Form.Item>
                  <Form.Item name="zone" label="Zona" rules={[{ required: true }]}>
                    <Select
                      placeholder="Seleccione la zona"
                      name="zone"
                      style={{width:200}}
                      allowClear
                      >
                      {this.state.zones.map(zone => (
                        <Option value={zone.id} key={'zone.'+zone.id}>
                          {zone.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
          ) : <div>
                <h3>Pick Up</h3>
                <Form.Item name="local" label="Local" rules={[{ required: true }]}>
                <Select
                  placeholder="Seleccione el local"
                  name="local"
                  style={{width:200}}
                  allowClear
                  >
                  {this.state.locals.map(local => (
                    <Option value={local.id} key={local.id}>
                      {local.address}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
                </div>;
                
            }}
          </Form.Item>
          
            {/* HORA*/}
            <Form.Item name="time" label="Hora de la entrega/búsqueda" rules={[{ required: true }]}>
            <TimePicker name="timeime" format={format} style={{width:200}}/>
            </Form.Item>
            <br/><br/>
            
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{width:200}}>
                {this.props.buttonText}
              </Button>
            </Form.Item>
          </Form>
        </div>
        {/* PAGOS */}
        <div style={{display: this.showPayments()}}>
          <div>
            <h1>Detalle de factura emitida</h1>
          </div>
            <List
                dataSource={this.state.billData.billText}
                renderItem={item => (
                  <List.Item key={item}>
                    <List.Item.Meta
                      title={item}
                      
                    />
                  </List.Item>
                )}
                >
            </List>
          <div>
            <h3>Subtotal<br/>${this.state.billData.subtotal}</h3>
          </div>
          <div>
            <h2>Total<br/>${this.state.billData.total}</h2>
          </div>
            <h2>Añadir métodos de pago</h2>
            <Form
            {...layout}
            ref={this.formRef}
            name="formCash"
            >
            <Form.List name="formPaymentsCash" >
            { (fields, { add, remove }) => {
                return (
                    <div>
                        <h3>Pagos en efectivo</h3>
                        {fields.map((field, index) => (
                            <div key={'divCash'+field.key}>
                                
                                <Form.Item
                                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                    label={index === 0 ? '':''}
                                    required={true}
                                    key={'currencyCash.'+field.key}
                                >
                                    <Select 
                                    onChange={(value) => this.handleCurrencyCash(value,index)}
                                    style={{width:200}}
                                    placeholder="Moneda"
                                    >
                                        <Option value='Bolivares'>
                                            Bolivares
                                        </Option>
                                        <Option value='Dolares'>
                                            Dolares
                                        </Option>
                                        <Option value='Euros'>
                                            Euros
                                        </Option>
                                    </Select>
                                </Form.Item> 
                                <Form.Item
                                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                    label={index === 0 ? '':''}
                                    required={true}
                                    key={'amountCash.'+field.key}
                                    >
                                    <InputNumber
                                        placeholder="Monto a cancelar"
                                        style={{width:200}}
                                        min={0.01} 
                                        step={0.01}
                                        onChange={(value) => this.handleAmountCash(value,index)}
                                    />
                                </Form.Item>
                            {fields.length > 0 ? (
                                <MinusCircleOutlined
                                    className="dynamic-delete-button"
                                    onClick={() => {
                                    remove(field.name);
                                    this.handleRemoveCash(index);
                                    }}
                                />
                            ) : null}
                        </div>
                    ))}
                    <Form.Item>
                    <Button
                        type="dashed"
                        onClick={() => {
                        add();
                        this.setState({
                            ...this.state,
                            hasPayment: true,
                        })
                        }}
                        style={{ width: 200 }}
                    >
                        <PlusOutlined/> Añadir pago en efectivo
                    </Button>
                    </Form.Item>
                    </div>
                    )
                }}
            </Form.List>
        </Form>
        
        <Form
            {...layout}
            ref={this.formRef}
            name="formOnline"
            >
            <Form.List name="formPaymentsOnline" >
            { (fields, { add, remove }) => {
            return (
                <div>
                    <br/>
                    <h3>Pagos con transferencia online</h3>
                    {fields.map((field, index) => (
                        <div key={'divOnline'+field.key}>
                            <Form.Item
                                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                label={index === 0 ? '':''}
                                required={true}
                                key={'currencyOnline.'+field.key}
                                
                            >
                                <div>{currencyLabel}
                                <Select 
                                onChange={(value) => this.handleCurrencyOnline(value,index)}
                                style={{width:200}}
                                placeholder="Moneda"
                                >
                                    <Option value='Bolivares'>
                                        Bolivares
                                    </Option>
                                    <Option value='Dolares'>
                                        Dolares
                                    </Option>
                                    <Option value='Euros'>
                                        Euros
                                    </Option>
                                </Select>
                                </div>
                            </Form.Item> 
                            <Form.Item
                                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                label={index === 0 ? '':''}
                                required={true}
                                key={'amountOnline.'+field.key}
                                >
                                <div>{amountLabel}
                                <InputNumber
                                    placeholder="Monto a cancelar"
                                    style={{width:200}}
                                    min={1} 
                                    onChange={(value) => this.handleAmountOnline(value,index)}
                                />
                                </div>
                            </Form.Item>
                            <Form.Item label="Nro. de cuenta" rules={[{ required: true }]}>
                                 <Input placeholder="Introduzca el número de cuenta"
                                    style={{width:200}}
                                    allowClear
                                    onChange={(value) => this.handleAccountNumberOnline(value,index)}/>
                            </Form.Item>
                            <Form.Item label="Titular de la cuenta" rules={[{ required: true }]}>
                                <Input placeholder="Titular de la cuenta"
                                    style={{width:200}}
                                    allowClear
                                    onChange={(value) => this.handleAccountHolderOnline(value,index)}/>
                            </Form.Item>
                        {fields.length > 0 ? (
                            <MinusCircleOutlined
                                className="dynamic-delete-button"
                                onClick={() => {
                                remove(field.name);
                                this.handleRemoveOnline(index)
                                }}
                            />
                        ) : null}
                    </div>
                ))}
                <Form.Item>
                    <Button
                    type="dashed"
                    onClick={() => {
                        add();
                        this.setState({
                        ...this.state,
                        hasPayment: true,
                        })
                    }}
                    style={{ width: 200 }}
                    >
                    <PlusOutlined/> Añadir pago online
                    </Button>
                </Form.Item>
                </div>
                )
            }}
            </Form.List>
        </Form>
        <Button type="primary" htmlType="submit" style={{width:200}} onClick={this.handlePayments}>
            Pagar
        </Button>
    </div>
      </div>
    );
  }
}

export default CreateBillForm;


  //   handleFormSubmit = (event, requestType, productID) => {
  //     //event.preventDefault();
  //     const name = event.Nombre;
  //     const pasillo = event.Pasillo;
  //     const category = event.categoria;
  //     const provider = event.Proveedor;
  //     const availible = event.Available;
  //     console.log(requestType);
  
  //     switch (requestType) {
  //       case "post":
  //         console.log("entre");
  //         return axios
  //           .post("http://127.0.0.1:8000/rest/prod/", {
  //             provider: provider,
  //             product_name: name,
  //             category: category,
  //             hall: pasillo,
  //             availible: availible
  //           })
  //           .then(res => console.log(res))
  //           .catch(error => console.err(error));
  
  //       case "put":
  //         return axios
  //           .put(`http://127.0.0.1:8000/rest/prod/${productID}/`, {
  //             provider: provider,
  //             product_name: name,
  //             category: category,
  //             hall: pasillo,
  //             availible: availible
  //           })
  //           .then(res => console.log(res))
  //           .catch(error => console.err(error));
  //     }
  //   };
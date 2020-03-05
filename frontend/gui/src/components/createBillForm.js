import React from "react";
import { Form, Input, Button, Select, InputNumber, TimePicker} from "antd";
import moment from 'moment';
import axios from "axios";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

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

// const tailLayout = {
//   wrapperCol: {
//     offset: 0,
//     span: 0
//   }
// };



const { Option } = Select;

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

      currentBill: {},

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
              // isThereBatchesAtLocal=true;
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
          // Verifica que tenga todos los productos en en local pedido.
          
        }
      } else {
        alert('La cédula que introdujo no está registrada. Por favor, regístrese primero como cliente.')
      }
  }else {
    alert('No ha agregado ningún producto.')
  }
  
  }

 

  
  render() {
    return (
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
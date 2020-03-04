import React, {useState} from "react";
import { Form, Input, Button, Select, InputNumber, TimePicker} from "antd";
import moment from 'moment';
import axios from "axios";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import FormItem from "antd/lib/form/FormItem";


function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}

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

const tailLayout = {
  wrapperCol: {
    offset: 0,
    span: 0
  }
};



const { Option } = Select;

// function onChange(value) {
//   console.log("changed", value);
// }



class CreateBillForm extends React.Component {
  formRef = React.createRef();

  // onFinish = values => {
  //   console.log(values);
  // };

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
      // productsByCategory: [],
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
    axios.get("http://127.0.0.1:8000/rest/prod/").then(res => {
      this.setState({
          ...this.state.props,
          products: res.data,
          productsByCategory: res.data,
        });
        // console.log(this.state.products);
    });
    axios.get("http://127.0.0.1:8000/rest/pbatch/").then(res => {
      this.setState({
          ...this.state.props,
          productBatchs: res.data
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

  handleRemove(index){
    this.state.productsSelected.splice(index,1);
    this.state.quantitiesSelected.splice(index,1);
    this.setState({
      ...this.state,
      quantitiesSelected: this.state.quantitiesSelected,
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
    
    if(this.state.hasProducts){
      if(found){
        const time = moment(event.time).format("HH:mm");
        const delivery = event.hasDelivery;
        // console.log(clientID);
        // console.log(this.state.hasDelivery)
        // console.log(time);
        // console.log(delivery);
        if(delivery){
          const zoneID = event.zone;
          const addressID = event.address;
          const products = this.state.productsSelected;
          const quantities = this.state.quantitiesSelected;
          console.log(products); 
          console.log(quantities);
          // console.log('DELIVERY')
          // console.log(zoneID)
          // console.log(addressID)
        } else {
          const localID = event.local;
          // console.log('LOCAL')
          // console.log(localID)
        }
      } else {
        alert('La cédula que introdujo no está registrada. Por favor, regístrese primero como cliente.')
      }
  }else {
    alert('No ha agregado ningún producto.')
  }
      
  }

  onFinish = values => {
    console.log('Received values of form:', values);
  }; 

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

  // handleAddProduct = value => {
  //   this.setState({
  //     ...this.setState.actualProd = 
  //   })
  // }
  
  
  render() {
    return (
      <Form
      {...layout}
      ref={this.formRef}
      name="form"
      onFinish={this.handleFormSubmit}
      // onFinish={this.onFinish}
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
                    // name={'product.'+field.key}
                  >
                    <Select 
                      onChange={(value) => this.handleProductAdd(value,index)}
                      style={{width:200}}
                      placeholder="Seleccione su producto"
                      // name="productName"
                      optionFilterProp="children"
                      onSearch={onSearch}
                      showSearch
                      filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                      // key={'product.'+field.key}
                      >
                      {this.state.productsByCategory.map(prod => (
                        <Option value={prod.id} key={prod.id}>
                          {prod.product_name} (Precio)$
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                    <Form.Item
                      {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                      label={index === 0 ? '':''}
                      required={true}
                      key={'quantity.'+field.key}
                      // name={'quantity.'+field.key}
                      >
                      <InputNumber
                        // name="quantity"
                        placeholder="Cantidad del producto"
                        style={{width:200}}
                        min={1} max={10}
                        onChange={(value) => this.handleQuantityAdd(value,index)}
                        // key={'quantity.'+field.key}
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
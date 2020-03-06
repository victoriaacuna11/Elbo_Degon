import React from "react";
import { Form, Input, Button, Select, InputNumber} from "antd";
import axios from "axios";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import FormItem from "antd/lib/form/FormItem";

const layout = {
  labelCol: {
    span: 11
  }
};

const currencyLabel= "Moneda utilizada:"
const amountLabel= "Monto a pagar:"
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

class CreatePaymentForm extends React.Component {
  formRef = React.createRef();

  onReset = () => {
    this.formRef.current.resetFields();
  };

  constructor(props){
    super(props);
    this.state = {
      bill:{},
      products: [],
      quantity: [],
      hasOnlinePayment: false,
      hasCashPayment: false,
      amountCash:[],
      currencyCash:[],
      amountOnline: [],
      currencyOnline: [],
      accountHolder: [],
      accountNumber: [],
   };
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
    this.state.accountHolder[index] = value;

    this.setState({
      ...this.state,
      accountHolder: this.state.accountHolder
    })
  }
  handleAccountNumberOnline = (value, index) => {
    this.state.accountNumber[index] = value;

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

  componentDidMount() {
    
    axios.get("http://127.0.0.1:8000/rest/bill/:id").then(res => {
      this.setState({
          ...this.state.props,
          bill: res.data
        });
        // console.log(this.state.clients);
    });
    
  }

  
  handleFormSubmit = () => {
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
    if(paymentsOnline.length==0 && paymentsCash.length==0){
        alert('Por favor, introduzca un método de pago')
    } else {
        console.log(paymentsCash);
        console.log(paymentsOnline);
    }
    
  }

  
  render() {
    return (
        <div>
            <h2>Métodos de pago</h2>
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
                                        min={1} max={this.state.bill.total}
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
                                    min={1} max={this.state.bill.total}
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
        <Button type="primary" htmlType="submit" style={{width:200}} onClick={this.handleFormSubmit}>
            Pagar
        </Button>
    </div>
    )
  }
} 
    
export default CreatePaymentForm;


import React from "react";
import { Form, Input, Button, Select, InputNumber, Radio } from "antd";
import axios from "axios";

const { Option } = Select;

const layout = {
  labelCol: {
    span: 11
  }
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16
  }
};

function onChange(value) {
  console.log("changed", value);
}

class CreateBillForm extends React.Component {
  formRef = React.createRef();

  onFinish = values => {
    console.log(values);
  };

  onReset = () => {
    this.formRef.current.resetFields();
  };

  state = {
     clients: [],
     currentBill: {},
  };

  componentDidMount() {
    
    axios.get("http://127.0.0.1:8000/rest/client/").then(res => {
      this.setState({
          ...this.state.props,
          clients: res.data
        });
        console.log(this.state.clients);
      });
  }

  handleFormSubmit = (event, clients) => {
    //   event.preventDefault();
      const ci = event.clientCI;
      const ciFound = clients.filter(item => (
        item.ci == ci
      ));
      console.log(clients);
      console.log(ci);
      console.log(ciFound.length);
      
      // if(ciFound.length==0){
      //     alert("La cédula de este cliente no está registrada. Regístrela para poder realizar una compra.")
      // } else {
      //      console.log('Encontrada: ' + ci)
      // }
      
  }

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

  render() {
    return (
      <Form
        {...layout}
        ref={this.formRef}
        name="control-ref"
        onFinish={event =>
          this.handleFormSubmit(
            event, this.state.clients
          )
        }
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
          />
        </Form.Item>
          
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {this.props.buttonText}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default CreateBillForm;
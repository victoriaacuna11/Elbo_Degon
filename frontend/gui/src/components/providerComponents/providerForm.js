import React from "react";
import { Form, Input, Button, Select, InputNumber, Radio } from "antd";
import axios from "axios";

const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};

class ProvForm extends React.Component {
  formRef = React.createRef();

  onReset = () => {
    this.formRef.current.resetFields();
  };

  //recibo los datos del form y hago un post (crear) en los productos en restframework
  handleFormSubmit = event => {
    //event.preventDefault();
    const name = event.Nombre;
    const main_phone = event.MPhone;
    const phone = event.OPhone;
    const address = event.Address;
    const email = event.Email;
    const availible = event.Available;

    axios
      .post("http://127.0.0.1:8000/rest/prov/", {
        name: name,
        main_phone: main_phone,
        phone: phone,
        address: address,
        email: email,
        availible: availible
      })
      .then(res => console.log(res))
      .catch(error => console.err(error));
    return window.location.reload(false);
  };

  render() {
    return (
      <Form
        {...layout}
        ref={this.formRef}
        name="control-ref"
        onFinish={event => this.handleFormSubmit(event)}
      >
        <Form.Item name="Nombre" rules={[{ required: true }]} label="Nombre">
          <Input name="name" placeholder="Nombre del proveedor" />
        </Form.Item>

        <Form.Item
          name="MPhone"
          label="Telefono Principal"
          rules={[
            { type: "number", required: true, min: 4100000000, max: 4270000000 }
          ]}
        >
          <InputNumber placeholder="Telefono principal" />
        </Form.Item>

        <Form.Item
          name="OPhone"
          label="Otro telefono"
          rules={[
            { type: "number", required: true, min: 4100000000, max: 4270000000 }
          ]}
        >
          <InputNumber placeholder="Telefono alterno" />
        </Form.Item>

        <Form.Item
          name="Address"
          rules={[{ required: true }]}
          label="Direccion"
        >
          <Input name="address" placeholder="Escribe la direccion" />
        </Form.Item>

        <Form.Item name="Email" rules={[{ required: true }]} label="Email">
          <Input name="email" placeholder="Escribe la direccion" />
        </Form.Item>

        <Form.Item
          name="Available"
          label="Available"
          rules={[{ required: true }]}
        >
          <Select name="availible" placeholder="Elige una opcion" allowClear>
            <Option value={true}>True</Option>
            <Option value={false}>False</Option>
          </Select>
        </Form.Item>

        <br />
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginLeft: 650 }}
          wrapperCol={{ ...layout.wrapperCol, offset: 8 }}
        >
          Crear
        </Button>
        <br />
        <br />
      </Form>
    );
  }
}

export default ProvForm;

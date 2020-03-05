import React from "react";
import { Form, Input, Button, Select, InputNumber, DatePicker } from "antd";
import axios from "axios";

const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};

class TaxForm extends React.Component {
  formRef = React.createRef();

  onReset = () => {
    this.formRef.current.resetFields();
  };

  //recibo los datos del form y hago un post (crear) en los productos en restframework
  handleFormSubmit = event => {
    //event.preventDefault();
    const tax = event.Imp;
    const date = event.Fecha;
    const is_Active = event.Activo;
    const available = event.Available;

    axios
      .post("http://127.0.0.1:8000/rest/tax/", {
        tax: tax,
        date: date,
        is_Active: is_Active,
        available: available
      })
      .then(res => console.log(res))
      .catch(error => console.err(error));
    return window.location.reload(false);
  };

  // //metodo para obtener solo aquellos objetos que tengan el available en true
  // getTheAvailables = arrToCheck => {
  //   const arrAvailables = arrToCheck.filter(x => x.availible === true);
  //   return arrAvailables;
  // };

  render() {
    return (
      <Form
        {...layout}
        ref={this.formRef}
        name="control-ref"
        onFinish={event => this.handleFormSubmit(event)}
      >
        <Form.Item
          name="Imp"
          rules={[{ type: "number", required: true, min: 1 }]}
          label="Valor del impuesto"
        >
          <InputNumber name="imp" placeholder="Valor del impuesto" />
        </Form.Item>

        <Form.Item name="Fecha" label="Fecha" rules={[{ required: true }]}>
          <DatePicker name="fecha" onChange={this.onChange} />
        </Form.Item>

        <Form.Item
          name="Activo"
          label="Esta activo"
          rules={[{ required: true }]}
        >
          <Select name="activo" placeholder="Elige una opcion" allowClear>
            <Option value={true}>True</Option>
            <Option value={false}>False</Option>
          </Select>
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
        <Button type="primary" htmlType="submit" style={{ marginLeft: 650 }}>
          Crear
        </Button>
        <br />
        <br />
      </Form>
    );
  }
}

export default TaxForm;

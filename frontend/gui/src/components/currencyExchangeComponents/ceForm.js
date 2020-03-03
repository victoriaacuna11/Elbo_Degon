import React from "react";
import { Form, Input, Button, Select, InputNumber, DatePicker } from "antd";
import axios from "axios";
import moment from "moment";

const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};

class CeForm extends React.Component {
  formRef = React.createRef();

  onReset = () => {
    this.formRef.current.resetFields();
  };

  //recibo los datos del form y hago un post (crear) en los productos en restframework
  handleFormSubmit = event => {
    //event.preventDefault();
    const bs_exchange = event.BS;
    const euro_exchange = event.EU;
    const date = moment(event.Fecha).format("YYYY-MM-DD");
    const is_Active = event.Activo;
    const availible = event.Available;

    axios
      .post("http://127.0.0.1:8000/rest/currency/", {
        bs_exchange: bs_exchange,
        euro_exchange: euro_exchange,
        date: date,
        is_Active: is_Active,
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
        <Form.Item
          name="BS"
          rules={[{ type: "number", required: true, min: 0 }]}
          label="BS"
        >
          <InputNumber name="BS" placeholder="Bs" />
        </Form.Item>

        <Form.Item
          name="EU"
          rules={[{ type: "number", required: true, min: 0 }]}
          label="EU"
        >
          <InputNumber name="EU" placeholder="Euros" />
        </Form.Item>

        <Form.Item name="Fecha" label="Fecha" rules={[{ required: true }]}>
          <DatePicker name="fecha" onChange={this.onChange} />
        </Form.Item>

        <Form.Item name="Activo" label="Activo" rules={[{ required: true }]}>
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

export default CeForm;

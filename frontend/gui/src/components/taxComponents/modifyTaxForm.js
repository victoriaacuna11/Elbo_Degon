import React from "react";
import { Form, InputNumber, Button, Select, DatePicker } from "antd";
import axios from "axios";

const { Option } = Select;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 }
};

class ModifyTaxForm extends React.Component {
  formRef = React.createRef();

  onReset = () => {
    this.formRef.current.resetFields();
  };

  state = {
    currTax: {}
  };

  //Me traigo todos los datos del producto en el cual
  //estoy metido
  componentDidMount() {
    axios
      .get(`http://127.0.0.1:8000/rest/tax/${this.props.taxID}`)
      .then(res => {
        this.setState({
          currTax: res.data
        });
      });
  }

  //metodo para el boton de habilitar y deshabilitar. Pone en available el valor contrario al que tenia y refresca
  handleChangeAvailable = (event, taxID) => {
    axios
      .put(`http://127.0.0.1:8000/rest/tax/${taxID}/`, {
        tax: this.state.currTax.tax,
        date: this.state.currTax.date,
        is_Active: this.state.currTax.is_Active,
        available: !this.state.currTax.available
      })
      .then(res => console.log(res))
      .catch(error => console.error(error));

    return window.location.reload(false);
  };

  //Para cambiar el mensaje del boton de habilitar y deshabilitar
  showMessage = () => {
    return this.state.currTax.available === false
      ? "Habilitar"
      : "Deshabilitar";
  };

  //toma los valores del form y hace un put (modificar) en el producto en el que esta metido
  handleFormSubmit = (event, taxID) => {
    //event.preventDefault();
    const tax = event.Imp;
    const date = event.Fecha;
    const is_Active = event.Activo;
    const available = event.Available;

    axios
      .put(`http://127.0.0.1:8000/rest/tax/${taxID}/`, {
        tax: tax,
        date: date,
        is_Active: is_Active,
        available: available
      })
      .then(res => console.log(res))
      .catch(error => console.error(error));
    return window.location.reload(false);
  };

  //Cambiar el color del boton (pura carpinteria papa)
  colorStatus = () => {
    return this.state.currTax.available === false
      ? "rgba(11,226,8,0.5)"
      : "rgba(233,5,5,0.5)";
  };

  showTrueFalse = () => {
    return this.state.currTax.is_Active === false ? "False" : "True";
  };
  //metodo para obtener solo aquellos objetos que tengan el available en true
  // getTheAvailables = arrToCheck => {
  //   const arrAvailables = arrToCheck.filter(x => x.available === true);
  //   return arrAvailables;
  // };

  render() {
    return (
      <>
        <Form
          {...layout}
          ref={this.formRef}
          name="control-ref"
          onFinish={event => this.handleFormSubmit(event, this.props.taxID)}
        >
          <Form.Item
            name="Imp"
            rules={[{ type: "number", required: true, min: 1 }]}
            label="Valor del impuesto"
            key={this.state.currTax.tax}
          >
            <InputNumber name="imp" placeholder={this.state.currTax.tax} />
          </Form.Item>

          <Form.Item
            name="Fecha"
            label="Fecha"
            rules={[{ required: true }]}
            key={this.state.currTax.date}
          >
            <DatePicker
              name="fecha"
              onChange={this.onChange}
              placeholder={this.state.currTax.date}
            />
          </Form.Item>

          <Form.Item
            name="Activo"
            label="Esta activo"
            rules={[{ required: true }]}
            key={this.state.currTax.is_Active}
          >
            <Select name="activo" placeholder={this.showTrueFalse()} allowClear>
              <Option value={true}>True</Option>
              <Option value={false}>False</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="Available"
            label="Available"
            key={this.state.currTax.available}
          >
            <Select
              defaultValue={this.state.currTax.available}
              name="available"
              allowClear
              disabled
            >
              <Option value={true}>True</Option>
              <Option value={false}>False</Option>
            </Select>
          </Form.Item>

          <br />
          <Form.Item>
            <Button
              style={{ marginLeft: 650 }}
              type="primary"
              htmlType="submit"
              wrapperCol={{ ...layout.wrapperCol, offset: 8 }}
            >
              Modificar
            </Button>
          </Form.Item>

          <Form.Item>
            <Button
              style={{
                backgroundColor: this.colorStatus(),
                marginLeft: 650,
                borderStyle: "solid",
                borderWidth: 1.5,
                borderColor: this.colorStatus()
              }}
              type="primary"
              htmlType="button"
              wrapperCol={{ ...layout.wrapperCol, offset: 8 }}
              onClick={event =>
                this.handleChangeAvailable(event, this.props.taxID)
              }
            >
              {this.showMessage()}
            </Button>
          </Form.Item>
          <br />
          <br />
        </Form>
      </>
    );
  }
}

export default ModifyTaxForm;

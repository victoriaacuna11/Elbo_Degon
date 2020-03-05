import React from "react";
import { Form, Input, Button, Select, InputNumber, Radio } from "antd";
import axios from "axios";

const { Option } = Select;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 }
};

class ModifyZForm extends React.Component {
  formRef = React.createRef();

  onReset = () => {
    this.formRef.current.resetFields();
  };

  state = {
    currZone: {}
  };

  //Me traigo los proveedores, las categorias, y todos los datos del producto en el cual
  //estoy metido
  componentDidMount() {
    axios
      .get(`http://127.0.0.1:8000/rest/zone/${this.props.zoneID}`)
      .then(res => {
        this.setState({
          currZone: res.data
        });
      });
  }

  //metodo para el boton de habilitar y deshabilitar. Pone en availible el valor contrario al que tenia y refresca
  handleChangeAvailable = (event, zoneID) => {
    axios
      .put(`http://127.0.0.1:8000/rest/zone/${zoneID}/`, {
        name: this.state.currZone.name,
        cost: this.state.currZone.cost,
        availible: !this.state.currZone.availible
      })
      .then(res => console.log(res))
      .catch(error => console.error(error));

    return window.location.reload(false);
  };

  //Para cambiar el mensaje del boton de habilitar y deshabilitar
  showMessage = () => {
    return this.state.currZone.availible === false
      ? "Habilitar"
      : "Deshabilitar";
  };

  //toma los valores del form y hace un put (modificar) en el producto en el que esta metido
  handleFormSubmit = (event, zoneID) => {
    //event.preventDefault();
    const name = event.Nombre;
    const cost = event.Costo;
    const availible = event.Available;

    axios
      .put(`http://127.0.0.1:8000/rest/zone/${zoneID}/`, {
        name: name,
        cost: cost,
        availible: availible
      })
      .then(res => console.log(res))
      .catch(error => console.error(error));
    return window.location.reload(false);
  };

  //Cambiar el color del boton (pura carpinteria papa)
  colorStatus = () => {
    return this.state.currZone.availible === false
      ? "rgba(11,226,8,0.5)"
      : "rgba(233,5,5,0.5)";
  };

  //metodo para obtener solo aquellos objetos que tengan el available en true
  // getTheAvailables = arrToCheck => {
  //   const arrAvailables = arrToCheck.filter(x => x.availible === true);
  //   return arrAvailables;
  // };

  render() {
    return (
      <>
        <Form
          {...layout}
          ref={this.formRef}
          name="control-ref"
          onFinish={event => this.handleFormSubmit(event, this.props.zoneID)}
        >
          <Form.Item
            name="Nombre"
            rules={[{ required: true }]}
            label="Nombre"
            key={this.state.currZone.name}
          >
            <Input name="name" placeholder={this.state.currZone.name} />
          </Form.Item>

          <Form.Item
            name="Costo"
            label="Costo"
            rules={[{ type: "number", required: true, min: 0 }]}
            key={this.state.currZone.cost}
          >
            <InputNumber placeholder={this.state.currZone.cost} />
          </Form.Item>

          <Form.Item
            name="Available"
            label="Available"
            key={this.state.currZone.availible}
          >
            <Select
              defaultValue={this.state.currZone.availible}
              name="availible"
              placeholder="Elige una opcion"
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
                this.handleChangeAvailable(event, this.props.zoneID)
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

export default ModifyZForm;

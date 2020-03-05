import React from "react";
import { Form, Input, Button, Select, InputNumber, Radio } from "antd";
import axios from "axios";

const { Option } = Select;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 }
};

class ModifyProvForm extends React.Component {
  formRef = React.createRef();

  onReset = () => {
    this.formRef.current.resetFields();
  };

  state = {
    // providers: [],
    // category: [],
    currProv: {}
  };

  //Me traigo los proveedores, las categorias, y todos los datos del producto en el cual
  //estoy metido
  componentDidMount() {
    axios
      .get(`http://127.0.0.1:8000/rest/prov/${this.props.providerID}`)
      .then(res => {
        this.setState({
          currProv: res.data
        });
      });
  }

  //metodo para el boton de habilitar y deshabilitar. Pone en availible el valor contrario al que tenia y refresca
  handleChangeAvailable = (event, providerID) => {
    axios
      .put(`http://127.0.0.1:8000/rest/prov/${providerID}/`, {
        name: this.state.currProv.name,
        main_phone: this.state.currProv.main_phone,
        phone: this.state.currProv.phone,
        address: this.state.currProv.address,
        email: this.state.currProv.email,
        availible: !this.state.currProv.availible
      })
      .then(res => console.log(res))
      .catch(error => console.error(error));

    return window.location.reload(false);
  };

  //Para cambiar el mensaje del boton de habilitar y deshabilitar
  showMessage = () => {
    return this.state.currProv.availible === false
      ? "Habilitar"
      : "Deshabilitar";
  };

  //toma los valores del form y hace un put (modificar) en el producto en el que esta metido
  handleFormSubmit = (event, providerID) => {
    const name = event.Nombre;
    const main_phone = event.MPhone;
    const phone = event.OPhone;
    const address = event.Address;
    const email = event.Email;
    const availible = event.Available;
    console.log("EL AVAILABLE ES: " + availible);

    axios
      .put(`http://127.0.0.1:8000/rest/prov/${providerID}/`, {
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

  //Cambiar el color del boton (pura carpinteria papa)
  colorStatus = () => {
    return this.state.currProv.availible === false
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
          onFinish={event =>
            this.handleFormSubmit(event, this.props.providerID)
          }
        >
          <Form.Item name="Nombre" rules={[{ required: true }]} label="Nombre">
            <Input name="name" placeholder={this.state.currProv.name} />
          </Form.Item>

          <Form.Item
            name="MPhone"
            label="Telefono Principal"
            rules={[{ type: "number", required: true, min: 4100000000 }]}
          >
            <InputNumber placeholder={this.state.currProv.main_phone} />
          </Form.Item>

          <Form.Item
            name="OPhone"
            label="Otro telefono"
            rules={[{ type: "number", required: true, min: 4100000000 }]}
          >
            <InputNumber placeholder={this.state.currProv.phone} />
          </Form.Item>

          <Form.Item
            name="Address"
            rules={[{ required: true }]}
            label="Direccion"
          >
            <Input name="address" placeholder={this.state.currProv.address} />
          </Form.Item>

          <Form.Item name="Email" rules={[{ required: true }]} label="Email">
            <Input name="email" placeholder={this.state.currProv.email} />
          </Form.Item>

          <Form.Item
            name="Available"
            label="Available"
            key={this.state.currProv.availible}
          >
            <Select
              name="Available"
              defaultValue={this.state.currProv.availible}
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
                this.handleChangeAvailable(event, this.props.providerID)
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

export default ModifyProvForm;

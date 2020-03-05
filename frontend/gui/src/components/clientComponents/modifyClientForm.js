import React from "react";
import { Form, Input, Button, Select, InputNumber } from "antd";
import axios from "axios";

const { Option } = Select;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 }
};

class ModifyClientForm extends React.Component {
  formRef = React.createRef();

  onReset = () => {
    this.formRef.current.resetFields();
  };

  state = {
    zones: [],
    currClient: {}
  };

  //Me traigo los proveedores, las categorias, y todos los datos del producto en el cual
  //estoy metido
  componentDidMount() {
    axios
      .get(`http://127.0.0.1:8000/rest/client/${this.props.clientID}`)
      .then(res => {
        this.setState({
          currClient: res.data
        });
      });

    axios.get("http://127.0.0.1:8000/rest/zone/").then(res => {
      this.setState({
        zones: res.data
      });
    });
  }

  //metodo para el boton de habilitar y deshabilitar. Pone en availible el valor contrario al que tenia y refresca
  handleChangeAvailable = (event, clientID) => {
    axios
      .put(`http://127.0.0.1:8000/rest/client/${clientID}/`, {
        ci: this.state.currClient.ci,
        name: this.state.currClient.name,
        last_name: this.state.currClient.last_name,
        is_meber: this.state.currClient.is_meber,
        zone: this.state.currClient.zone,
        availible: !this.state.currClient.availible
      })
      .then(res => console.log(res))
      .catch(error => console.error(error));

    return window.location.reload(false);
  };

  //Para cambiar el mensaje del boton de habilitar y deshabilitar
  showMessage = () => {
    return this.state.currClient.availible === false
      ? "Habilitar"
      : "Deshabilitar";
  };

  //toma los valores del form y hace un put (modificar) en el producto en el que esta metido
  handleFormSubmit = (event, clientID) => {
    //event.preventDefault();
    const ci = event.CI;
    const name = event.Nombre;
    const last_name = event.Apellido;
    const is_meber = event.EsMiembro;
    const zone = event.Zona;
    const availible = event.Available;

    axios
      .put(`http://127.0.0.1:8000/rest/client/${clientID}/`, {
        ci: ci,
        name: name,
        last_name: last_name,
        is_meber: is_meber,
        zone: zone,
        availible: availible
      })
      .then(res => console.log(res))
      .catch(error => console.err(error));
    return window.location.reload(false);
  };

  //Cambiar el color del boton (pura carpinteria papa)
  colorStatus = () => {
    return this.state.currClient.availible === false
      ? "rgba(11,226,8,0.5)"
      : "rgba(233,5,5,0.5)";
  };

  //metodo para obtener solo aquellos objetos que tengan el available en true
  getTheAvailables = arrToCheck => {
    const arrAvailables = arrToCheck.filter(x => x.availible === true);
    return arrAvailables;
  };

  showTrueFalse = () => {
    return this.state.currClient.is_meber === false ? "False" : "True";
  };

  render() {
    return (
      <>
        <Form
          {...layout}
          ref={this.formRef}
          name="control-ref"
          onFinish={event => this.handleFormSubmit(event, this.props.clientID)}
        >
          <Form.Item
            name="CI"
            rules={[{ required: true }]}
            label="C.I."
            key={this.state.currClient.ci}
          >
            <Input name="cedula" placeholder={this.state.currClient.ci} />
          </Form.Item>

          <Form.Item
            name="Nombre"
            rules={[{ required: true }]}
            label="Nombre"
            key={this.state.currClient.name}
          >
            <Input name="nombre" placeholder={this.state.currClient.name} />
          </Form.Item>

          <Form.Item
            name="Apellido"
            rules={[{ required: true }]}
            label="Apellido"
            key={this.state.currClient.last_name}
          >
            <Input
              name="apellido"
              placeholder={this.state.currClient.last_name}
            />
          </Form.Item>

          <Form.Item
            name="EsMiembro"
            label="Es miembro"
            rules={[{ required: true }]}
            key={this.state.currClient.is_meber}
          >
            <Select
              name="miembro"
              placeholder={this.showTrueFalse()}
              allowClear
            >
              <Option value={true}>True</Option>
              <Option value={false}>False</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="Zona"
            label="Zona"
            rules={[{ required: true }]}
            key={this.state.currClient.zone}
          >
            <Select
              name="zona"
              placeholder={this.state.currClient.zone}
              allowClear
            >
              {this.getTheAvailables(this.state.zones).map(z => (
                <Option value={z.id} key={z.name}>
                  {z.name} ({z.id})
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="Available"
            label="Available"
            key={this.state.currClient.availible}
          >
            <Select
              defaultValue={this.state.currClient.availible}
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
                this.handleChangeAvailable(event, this.props.clientID)
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

export default ModifyClientForm;

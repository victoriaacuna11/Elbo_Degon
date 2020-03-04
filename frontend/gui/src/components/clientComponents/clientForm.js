import React from "react";
import { Form, Input, Button, Select, InputNumber } from "antd";
import axios from "axios";

const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};

class ClientForm extends React.Component {
  formRef = React.createRef();

  onReset = () => {
    this.formRef.current.resetFields();
  };

  //estado con un array de proveedores y de categorias
  state = {
    zones: []
  };

  //me trae todas las zonas
  componentDidMount() {
    axios.get("http://127.0.0.1:8000/rest/zone/").then(res => {
      this.setState({
        zones: res.data
      });
      console.log(this.state.zones);
    });
  }

  //recibo los datos del form y hago un post (crear) en los productos en restframework
  handleFormSubmit = event => {
    //event.preventDefault();
    const ci = event.CI;
    const name = event.Nombre;
    const last_name = event.Apellido;
    const is_meber = event.EsMiembro;
    const zone = event.Zona;
    const availible = event.Available;

    axios
      .post("http://127.0.0.1:8000/rest/client/", {
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

  //metodo para obtener solo aquellos objetos que tengan el available en true
  getTheAvailables = arrToCheck => {
    const arrAvailables = arrToCheck.filter(x => x.availible === true);
    return arrAvailables;
  };

  render() {
    return (
      <Form
        {...layout}
        ref={this.formRef}
        name="control-ref"
        onFinish={event => this.handleFormSubmit(event)}
      >
        <Form.Item name="CI" rules={[{ required: true }]} label="C.I.">
          <Input name="cedula" placeholder="Cedula del cliente" />
        </Form.Item>

        <Form.Item name="Nombre" rules={[{ required: true }]} label="Nombre">
          <Input name="nombre" placeholder="Nombre del cliente" />
        </Form.Item>

        <Form.Item
          name="Apellido"
          rules={[{ required: true }]}
          label="Apellido"
        >
          <Input name="apellido" placeholder="Apellido del cliente" />
        </Form.Item>

        <Form.Item
          name="EsMiembro"
          label="Es miembro"
          rules={[{ required: true }]}
        >
          <Select name="miembro" placeholder="Elige una opcion" allowClear>
            <Option value={true}>True</Option>
            <Option value={false}>False</Option>
          </Select>
        </Form.Item>

        <Form.Item name="Zona" label="Zona" rules={[{ required: true }]}>
          <Select name="zona" placeholder="Selecciona una zona" allowClear>
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

export default ClientForm;

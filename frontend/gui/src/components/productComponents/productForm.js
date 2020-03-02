import React from "react";
import { Form, Input, Button, Select, InputNumber, Radio } from "antd";
import axios from "axios";

const { Option } = Select;

const layout = {
  labelCol: {
    span: 11
  }
};

class PForm extends React.Component {
  formRef = React.createRef();

  onReset = () => {
    this.formRef.current.resetFields();
  };

  //estado con un array de proveedores y de categorias
  state = {
    providers: [],
    category: []
  };

  //me trae todos los proveedores y las categorias de la DB para poder mostrarlos en un dropdown en el form
  componentDidMount() {
    axios.get("http://127.0.0.1:8000/rest/prov/").then(res => {
      this.setState({
        providers: res.data
      });
      console.log(this.state.providers);
    });

    axios.get("http://127.0.0.1:8000/rest/category/").then(ras => {
      this.setState({
        category: ras.data
      });
      console.log(this.state.category);
    });
  }

  //recibo los datos del form y hago un post (crear) en los productos en restframework
  handleFormSubmit = event => {
    //event.preventDefault();
    const name = event.Nombre;
    const pasillo = event.Pasillo;
    const category = event.categoria;
    const provider = event.Proveedor;
    const availible = event.Available;

    axios
      .post("http://127.0.0.1:8000/rest/prod/", {
        provider: provider,
        product_name: name,
        category: category,
        hall: pasillo,
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
          <Input name="name" placeholder="Nombre del producto" />
        </Form.Item>

        <Form.Item
          name="Pasillo"
          label="Pasillo"
          rules={[{ type: "number", required: true, min: 1, max: 20 }]}
        >
          <InputNumber placeholder="Nro del pasillo" />
        </Form.Item>

        <Form.Item
          name="Proveedor"
          label="Proveedor"
          rules={[{ required: true }]}
        >
          <Select
            name="provider"
            placeholder="Selecciona un proveedor"
            allowClear
          >
            {this.state.providers.map(provs => (
              <Option value={provs.id} key={provs.name}>
                {provs.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="categoria"
          label="Categoria"
          rules={[{ required: true }]}
        >
          <Select
            name="category"
            placeholder="Selecciona una categoria"
            allowClear
          >
            {this.state.category.map(cats => (
              <Option value={cats.id} key={cats.name}>
                {cats.name}
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

export default PForm;

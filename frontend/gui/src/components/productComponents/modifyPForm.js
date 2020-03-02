import React from "react";
import { Form, Input, Button, Select, InputNumber, Radio } from "antd";
import axios from "axios";

const { Option } = Select;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 }
};

class ModifyPForm extends React.Component {
  formRef = React.createRef();

  onReset = () => {
    this.formRef.current.resetFields();
  };

  state = {
    providers: [],
    category: [],
    currProd: {}
  };

  //Me traigo los proveedores, las categorias, y todos los datos del producto en el cual
  //estoy metido
  componentDidMount() {
    axios
      .get(`http://127.0.0.1:8000/rest/prod/${this.props.productID}`)
      .then(res => {
        this.setState({
          currProd: res.data
        });
      });

    axios.get("http://127.0.0.1:8000/rest/prov/").then(res => {
      this.setState({
        providers: res.data
      });
    });

    axios.get("http://127.0.0.1:8000/rest/category/").then(ras => {
      this.setState({
        category: ras.data
      });
    });
  }

  //metodo para el boton de habilitar y deshabilitar. Pone en availible el valor contrario al que tenia y refresca
  handleChangeAvailable = (event, productID) => {
    axios
      .put(`http://127.0.0.1:8000/rest/prod/${productID}/`, {
        provider: this.state.currProd.provider,
        product_name: this.state.currProd.product_name,
        category: this.state.currProd.category,
        hall: this.state.currProd.hall,
        availible: !this.state.currProd.availible
      })
      .then(res => console.log(res))
      .catch(error => console.error(error));

    return window.location.reload(false);
  };

  //Para cambiar el mensaje del boton de habilitar y deshabilitar
  showMessage = () => {
    return this.state.currProd.availible === false
      ? "Habilitar"
      : "Deshabilitar";
  };

  //toma los valores del form y hace un put (modificar) en el producto en el que esta metido
  handleFormSubmit = (event, productID) => {
    //event.preventDefault();
    const name = event.Nombre;
    const pasillo = event.Pasillo;
    const category = event.categoria;
    const provider = event.Proveedor;
    const availible = event.Available;

    axios
      .put(`http://127.0.0.1:8000/rest/prod/${productID}/`, {
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

  //Cambiar el color del boton (pura carpinteria papa)
  colorStatus = () => {
    return this.state.currProd.availible === false
      ? "rgba(11,226,8,0.5)"
      : "rgba(233,5,5,0.5)";
  };

  render() {
    return (
      <>
        <Form
          {...layout}
          ref={this.formRef}
          name="control-ref"
          onFinish={event => this.handleFormSubmit(event, this.props.productID)}
        >
          <Form.Item
            name="Nombre"
            rules={[{ required: true }]}
            label="Nombre"
            key={this.state.currProd.product_name}
          >
            <Input name="name" placeholder={this.state.currProd.product_name} />
          </Form.Item>

          <Form.Item
            name="Pasillo"
            label="Pasillo"
            rules={[
              {
                type: "number",
                required: true,
                min: 1,
                max: 35
              }
            ]}
            key={this.state.currProd.hall}
          >
            <InputNumber placeholder={this.state.currProd.hall} />
          </Form.Item>

          <Form.Item
            name="Proveedor"
            label="Proveedor"
            rules={[{ required: true }]}
            key={this.state.currProd.provider}
          >
            <Select
              placeholder={this.state.currProd.provider}
              name="provider"
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
            key={this.state.currProd.category}
          >
            <Select
              placeholder={this.state.currProd.category}
              name="category"
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
            key={this.state.currProd.availible}
          >
            <Select
              defaultValue={this.state.currProd.availible}
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
                this.handleChangeAvailable(event, this.props.productID)
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

export default ModifyPForm;

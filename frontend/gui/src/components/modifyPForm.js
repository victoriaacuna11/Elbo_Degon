import React from "react";
import { Form, Input, Button, Select, InputNumber, Radio } from "antd";
import axios from "axios";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

function onChange(value) {
  console.log("changed", value);
}

class ModifyPForm extends React.Component {
  formRef = React.createRef();

  onFinish = values => {
    console.log(values);
  };

  onReset = () => {
    this.formRef.current.resetFields();
  };

  state = {
    providers: [],
    category: [],
    currProd: {}
  };

  componentDidMount() {
    if (this.props.productID !== null) {
      axios
        .get(`http://127.0.0.1:8000/rest/prod/${this.props.productID}`)
        .then(res => {
          this.setState({
            currProd: res.data
          });
          console.log(this.state.currProd);
        });
    }

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

  handleChangeAvailable = (event, productID) => {
    const name = this.state.currProd.product_name;
    const pasillo = this.state.currProd.hall;
    const category = this.state.currProd.category;
    const provider = this.state.currProd.provider;
    const availible = !this.state.currProd.availible;
    console.log(name);
    console.log(pasillo);
    console.log(category);
    console.log(provider);
    console.log(availible);

    return axios
      .put(`http://127.0.0.1:8000/rest/prod/${productID}/`, {
        provider: provider,
        product_name: name,
        category: category,
        hall: pasillo,
        availible: availible
      })
      .then(res => console.log(res))
      .catch(error => console.error(error));
  };

  showMessage = () => {
    return this.state.currProd.availible === false
      ? "Habilitar"
      : "Deshabilitar";
  };

  handleFormSubmit = (event, requestType, productID) => {
    //event.preventDefault();
    const name = event.Nombre;
    const pasillo = event.Pasillo;
    const category = event.categoria;
    const provider = event.Proveedor;
    const availible = event.Available;

    console.log(requestType);

    switch (requestType) {
      case "post":
        console.log("entre");
        return axios
          .post("http://127.0.0.1:8000/rest/prod/", {
            provider: provider,
            product_name: name,
            category: category,
            hall: pasillo,
            availible: availible
          })
          .then(res => console.log(res))
          .catch(error => console.err(error));

      case "put":
        return axios
          .put(`http://127.0.0.1:8000/rest/prod/${productID}/`, {
            provider: provider,
            product_name: name,
            category: category,
            hall: pasillo,
            availible: availible
          })
          .then(res => console.log(res))
          .catch(error => console.err(error));
    }
  };

  render() {
    return (
      <>
        <Form
          {...layout}
          ref={this.formRef}
          name="control-ref"
          onFinish={event =>
            this.handleFormSubmit(
              event,
              this.props.requestType,
              this.props.productID
            )
          }
        >
          <Form.Item
            name="Nombre"
            rules={[
              {
                required: true
              }
            ]}
            label="Nombre"
            key={this.state.currProd.product_name}
          >
            <Input
              name="name"
              defaultValue={this.state.currProd.product_name}
            />
          </Form.Item>

          <Form.Item
            name="Pasillo"
            label="Pasillo"
            rules={[
              {
                type: "number",
                required: true,
                min: 1,
                max: 20
              }
            ]}
            key={this.state.currProd.hall}
          >
            <InputNumber
              placeholder={this.state.currProd.hall}
              onChange={onChange}
            />
          </Form.Item>

          <Form.Item
            name="Proveedor"
            label="Proveedor"
            rules={[
              {
                required: true
              }
            ]}
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
            rules={[
              {
                required: true
              }
            ]}
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
              type="primary"
              htmlType="submit"
              wrapperCol={{ ...layout.wrapperCol, offset: 8 }}
            >
              {this.props.buttonText}
            </Button>
          </Form.Item>

          <Button
            type="primary"
            htmlType="button"
            wrapperCol={{ ...layout.wrapperCol, offset: 8 }}
            onClick={event =>
              this.handleChangeAvailable(event, this.props.productID)
            }
          >
            {this.showMessage()}
          </Button>
        </Form>
      </>
    );
  }
}

export default ModifyPForm;

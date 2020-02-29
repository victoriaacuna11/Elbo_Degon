import React from "react";
import { Form, Input, Button, Select, InputNumber, Radio } from "antd";
import axios from "axios";

const { Option } = Select;

const layout = {
  labelCol: {
    span: 11
  }
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16
  }
};

class PForm extends React.Component {
  formRef = React.createRef();

  onFinish = values => {
    console.log(values);
  };

  onReset = () => {
    this.formRef.current.resetFields();
  };

  state = {
    providers: [],
    category: []
  };

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
        >
          <Input name="name" placeholder="Nombre del producto" />
        </Form.Item>

        <Form.Item
          name="Pasillo"
          label="Pasillo"
          rules={[
            {
              type: "number",
              min: 0,
              max: 99,
              required: true
            }
          ]}
        >
          <InputNumber name="pasillo" placeholder="Nro del pasillo" />
        </Form.Item>

        <Form.Item
          name="Proveedor"
          label="Proveedor"
          rules={[
            {
              required: true
            }
          ]}
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
          rules={[
            {
              required: true
            }
          ]}
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
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.gender !== currentValues.gender
          }
        >
          {({ getFieldValue }) =>
            getFieldValue("gender") === "other" ? (
              <Form.Item
                name="customizeGender"
                label="Customize Gender"
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <Input />
              </Form.Item>
            ) : null
          }
        </Form.Item>

        <Form.Item
          name="Available"
          label="Available"
          rules={[
            {
              required: true
            }
          ]}
        >
          <Select name="availible" placeholder="Elige una opcion" allowClear>
            <Option value={true}>True</Option>
            <Option value={false}>False</Option>
          </Select>
        </Form.Item>

        <br />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {this.props.buttonText}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default PForm;

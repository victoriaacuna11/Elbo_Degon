import React from "react";
import { Form, Input, Button, Select, InputNumber, Radio } from "antd";
import axios from "axios";

const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};

class MEForm extends React.Component {
  formRef = React.createRef();

  onReset = () => {
    this.formRef.current.resetFields();
  };

  //estado con un array de empleados
  state = {
    employees: []
  };

  //me trae todos los proveedores y las categorias de la DB para poder mostrarlos en un dropdown en el form
  componentDidMount() {
    axios.get("http://127.0.0.1:8000/rest/emp/").then(res => {
      this.setState({
        employees: res.data
      });
      console.log(this.state.employees);
    });
  }

  //recibo los datos del form y hago un post (crear) en los productos en restframework
  handleFormSubmit = event => {
    //event.preventDefault();
    const employee = event.Empleado;
    const month = event.Mes;
    const year = event.Year;
    const availible = event.Available;

    axios
      .post("http://127.0.0.1:8000/rest/memp/", {
        employee: employee,
        month: month,
        year: year,
        availible: availible
      })
      .then(res => console.log(res))
      .catch(error => console.err(error));
    return window.location.reload(false);
  };

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
        <Form.Item
          name="Empleado"
          label="Empleado"
          rules={[{ required: true }]}
        >
          <Select name="empleado" placeholder="Nombre del empleado" allowClear>
            {this.getTheAvailables(this.state.employees).map(emp => (
              <Option value={emp.id} key={emp.name}>
                {emp.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="Mes" label="Mes" rules={[{ required: true }]}>
          <Select name="mes" placeholder="Mes" allowClear>
            <Option value="Enero">Enero</Option>
            <Option value="Febrero">Febrero</Option>
            <Option value="Marzo">Marzo</Option>
            <Option value="Abril">Abril</Option>
            <Option value="Mayo">Mayo</Option>
            <Option value="Junio">Junio</Option>
            <Option value="Julio">Julio</Option>
            <Option value="Agosto">Agosto</Option>
            <Option value="Septiembre">Septiembre</Option>
            <Option value="Octubre">Octubre</Option>
            <Option value="Noviembre">Noviembre</Option>
            <Option value="Diciembre">Diciembre</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="Year"
          label="Año"
          rules={[{ type: "number", required: true, min: 2019 }]}
        >
          <InputNumber placeholder="Año" />
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

export default MEForm;

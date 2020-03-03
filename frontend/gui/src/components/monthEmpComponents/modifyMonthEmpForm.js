import React from "react";
import { Form, Input, Button, Select, InputNumber, Radio } from "antd";
import axios from "axios";

const { Option } = Select;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 }
};

class ModifyMEForm extends React.Component {
  formRef = React.createRef();

  onReset = () => {
    this.formRef.current.resetFields();
  };

  state = {
    employees: [],
    currMemp: {}
  };

  //Me traigo los proveedores, las categorias, y todos los datos del producto en el cual
  //estoy metido
  componentDidMount() {
    axios
      .get(`http://127.0.0.1:8000/rest/memp/${this.props.employeeID}`)
      .then(res => {
        this.setState({
          currMemp: res.data
        });
      });

    axios.get("http://127.0.0.1:8000/rest/emp/").then(res => {
      this.setState({
        employees: res.data
      });
    });
  }

  //metodo para el boton de habilitar y deshabilitar. Pone en availible el valor contrario al que tenia y refresca
  handleChangeAvailable = (event, employeeID) => {
    axios
      .put(`http://127.0.0.1:8000/rest/memp/${employeeID}/`, {
        employee: this.state.currMemp.employee,
        month: this.state.currMemp.month,
        year: this.state.currMemp.year,
        availible: !this.state.currMemp.availible
      })
      .then(res => console.log(res))
      .catch(error => console.error(error));

    return window.location.reload(false);
  };

  //Para cambiar el mensaje del boton de habilitar y deshabilitar
  showMessage = () => {
    return this.state.currMemp.availible === false
      ? "Habilitar"
      : "Deshabilitar";
  };

  //toma los valores del form y hace un put (modificar) en el producto en el que esta metido
  handleFormSubmit = (event, employeeID) => {
    //event.preventDefault();
    const employee = event.Empleado;
    const month = event.Mes;
    const year = event.Year;
    const availible = event.Available;

    axios
      .put(`http://127.0.0.1:8000/rest/memp/${employeeID}/`, {
        employee: employee,
        month: month,
        year: year,
        availible: availible
      })
      .then(res => console.log(res))
      .catch(error => console.err(error));
    return window.location.reload(false);
  };

  //Cambiar el color del boton (pura carpinteria papa)
  colorStatus = () => {
    return this.state.currMemp.availible === false
      ? "rgba(11,226,8,0.5)"
      : "rgba(233,5,5,0.5)";
  };

  getTheAvailables = arrToCheck => {
    const arrAvailables = arrToCheck.filter(x => x.availible === true);
    return arrAvailables;
  };

  render() {
    return (
      <>
        <Form
          {...layout}
          ref={this.formRef}
          name="control-ref"
          onFinish={event =>
            this.handleFormSubmit(event, this.props.employeeID)
          }
        >
          <Form.Item
            name="Empleado"
            label="Empleado"
            rules={[{ required: true }]}
            key={this.state.currMemp.employee}
          >
            <Select
              name="empleado"
              placeholder={this.state.currMemp.employee}
              allowClear
            >
              {this.getTheAvailables(this.state.employees).map(emp => (
                <Option value={emp.id} key={emp.name}>
                  {emp.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="Mes"
            label="Mes"
            rules={[{ required: true }]}
            key={this.state.currMemp.month}
          >
            <Select
              name="mes"
              placeholder={this.state.currMemp.month}
              allowClear
            >
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
            key={this.state.currMemp.year}
          >
            <InputNumber placeholder={this.state.currMemp.year} />
          </Form.Item>

          <Form.Item
            name="Available"
            label="Available"
            key={this.state.currMemp.availible}
          >
            <Select
              defaultValue={this.state.currMemp.availible}
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
                this.handleChangeAvailable(event, this.props.employeeID)
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

export default ModifyMEForm;

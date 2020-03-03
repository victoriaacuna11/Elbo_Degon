import React from "react";
import { Form, Input, Button, Select, InputNumber, TimePicker } from "antd";
import axios from "axios";
import moment from "moment";

const { Option } = Select;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 }
};

function onChange(time, timeString) {
  console.log(time, timeString);
}

class ModifyLocForm extends React.Component {
  formRef = React.createRef();

  onReset = () => {
    this.formRef.current.resetFields();
  };

  state = {
    employees: [],
    currLoc: {}
  };

  //Me traigo los proveedores, las categorias, y todos los datos del producto en el cual
  //estoy metido
  componentDidMount() {
    axios
      .get(`http://127.0.0.1:8000/rest/local/${this.props.localID}`)
      .then(res => {
        this.setState({
          currLoc: res.data
        });
      });

    axios.get("http://127.0.0.1:8000/rest/emp/").then(res => {
      this.setState({
        employees: res.data
      });
      console.log(this.state.employees);
    });
  }

  //metodo para el boton de habilitar y deshabilitar. Pone en availible el valor contrario al que tenia y refresca
  handleChangeAvailable = (event, localID) => {
    axios
      .put(`http://127.0.0.1:8000/rest/local/${localID}/`, {
        address: this.state.currLoc.address,
        opening_time: this.state.currLoc.opening_time,
        closing_time: this.state.currLoc.closing_time,
        manager: this.state.currLoc.manager,
        availible: !this.state.currLoc.availible
      })
      .then(res => console.log(res))
      .catch(error => console.error(error));

    return window.location.reload(false);
  };

  //Para cambiar el mensaje del boton de habilitar y deshabilitar
  showMessage = () => {
    return this.state.currLoc.availible === false
      ? "Habilitar"
      : "Deshabilitar";
  };

  //toma los valores del form y hace un put (modificar) en el producto en el que esta metido
  handleFormSubmit = (event, localID) => {
    //event.preventDefault();
    const address = event.Address;
    const opening_time = moment(event.Abre).format("HH:mm:ss");
    const closing_time = moment(event.Cierra).format("HH:mm:ss");
    const manager = event.Gerencia;
    const availible = event.Available;

    axios
      .put(`http://127.0.0.1:8000/rest/local/${localID}/`, {
        address: address,
        opening_time: opening_time,
        closing_time: closing_time,
        manager: manager,
        availible: availible
      })
      .then(res => console.log(res))
      .catch(error => console.error(error));
    return window.location.reload(false);
  };

  //Cambiar el color del boton (pura carpinteria papa)
  colorStatus = () => {
    return this.state.currLoc.availible === false
      ? "rgba(11,226,8,0.5)"
      : "rgba(233,5,5,0.5)";
  };

  getManagers = () => {
    const arrManagers = this.state.employees.filter(x => x.job_id == "Gerente");
    console.log(arrManagers);
    return arrManagers;
  };

  render() {
    return (
      <>
        <Form
          {...layout}
          ref={this.formRef}
          name="control-ref"
          onFinish={event => this.handleFormSubmit(event, this.props.localID)}
        >
          <Form.Item
            name="Address"
            rules={[{ required: true }]}
            label="Direccion"
            key={this.state.currLoc.address}
          >
            <Input name="address" placeholder={this.state.currLoc.address} />
          </Form.Item>

          <Form.Item
            name="Abre"
            label="Hora de apertura"
            key={this.state.currLoc.opening_time}
          >
            <TimePicker
              name="abre"
              onChange={onChange}
              placeholder={this.state.currLoc.opening_time}
            />
          </Form.Item>

          <Form.Item
            name="Cierra"
            label="Hors de cierre"
            key={this.state.currLoc.closing_time}
          >
            <TimePicker
              name="cierra"
              onChange={onChange}
              placeholder={this.state.currLoc.closing_time}
            />
          </Form.Item>

          <Form.Item
            name="Gerencia"
            label="Gerente"
            rules={[{ required: true }]}
            key={this.state.currLoc.manager}
          >
            <Select
              name="gerente"
              placeholder={this.state.currLoc.manager}
              allowClear
            >
              {this.getManagers().map(x => (
                <Option value={x.id} key={x.name + x.last_name}>
                  {x.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="Available"
            label="Available"
            key={this.state.currLoc.availible}
          >
            <Select
              name="availible"
              placeholder="Elige una opcion"
              defaultValue={this.state.currLoc.availible}
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
                this.handleChangeAvailable(event, this.props.localID)
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

export default ModifyLocForm;

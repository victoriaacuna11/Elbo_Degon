import React from "react";
import moment from "moment";
import { Form, Input, Button, Select, InputNumber, TimePicker } from "antd";
import axios from "axios";

const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};

function onChange(time, timeString) {
  console.log(time, timeString);
}

class LocalForm extends React.Component {
  formRef = React.createRef();

  onReset = () => {
    this.formRef.current.resetFields();
  };

  //estado con un array de proveedores y de categorias
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
    const address = event.Address;
    const opening_time = moment(event.Abre).format("HH:mm:ss");
    const closing_time = moment(event.Cierra).format("HH:mm:ss");
    const manager = event.Gerencia;
    const availible = event.Available;

    console.log(address);

    console.log(opening_time);

    console.log(closing_time);

    console.log(address);

    console.log(address);

    axios
      .post("http://127.0.0.1:8000/rest/local/", {
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

  getManagers = () => {
    const arrManagers = this.state.employees.filter(x => x.job_id == "Gerente");
    console.log(arrManagers);
    return arrManagers;
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
          name="Address"
          rules={[{ required: true }]}
          label="Direccion"
        >
          <Input name="address" placeholder="Direccion" />
        </Form.Item>

        <Form.Item name="Abre" label="Hora de apertura">
          <TimePicker
            name="abre"
            onChange={onChange}
            defaultValue={moment("00:00:00", "HH:mm:ss")}
          />
        </Form.Item>

        <Form.Item name="Cierra" label="Hors de cierre">
          <TimePicker
            name="cierra"
            onChange={onChange}
            defaultValue={moment("00:00:00", "HH:mm:ss")}
          />
        </Form.Item>

        <Form.Item name="Gerencia" label="Gerente" rules={[{ required: true }]}>
          <Select
            name="gerente"
            placeholder="Selecciona el gerente de este local"
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

export default LocalForm;

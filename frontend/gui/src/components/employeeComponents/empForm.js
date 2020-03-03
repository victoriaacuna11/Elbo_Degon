import React from "react";
import { Form, Input, Button, Select, InputNumber, DatePicker } from "antd";
import axios from "axios";
import moment from "moment";

const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};

function onChange(date, dateString) {
  console.log(date, dateString);
}

class EmpForm extends React.Component {
  formRef = React.createRef();

  onReset = () => {
    this.formRef.current.resetFields();
  };

  //   //estado con un array de proveedores y de categorias
  //   state = {
  //     providers: [],
  //     category: []
  //   };

  //   //me trae todos los proveedores y las categorias de la DB para poder mostrarlos en un dropdown en el form
  //   componentDidMount() {
  //     axios.get("http://127.0.0.1:8000/rest/prov/").then(res => {
  //       this.setState({
  //         providers: res.data
  //       });
  //       console.log(this.state.providers);
  //     });

  //     axios.get("http://127.0.0.1:8000/rest/category/").then(ras => {
  //       this.setState({
  //         category: ras.data
  //       });
  //       console.log(this.state.category);
  //     });
  //   }

  //recibo los datos del form y hago un post (crear) en los productos en restframework
  handleFormSubmit = event => {
    //event.preventDefault();
    const ci = event.CI.toString();
    const name = event.Nombre;
    const last_name = event.Apellido;
    const phone = event.MPhone.toString();
    const points = event.Puntos;
    const adress = event.Address;
    const gender = event.Genero;
    const birth_date = moment(event.Cumple).format("YYYY-MM-DD");
    const job_id = event.Trabajo;
    const email = event.Email;
    const date_hired = moment(event.FechaContratado).format("YYYY-MM-DD");
    const availible = event.Available;

    console.log(birth_date);
    console.log(date_hired);

    axios
      .post("http://127.0.0.1:8000/rest/emp/", {
        ci: ci,
        name: name,
        last_name: last_name,
        phone: phone,
        points: points,
        adress: adress,
        gender: gender,
        birth_date: birth_date,
        job_id: job_id,
        email: email,
        date_hired: date_hired,
        availible: availible
      })
      .then(res => console.log(res))
      .catch(error => console.error(error));
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
          <Input name="name" placeholder="Nombre del empleado" />
        </Form.Item>

        <Form.Item
          name="Apellido"
          rules={[{ required: true }]}
          label="Apellido"
        >
          <Input name="apellido" placeholder="Apellido del empleado" />
        </Form.Item>

        <Form.Item
          name="CI"
          rules={[{ type: "number", required: true, min: 1 }]}
          label="CI"
        >
          <InputNumber name="CI" placeholder="CI del empleado" />
        </Form.Item>

        <Form.Item
          name="MPhone"
          rules={[
            { type: "number", required: true, min: 4100000000, max: 4270000000 }
          ]}
          label="Telefono principal"
        >
          <InputNumber placeholder="Telefono principal del empleado" />
        </Form.Item>

        <Form.Item
          name="Puntos"
          rules={[{ type: "number", required: true, min: 0 }]}
          label="Puntos"
        >
          <InputNumber name="puntos" placeholder="Puntos del empleado" />
        </Form.Item>

        <Form.Item
          name="Address"
          rules={[{ required: true }]}
          label="Direccion"
        >
          <Input name="address" placeholder="Direccion del empleado" />
        </Form.Item>

        <Form.Item name="Genero" label="Genero" rules={[{ required: true }]}>
          <Select name="genero" placeholder="Genero del empleado" allowClear>
            <Option value="Hombre">Hombre</Option>
            <Option value="Mujer">Mujer</Option>
            <Option value="Otro">Otro</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="Cumple"
          label="Fecha de nacimiento"
          rules={[{ required: true }]}
        >
          <DatePicker name="cumple" onChange={this.onChange} />
        </Form.Item>

        <Form.Item name="Trabajo" label="Trabajo" rules={[{ required: true }]}>
          <Select name="trabajo" placeholder="Trabajo del empleado" allowClear>
            <Option value="Gerente">Gerente</Option>
            <Option value="Repartidor">Repartidor</Option>
            <Option value="Cajero">Cajero</Option>
          </Select>
        </Form.Item>

        <Form.Item name="Email" rules={[{ required: true }]} label="Email">
          <Input name="email" placeholder="Email del empleado" />
        </Form.Item>

        <Form.Item
          name="FechaContratado"
          label="Contratado en"
          rules={[{ required: true }]}
        >
          <DatePicker name="contratadoEn" onChange={this.onChange} />
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

export default EmpForm;

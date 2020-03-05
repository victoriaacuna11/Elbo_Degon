import React from "react";
import moment from "moment";
import { Form, Input, Button, Select, InputNumber, DatePicker } from "antd";
import axios from "axios";
import { Redirect } from "react-router-dom";

const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};

class MemberForm extends React.Component {
  formRef = React.createRef();

  onReset = () => {
    this.formRef.current.resetFields();
  };

  //estado con un array de proveedores y de categorias
  state = {
    zones: [],
    clients: [],
    redirect: null,
    EsMiembro: false
  };

  //me trae todas las zonas
  componentDidMount() {
    axios.get("http://127.0.0.1:8000/rest/zone/").then(res => {
      this.setState({
        zones: res.data
      });
      console.log(this.state.zones);
    });

    axios.get("http://127.0.0.1:8000/rest/client/").then(res => {
      this.setState({
        clients: res.data
      });
      console.log(this.state.clients);
    });
  }

  //recibo los datos del form y hago un post (crear) en los productos en restframework
  handleFormSubmit = event => {
    //event.preventDefault();
    // const ci = event.CI;
    // const name = event.Nombre;
    // const last_name = event.Apellido;
    // const is_meber = event.EsMiembro;
    // const zone = event.Zona;
    // const availible1 = event.Available1;

    // axios
    //   .post("http://127.0.0.1:8000/rest/client/", {
    //     ci: ci,
    //     name: name,
    //     last_name: last_name,
    //     is_meber: is_meber,
    //     zone: zone,
    //     availible: availible1
    //   })
    //   .then(res => console.log(res))
    //   .catch(error => console.err(error));

    // if (is_meber) {
    const points = 0;
    const phone = event.Phone;
    const gender = event.Gender;
    const address = event.Address;
    const birth_date = moment(event.Birth).format("YYYY-MM-DD");
    const email = event.Email;
    const client = this.props.memID;
    console.log(client);
    const date_registered = moment(event.Date).format("YYYY-MM-DD");
    const password = event.PSW;
    const availible2 = event.Available2;

    axios
      .post("http://127.0.0.1:8000/rest/mem/", {
        points: points,
        phone: phone,
        gender: gender,
        address: address,
        birth_date: birth_date,
        email: email,
        client: client,
        date_registered: date_registered,
        password: password,
        availible: availible2
      })
      .then(res => console.log(res))
      .catch(error => console.error(error));

    this.setState({ redirect: `/mem` });
  };

  //metodo para obtener solo aquellos objetos que tengan el available en true
  getTheAvailables = arrToCheck => {
    const arrAvailables = arrToCheck.filter(x => x.availible === true);
    return arrAvailables;
  };

  handleDelivery = value => {
    //  console.log(value);
    if (value) {
      this.setState({
        ...this.state,
        EsMiembro: true
      });
    } else {
      this.setState({
        ...this.state,
        EsMiembro: false
      });
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <Form
        {...layout}
        ref={this.formRef}
        name="control-ref"
        onFinish={event => this.handleFormSubmit(event)}
      >
        <Form.Item name="Points" label="Puntos del miembro" disabled>
          <Input
            disabled
            placeholder="0"
            name="points"
            style={{ width: 200 }}
            allowClear
          />
        </Form.Item>

        <Form.Item
          name="Phone"
          rules={[
            {
              type: "number",
              required: true,
              min: 4100000000,
              max: 4270000000
            }
          ]}
          label="Telefono"
        >
          <InputNumber placeholder="Telefono principal del miembro" />
        </Form.Item>

        <Form.Item name="Gender" label="Genero" rules={[{ required: true }]}>
          <Select name="genero" placeholder="Genero del miembro" allowClear>
            <Option value="Hombre">Hombre</Option>
            <Option value="Mujer">Mujer</Option>
            <Option value="Otro">Otro</Option>
          </Select>
        </Form.Item>

        <Form.Item name="Address" label="Direccion del miembro">
          <Input
            placeholder="Ingrese direccion"
            name="dir"
            style={{ width: 200 }}
            allowClear
          />
        </Form.Item>

        <Form.Item
          name="Birth"
          label="Fecha de nacimiento"
          rules={[{ required: true }]}
        >
          <DatePicker name="cumple" onChange={this.onChange} />
        </Form.Item>

        <Form.Item name="Email" rules={[{ required: true }]} label="Email">
          <Input name="email" placeholder="Email del miembro" />
        </Form.Item>

        <Form.Item label="ID como cliente" disabled>
          <InputNumber
            disabled
            placeholder={this.props.memID}
            name="points"
            style={{ width: 200 }}
            allowClear
          />
        </Form.Item>

        <Form.Item
          name="Date"
          label="Fecha en la que se registra"
          rules={[{ required: true }]}
        >
          <DatePicker name="cumple" onChange={this.onChange} showToday />
        </Form.Item>

        <Form.Item name="PSW" label="Contrasena">
          <Input
            placeholder="Ingrese una contrasena"
            name="psw"
            style={{ width: 200 }}
            allowClear
          />
        </Form.Item>

        <Form.Item
          name="Available2"
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

export default MemberForm;

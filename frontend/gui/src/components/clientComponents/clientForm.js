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

class ClientForm extends React.Component {
  formRef = React.createRef();

  onReset = () => {
    this.formRef.current.resetFields();
  };

  //estado con un array de proveedores y de categorias
  constructor(props) {
    super(props);
    this.state = {
      zones: [],
      clients: [],
      redirect: null,
      EsMiembro: false
    };
    this.handleDelivery = this.handleDelivery.bind(this);
  }

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
    const ci = event.CI;
    const name = event.Nombre;
    const last_name = event.Apellido;
    const is_meber = event.EsMiembro;
    const zone = event.Zona;
    const availible1 = event.Available1;
    console.log(is_meber);

    axios
      .post("http://127.0.0.1:8000/rest/client/", {
        ci: ci,
        name: name,
        last_name: last_name,
        is_meber: is_meber,
        zone: zone,
        availible: availible1
      })
      .then(res => console.log(res))
      .catch(error => console.err(error));

    if (is_meber) {
      this.setState({ redirect: `/memForm` });
      return window.location.reload(false);
    } else return window.location.reload(false);

    // if (is_meber) {
    //   const points = 0;
    //   const phone = event.Phone;
    //   const gender = event.Gender;
    //   const address = event.Address;
    //   const birth_date = moment(event.Birth).format("YYYY-MM-DD");
    //   const email = event.Email;
    //   const client = this.state.clients.length + 1;
    //   const date_registered = moment(event.Date).format("YYYY-MM-DD");
    //   const password = event.PSW;
    //   const availible2 = event.Available2;

    //   console.log(points);
    //   console.log(phone);
    //   console.log(gender);
    //   console.log(address);
    //   console.log(birth_date);
    //   console.log(email);
    //   console.log(client);
    //   console.log(date_registered);
    //   console.log(password);
    //   console.log(availible2);

    //   axios
    //     .post("http://127.0.0.1:8000/rest/mem/", {
    //       points: points,
    //       phone: phone,
    //       gender: gender,
    //       address: address,
    //       birth_date: birth_date,
    //       email: email,
    //       client: client,
    //       date_registered: date_registered,
    //       password: password,
    //       availible: availible2
    //     })
    //     .then(res => console.log(res))
    //     .catch(error => console.error(error));
    // }
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
        <Form.Item name="CI" rules={[{ required: true }]} label="C.I.">
          <Input name="cedula" placeholder="Cedula del cliente" />
        </Form.Item>

        <Form.Item name="Nombre" rules={[{ required: true }]} label="Nombre">
          <Input name="nombre" placeholder="Nombre del cliente" />
        </Form.Item>

        <Form.Item
          name="Apellido"
          rules={[{ required: true }]}
          label="Apellido"
        >
          <Input name="apellido" placeholder="Apellido del cliente" />
        </Form.Item>

        <Form.Item name="Zona" label="Zona" rules={[{ required: true }]}>
          <Select name="zona" placeholder="Selecciona una zona" allowClear>
            {this.getTheAvailables(this.state.zones).map(z => (
              <Option value={z.id} key={z.name}>
                {z.name} ({z.id})
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="Available1"
          label="Available"
          rules={[{ required: true }]}
        >
          <Select name="availible" placeholder="Elige una opcion" allowClear>
            <Option value={true}>True</Option>
            <Option value={false}>False</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="EsMiembro"
          label="Es miembro"
          rules={[{ required: true }]}
        >
          <Select
            name="miembro"
            placeholder="Elige una opcion"
            allowClear
            // onChange={this.handleDelivery}
          >
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

export default ClientForm;

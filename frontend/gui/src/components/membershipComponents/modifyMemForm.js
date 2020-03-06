import React from "react";
import moment from "moment";
import { Form, Input, Button, Select, InputNumber, DatePicker } from "antd";
import axios from "axios";

const { Option } = Select;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 }
};

class ModifyMemForm extends React.Component {
  formRef = React.createRef();

  onReset = () => {
    this.formRef.current.resetFields();
  };

  state = {
    mems: [],
    finalM: {},
    currMem: {}
  };

  //Me traigo los proveedores, las categorias, y todos los datos del producto en el cual
  //estoy metido
  componentDidMount() {
    axios
      .get(`http://127.0.0.1:8000/rest/mem/${this.props.memID}`)
      .then(res => {
        this.setState({
          currMem: res.data
        });
        // axios.get("http://127.0.0.1:8000/rest/qwill2").then(res => {
        //   this.setState({
        //     mems: res.data.data
        //   });
        //   console.log(this.state.mems);
        //   this.state.finalM = this.state.mems[this.state.currMem.id - 1];
        //   console.log(this.state.finalM);
        // });
      });
  }

  //metodo para el boton de habilitar y deshabilitar. Pone en availible el valor contrario al que tenia y refresca
  handleChangeAvailable = (event, memID) => {
    axios
      .put(`http://127.0.0.1:8000/rest/mem/${memID}/`, {
        points: this.state.currMem.points,
        phone: this.state.currMem.phone,
        gender: this.state.currMem.gender,
        address: this.state.currMem.address,
        birth_date: this.state.currMem.birth_date,
        email: this.state.currMem.email,
        client: this.state.currMem.client,
        date_registered: this.state.currMem.date_registered,
        password: this.state.currMem.password,
        availible: !this.state.currMem.availible
      })
      .then(res => console.log(res))
      .catch(error => console.error(error));

    return window.location.reload(false);
  };

  //Para cambiar el mensaje del boton de habilitar y deshabilitar
  showMessage = () => {
    return this.state.currMem.availible === false
      ? "Habilitar"
      : "Deshabilitar";
  };

  //toma los valores del form y hace un put (modificar) en el producto en el que esta metido
  handleFormSubmit = (event, memID) => {
    //event.preventDefault();
    const points = event.Points;
    const phone = event.Phone;
    const gender = event.Gender;
    const address = event.Address;
    const birth_date = moment(event.Birth).format("YYYY-MM-DD");
    const email = event.Email;
    const client = this.state.currMem.client;
    const date_registered = moment(event.Date).format("YYYY-MM-DD");
    const password = event.PSW;
    const availible2 = event.Available2;

    axios
      .put(`http://127.0.0.1:8000/rest/mem/${memID}/`, {
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
    return window.location.reload(false);
  };

  //Cambiar el color del boton (pura carpinteria papa)
  colorStatus = () => {
    return this.state.currMem.availible === false
      ? "rgba(11,226,8,0.5)"
      : "rgba(233,5,5,0.5)";
  };

  //metodo para obtener solo aquellos objetos que tengan el available en true
  // getTheAvailables = arrToCheck => {
  //   const arrAvailables = arrToCheck.filter(x => x.availible === true);
  //   return arrAvailables;
  // };

  render() {
    return (
      <>
        <Form
          {...layout}
          ref={this.formRef}
          name="control-ref"
          onFinish={event => this.handleFormSubmit(event, this.props.memID)}
        >
          <Form.Item
            name="Points"
            label="Puntos del miembro"
            key={this.state.currMem.points}
            rules={[{ required: true }]}
          >
            <Input
              placeholder={this.state.currMem.points}
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
            key={this.state.currMem.phone}
          >
            <InputNumber placeholder={this.state.currMem.phone} />
          </Form.Item>

          <Form.Item
            name="Gender"
            label="Genero"
            rules={[{ required: true }]}
            key={this.state.currMem.gender}
          >
            <Select
              name="genero"
              placeholder={this.state.currMem.gender}
              allowClear
            >
              <Option value="Hombre">Hombre</Option>
              <Option value="Mujer">Mujer</Option>
              <Option value="Otro">Otro</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="Address"
            label="Direccion del miembro"
            key={this.state.currMem.address}
            rules={[{ required: true }]}
          >
            <Input
              placeholder={this.state.currMem.address}
              name="dir"
              style={{ width: 200 }}
              allowClear
            />
          </Form.Item>

          <Form.Item
            name="Birth"
            label="Fecha de nacimiento"
            rules={[{ required: true }]}
            key={this.state.currMem.birth_date}
          >
            <DatePicker
              name="cumple"
              onChange={this.onChange}
              placeholder={this.state.currMem.birth_date}
            />
          </Form.Item>

          <Form.Item
            name="Email"
            rules={[{ required: true }]}
            label="Email"
            key={this.state.currMem.email}
          >
            <Input name="email" placeholder={this.state.currMem.email} />
          </Form.Item>

          <Form.Item label="ID como cliente" disabled>
            <InputNumber
              disabled
              placeholder={this.state.currMem.client}
              name="points"
              style={{ width: 200 }}
              allowClear
            />
          </Form.Item>

          <Form.Item
            name="Date"
            label="Fecha en la que se registra"
            rules={[{ required: true }]}
            key={this.state.currMem.date_registered}
          >
            <DatePicker
              name="cumple"
              onChange={this.onChange}
              showToday
              placeholder={this.state.currMem.date_registered}
            />
          </Form.Item>

          <Form.Item
            name="PSW"
            label="Contrasena"
            key={this.state.currMem.password}
            rules={[{ required: true }]}
          >
            <Input
              placeholder={this.state.currMem.password}
              name="psw"
              style={{ width: 200 }}
              allowClear
            />
          </Form.Item>

          <Form.Item
            name="Available2"
            label="Available"
            key={this.state.currMem.availible}
          >
            <Select
              name="availible"
              defaultValue={this.state.currMem.availible}
              disabled
              allowClear
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
                this.handleChangeAvailable(event, this.props.memID)
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

export default ModifyMemForm;

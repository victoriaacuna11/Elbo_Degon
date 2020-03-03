import React from "react";
import moment from "moment";
import { Form, Input, Button, Select, InputNumber, DatePicker } from "antd";
import axios from "axios";

const { Option } = Select;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 }
};

class ModifyEmpForm extends React.Component {
  formRef = React.createRef();

  onReset = () => {
    this.formRef.current.resetFields();
  };

  state = {
    currEmp: {}
  };

  //Me traigo los proveedores, las categorias, y todos los datos del producto en el cual
  //estoy metido
  componentDidMount() {
    axios
      .get(`http://127.0.0.1:8000/rest/emp/${this.props.employeeID}`)
      .then(res => {
        this.setState({
          currEmp: res.data
        });
      });
  }

  //metodo para el boton de habilitar y deshabilitar. Pone en availible el valor contrario al que tenia y refresca
  handleChangeAvailable = (event, employeeID) => {
    axios
      .put(`http://127.0.0.1:8000/rest/emp/${employeeID}/`, {
        ci: this.state.currEmp.ci,
        name: this.state.currEmp.name,
        last_name: this.state.currEmp.last_name,
        phone: this.state.currEmp.phone,
        points: this.state.currEmp.points,
        adress: this.state.currEmp.adress,
        gender: this.state.currEmp.gender,
        birth_date: this.state.currEmp.birth_date,
        job_id: this.state.currEmp.job_id,
        email: this.state.currEmp.email,
        date_hired: this.state.currEmp.date_hired,
        availible: !this.state.currEmp.availible
      })
      .then(res => console.log(res))
      .catch(error => console.error(error));

    return window.location.reload(false);
  };

  //Para cambiar el mensaje del boton de habilitar y deshabilitar
  showMessage = () => {
    return this.state.currEmp.availible === false
      ? "Habilitar"
      : "Deshabilitar";
  };

  //toma los valores del form y hace un put (modificar) en el producto en el que esta metido
  handleFormSubmit = (event, employeeID) => {
    //event.preventDefault();
    const ci = event.CI;
    const name = event.Nombre;
    const last_name = event.Apellido;
    const phone = event.MPhone;
    const points = event.Puntos;
    const adress = event.Address;
    const gender = event.Genero;
    const birth_date = moment(event.Cumple).format("YYYY-MM-DD");
    const job_id = event.Trabajo;
    const email = event.Email;
    const date_hired = moment(event.FechaContratado).format("YYYY-MM-DD");
    const availible = event.Available;

    axios
      .put(`http://127.0.0.1:8000/rest/emp/${employeeID}/`, {
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

  //Cambiar el color del boton (pura carpinteria papa)
  colorStatus = () => {
    return this.state.currEmp.availible === false
      ? "rgba(11,226,8,0.5)"
      : "rgba(233,5,5,0.5)";
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
            name="Nombre"
            rules={[{ required: true }]}
            label="Nombre"
            key={this.state.currEmp.name}
          >
            <Input name="name" placeholder={this.state.currEmp.name} />
          </Form.Item>

          <Form.Item
            name="Apellido"
            rules={[{ required: true }]}
            label="Apellido"
            key={this.state.currEmp.last_name}
          >
            <Input name="apellido" placeholder={this.state.currEmp.last_name} />
          </Form.Item>

          <Form.Item
            name="CI"
            rules={[{ type: "number", required: true, min: 1 }]}
            label="CI"
            key={this.state.currEmp.ci}
          >
            <InputNumber name="CI" placeholder={this.state.currEmp.ci} />
          </Form.Item>

          <Form.Item
            name="MPhone"
            rules={[
              {
                type: "number",
                required: true,
                min: 4100000000,
                max: 4270000000
              }
            ]}
            label="Telefono principal"
            key={this.state.currEmp.phone}
          >
            <InputNumber placeholder={this.state.currEmp.phone} />
          </Form.Item>

          <Form.Item
            name="Puntos"
            rules={[{ required: true }]}
            label="Puntos"
            key={this.state.currEmp.points}
          >
            <Input name="puntos" placeholder={this.state.currEmp.points} />
          </Form.Item>

          <Form.Item
            name="Address"
            rules={[{ required: true }]}
            label="Direccion"
            key={this.state.currEmp.adress}
          >
            <Input name="address" placeholder={this.state.currEmp.adress} />
          </Form.Item>

          <Form.Item
            name="Genero"
            label="Genero"
            rules={[{ required: true }]}
            key={this.state.currEmp.gender}
          >
            <Select
              name="genero"
              placeholder={this.state.currEmp.gender}
              allowClear
            >
              <Option value="Hombre">Hombre</Option>
              <Option value="Mujer">Mujer</Option>
              <Option value="Otro">Otro</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="Cumple"
            label="Fecha de nacimiento"
            rules={[{ required: true }]}
            key={this.state.currEmp.birth_date}
          >
            <DatePicker
              name="cumple"
              onChange={this.onChange}
              placeholder={this.state.currEmp.birth_date}
            />
          </Form.Item>

          <Form.Item
            name="Trabajo"
            label="Trabajo"
            rules={[{ required: true }]}
            key={this.state.currEmp.job_id}
          >
            <Select
              name="trabajo"
              placeholder={this.state.currEmp.job_id}
              allowClear
            >
              <Option value="Gerente">Gerente</Option>
              <Option value="Repartidor">Repartidor</Option>
              <Option value="Cajero">Cajero</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="Email"
            rules={[{ required: true }]}
            label="Email"
            key={this.state.currEmp.email}
          >
            <Input name="email" placeholder={this.state.currEmp.email} />
          </Form.Item>

          <Form.Item
            name="FechaContratado"
            label="Contratado en"
            rules={[{ required: true }]}
            key={this.state.currEmp.date_hired}
          >
            <DatePicker
              name="contratadoEn"
              onChange={this.onChange}
              placeholder={this.state.currEmp.date_hired}
            />
          </Form.Item>

          <Form.Item
            name="Available"
            label="Available"
            key={this.state.currEmp.availible}
          >
            <Select
              name="availible"
              placeholder="Elige una opcion"
              defaultValue={this.state.currEmp.availible}
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

export default ModifyEmpForm;

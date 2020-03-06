import React from "react";
import moment from "moment";
import { Form, Input, Button, Select, TimePicker } from "antd";
import axios from "axios";

const { Option } = Select;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 }
};

class ModifyDeliveryForm extends React.Component {
  formRef = React.createRef();

  onReset = () => {
    this.formRef.current.resetFields();
  };

  state = {
    bills: [],
    employees: [],
    zones: [],
    currDel: {}
  };

  //Me traigo los proveedores, las categorias, y todos los datos del producto en el cual
  //estoy metido
  componentDidMount() {
    axios
      .get(`http://127.0.0.1:8000/rest/delivery/${this.props.deliveryID}`)
      .then(res => {
        this.setState({
          currDel: res.data
        });
        console.log(this.state.currDel);
      });

    axios.get("http://127.0.0.1:8000/rest/bill/").then(res => {
      this.setState({
        bills: res.data
      });
    });

    axios.get("http://127.0.0.1:8000/rest/emp/").then(ras => {
      this.setState({
        employees: ras.data
      });
    });

    axios.get("http://127.0.0.1:8000/rest/zone/").then(ras => {
      this.setState({
        zones: ras.data
      });
    });
  }

  //metodo para el boton de habilitar y deshabilitar. Pone en availible el valor contrario al que tenia y refresca
  handleChangeAvailable = (event, deliveryID) => {
    axios
      .put(`http://127.0.0.1:8000/rest/delivery/${deliveryID}/`, {
        bill_id: this.state.currDel.bill_id,
        address: this.state.currDel.address,
        min_time: this.state.currDel.min_time,
        delivery_boy: this.state.currDel.delivery_boy,
        delivered: this.state.currDel.delivered,
        zone: this.state.currDel.zone,
        availible: !this.state.currDel.availible
      })
      .then(res => console.log(res))
      .catch(error => console.error(error));

    return window.location.reload(false);
  };

  //Para cambiar el mensaje del boton de habilitar y deshabilitar
  showMessage = () => {
    return this.state.currDel.availible === false
      ? "Habilitar"
      : "Deshabilitar";
  };

  //toma los valores del form y hace un put (modificar) en el producto en el que esta metido
  handleFormSubmit = (event, deliveryID) => {
    //event.preventDefault();
    const bill_id = this.state.currDel.bill_id;
    const address = event.Direccion;
    const min_time = moment(event.HoraEntregar).format("HH:mm:ss");
    const delivery_boy = event.Repartidor;
    const delivered = event.Entregado;
    const zone = event.Zona;
    const availible = this.state.currDel.availible;

    axios
      .put(`http://127.0.0.1:8000/rest/delivery/${deliveryID}/`, {
        bill_id: bill_id,
        address: address,
        min_time: min_time,
        delivery_boy: delivery_boy,
        delivered: delivered,
        zone: zone,
        availible: availible
      })
      .then(res => console.log(res))
      .catch(error => console.error(error));
    return window.location.reload(false);
  };

  //Cambiar el color del boton (pura carpinteria papa)
  colorStatus = () => {
    return this.state.currDel.availible === false
      ? "rgba(11,226,8,0.5)"
      : "rgba(233,5,5,0.5)";
  };

  //metodo para obtener solo aquellos objetos que tengan el available en true
  getTheAvailables = arrToCheck => {
    const arrAvailables = arrToCheck.filter(x => x.availible === true);
    return arrAvailables;
  };

  getDeliveryBoys = employees => {
    const arrDel = employees.filter(x => x.job_id == "Repartidor");
    return arrDel.filter(x => x.availible === true);
  };

  //   getNameCurrEmployee = (employees, employee) => {
  //     const Emp = employees.filter(x => x.id == employee)[0];
  //     return Emp;
  //   };

  showTrueFalse = () => {
    return this.state.currDel.delivered === false ? "False" : "True";
  };

  render() {
    return (
      <>
        <Form
          {...layout}
          ref={this.formRef}
          name="control-ref"
          onFinish={event =>
            this.handleFormSubmit(event, this.props.deliveryID)
          }
        >
          <Form.Item
            name="Factura"
            label="Factura"
            key={this.state.currDel.bill_id}
          >
            <Select
              name="factura"
              defaultValue={this.state.currDel.bill_id}
              allowClear
              disabled
            >
              {this.getTheAvailables(this.state.bills).map(x => (
                <Option value={x.id} key={x.id}>
                  {x.id}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="Direccion"
            rules={[{ required: true }]}
            label="Direccion"
            key={this.state.currDel.address}
          >
            <Input name="address" placeholder={this.state.currDel.address} />
          </Form.Item>

          <Form.Item
            name="HoraEntregar"
            label="Hora de entrega"
            key={this.state.currDel.min_time}
          >
            <TimePicker
              name="tiempoMin"
              placeholder={this.state.currDel.min_time}
            />
          </Form.Item>

          <Form.Item
            name="Repartidor"
            label="Repartidor/a"
            key={this.state.currDel.delivery_boy}
          >
            <Select
              name="rep"
              placeholder={this.state.currDel.delivery_boy}
              value={this.state.currDel.delivery_boy}
              allowClear
            >
              {this.getDeliveryBoys(this.state.employees).map(x => (
                <Option value={x.id} key={x.id}>
                  {x.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="Zona"
            label="Zona del delivery"
            key={this.state.currDel.zone}
          >
            <Select
              name="zone"
              placeholder={this.state.currDel.zone}
              value={this.state.currDel.zone}
              allowClear
            >
              {this.getTheAvailables(this.state.zones).map(x => (
                <Option value={x.id} key={x.id}>
                  {x.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="Entregado"
            label="Fue entregado"
            key={this.state.currDel.delivered}
          >
            <Select
              defaultValue={this.showTrueFalse()}
              name="delivered"
              placeholder="Elige una opcion"
              allowClear
            >
              <Option value={true}>True</Option>
              <Option value={false}>False</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="Available"
            label="Available"
            key={this.state.currDel.availible}
          >
            <Select
              defaultValue={this.state.currDel.availible}
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
                this.handleChangeAvailable(event, this.props.deliveryID)
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

export default ModifyDeliveryForm;

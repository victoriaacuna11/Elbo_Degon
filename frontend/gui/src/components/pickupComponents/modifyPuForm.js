import React from "react";
import { Form, Input, Button, Select, TimePicker } from "antd";
import axios from "axios";
import moment from "moment";

const { Option } = Select;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 }
};

class ModifyPuForm extends React.Component {
  formRef = React.createRef();

  onReset = () => {
    this.formRef.current.resetFields();
  };

  state = {
    bills: [],
    locals: [],
    currPickUp: {}
  };

  //Me traigo los proveedores, las categorias, y todos los datos del producto en el cual
  //estoy metido
  componentDidMount() {
    axios
      .get(`http://127.0.0.1:8000/rest/pickup/${this.props.pickupID}`)
      .then(res => {
        this.setState({
          currPickUp: res.data
        });
      });

    axios.get("http://127.0.0.1:8000/rest/bill/").then(res => {
      this.setState({
        bills: res.data
      });
    });

    axios.get("http://127.0.0.1:8000/rest/local/").then(ras => {
      this.setState({
        locals: ras.data
      });
    });
  }

  //metodo para el boton de habilitar y deshabilitar. Pone en availible el valor contrario al que tenia y refresca
  handleChangeAvailable = (event, pickupID) => {
    axios
      .put(`http://127.0.0.1:8000/rest/pickup/${pickupID}/`, {
        bill_id: this.state.currPickUp.bill_id,
        pick_up_time: this.state.currPickUp.pick_up_time,
        local: this.state.currPickUp.local,
        delivered: this.state.currPickUp.delivered,
        availible: !this.state.currPickUp.availible
      })
      .then(res => console.log(res))
      .catch(error => console.error(error));

    return window.location.reload(false);
  };

  //Para cambiar el mensaje del boton de habilitar y deshabilitar
  showMessage = () => {
    return this.state.currPickUp.availible === false
      ? "Habilitar"
      : "Deshabilitar";
  };

  //toma los valores del form y hace un put (modificar) en el producto en el que esta metido
  handleFormSubmit = (event, pickupID) => {
    //event.preventDefault();
    const bill_id = this.state.currPickUp.bill_id;
    const pick_up_time = moment(event.HoraP).format("HH:mm:ss");
    const local = event.Local;
    const delivered = event.Entregado;
    const availible = this.state.currPickUp.availible;

    console.log(bill_id);
    console.log(pick_up_time);
    console.log(local);
    console.log(delivered);
    console.log(availible);

    axios
      .put(`http://127.0.0.1:8000/rest/pickup/${pickupID}/`, {
        bill_id: bill_id,
        pick_up_time: pick_up_time,
        local: local,
        delivered: delivered,
        availible: availible
      })
      .then(res => console.log(res))
      .catch(error => console.error(error));
    return window.location.reload(false);
  };

  //Cambiar el color del boton (pura carpinteria papa)
  colorStatus = () => {
    return this.state.currPickUp.availible === false
      ? "rgba(11,226,8,0.5)"
      : "rgba(233,5,5,0.5)";
  };

  //metodo para obtener solo aquellos objetos que tengan el available en true
  getTheAvailables = arrToCheck => {
    const arrAvailables = arrToCheck.filter(x => x.availible === true);
    return arrAvailables;
  };

  showTrueFalse = () => {
    return this.state.currPickUp.delivered === false ? "False" : "True";
  };

  render() {
    return (
      <>
        <Form
          {...layout}
          ref={this.formRef}
          name="control-ref"
          onFinish={event => this.handleFormSubmit(event, this.props.pickupID)}
        >
          <Form.Item
            name="Factura"
            label="Factura"
            key={this.state.currPickUp.bill_id}
            disabled
          >
            <Select
              name="factura"
              placeholder={this.state.currPickUp.bill_id}
              value={this.state.currPickUp.bill_id}
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
            name="HoraP"
            label="Hora del pickup"
            key={this.state.currPickUp.pick_up_time}
          >
            <TimePicker
              name="hora"
              placeholder={this.state.currPickUp.pick_up_time}
            />
          </Form.Item>

          <Form.Item
            name="Local"
            rules={[{ required: true }]}
            label="Local"
            key={this.state.currPickUp.bill_id}
            disabled
          >
            <Select
              name="local"
              placeholder={this.state.currPickUp.local}
              allowClear
            >
              {this.getTheAvailables(this.state.locals).map(x => (
                <Option value={x.id} key={x.name}>
                  {x.address}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="Entregado"
            label="Entregado"
            key={this.state.currPickUp.availible}
          >
            <Select
              name="entregado"
              placeholder={this.showTrueFalse()}
              allowClear
            >
              <Option value={true}>True</Option>
              <Option value={false}>False</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="Available"
            label="Available"
            key={this.state.currPickUp.availible}
          >
            <Select
              defaultValue={this.state.currPickUp.availible}
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
                this.handleChangeAvailable(event, this.props.pickupID)
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

export default ModifyPuForm;

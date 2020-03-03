import React from "react";
import moment from "moment";
import { Form, Input, Button, Select, InputNumber, DatePicker } from "antd";
import axios from "axios";

const { Option } = Select;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 }
};

class ModifyCeForm extends React.Component {
  formRef = React.createRef();

  onReset = () => {
    this.formRef.current.resetFields();
  };

  state = {
    currExchange: {}
  };

  //Me traigo todos los datos del producto en el cual
  //estoy metido
  componentDidMount() {
    axios
      .get(`http://127.0.0.1:8000/rest/currency/${this.props.currencyID}`)
      .then(res => {
        this.setState({
          currExchange: res.data
        });
      });

    // axios.get("http://127.0.0.1:8000/rest/prov/").then(res => {
    //   this.setState({
    //     providers: res.data
    //   });
    // });

    // axios.get("http://127.0.0.1:8000/rest/category/").then(ras => {
    //   this.setState({
    //     category: ras.data
    //   });
    // });
  }

  //metodo para el boton de habilitar y deshabilitar. Pone en availible el valor contrario al que tenia y refresca
  handleChangeAvailable = (event, currencyID) => {
    axios
      .put(`http://127.0.0.1:8000/rest/currency/${currencyID}/`, {
        bs_exchange: this.state.currExchange.bs_exchange,
        euro_exchange: this.state.currExchange.euro_exchange,
        date: this.state.currExchange.date,
        is_Active: this.state.currExchange.is_Active,
        availible: !this.state.currExchange.availible
      })
      .then(res => console.log(res))
      .catch(error => console.error(error));

    return window.location.reload(false);
  };

  //Para cambiar el mensaje del boton de habilitar y deshabilitar
  showMessage = () => {
    return this.state.currExchange.availible === false
      ? "Habilitar"
      : "Deshabilitar";
  };

  showTrueFalse = () => {
    return this.state.currExchange.is_Active === false ? "False" : "True";
  };

  //toma los valores del form y hace un put (modificar) en el producto en el que esta metido
  handleFormSubmit = (event, currencyID) => {
    //event.preventDefault();
    const bs_exchange = event.BS;
    const euro_exchange = event.EU;
    const date = moment(event.Fecha).format("YYYY-MM-DD");
    const is_Active = event.Activo;
    const availible = event.Available;

    axios
      .put(`http://127.0.0.1:8000/rest/currency/${currencyID}/`, {
        bs_exchange: bs_exchange,
        euro_exchange: euro_exchange,
        date: date,
        is_Active: is_Active,
        availible: availible
      })
      .then(res => console.log(res))
      .catch(error => console.error(error));
    return window.location.reload(false);
  };

  //Cambiar el color del boton (pura carpinteria papa)
  colorStatus = () => {
    return this.state.currExchange.availible === false
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
          onFinish={event =>
            this.handleFormSubmit(event, this.props.currencyID)
          }
        >
          <Form.Item
            name="BS"
            rules={[{ type: "number", required: true, min: 0 }]}
            label="BS"
            key={this.state.currExchange.bs_exchange}
          >
            <InputNumber
              name="BS"
              placeholder={this.state.currExchange.bs_exchange}
            />
          </Form.Item>

          <Form.Item
            name="EU"
            rules={[{ type: "number", required: true, min: 0 }]}
            label="EU"
            key={this.state.currExchange.euro_exchange}
          >
            <InputNumber
              name="EU"
              placeholder={this.state.currExchange.euro_exchange}
            />
          </Form.Item>

          <Form.Item
            name="Fecha"
            label="Fecha"
            rules={[{ required: true }]}
            key={this.state.currExchange.date}
          >
            <DatePicker
              name="fecha"
              onChange={this.onChange}
              placeholder={this.state.currExchange.date}
            />
          </Form.Item>

          <Form.Item
            name="Activo"
            label="Activo"
            rules={[{ required: true }]}
            key={this.state.currExchange.is_Active}
          >
            <Select name="activo" placeholder={this.showTrueFalse()} allowClear>
              <Option value={true}>True</Option>
              <Option value={false}>False</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="Available"
            label="Available"
            key={this.state.currExchange.availible}
          >
            <Select
              name="availible"
              placeholder="Elige una opcion"
              defaultValue={this.state.currExchange.availible}
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
                this.handleChangeAvailable(event, this.props.currencyID)
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

export default ModifyCeForm;

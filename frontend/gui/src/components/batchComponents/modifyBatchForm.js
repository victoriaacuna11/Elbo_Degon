import React from "react";
import moment from "moment";
import { Form, Input, Button, Select, InputNumber, DatePicker } from "antd";
import axios from "axios";

const { Option } = Select;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 }
};

class ModifyBatchForm extends React.Component {
  formRef = React.createRef();

  onReset = () => {
    this.formRef.current.resetFields();
  };

  state = {
    products: [],
    locals: [],
    currBatch: {}
  };

  //Me traigo los proveedores, las categorias, y todos los datos del producto en el cual
  //estoy metido
  componentDidMount() {
    axios
      .get(`http://127.0.0.1:8000/rest/pbatch/${this.props.batchID}`)
      .then(res => {
        this.setState({
          currBatch: res.data
        });
        console.log(this.state.currBatch);
      });

    axios.get("http://127.0.0.1:8000/rest/prod/").then(res => {
      this.setState({
        products: res.data
      });
    });

    axios.get("http://127.0.0.1:8000/rest/local/").then(ras => {
      this.setState({
        locals: ras.data
      });
    });
  }

  //metodo para el boton de habilitar y deshabilitar. Pone en availible el valor contrario al que tenia y refresca
  handleChangeAvailable = (event, batchID) => {
    axios
      .put(`http://127.0.0.1:8000/rest/pbatch/${batchID}/`, {
        product: this.state.currBatch.product,
        expiration_date: this.state.currBatch.expiration_date,
        elaboration_date: this.state.currBatch.elaboration_date,
        actual_quantity: this.state.currBatch.actual_quantity,
        quantity_sold: this.state.currBatch.quantity_sold,
        cost: this.state.currBatch.cost,
        discount: this.state.currBatch.discount,
        price: this.state.currBatch.price,
        point_cost: this.state.currBatch.point_cost,
        local: this.state.currBatch.local,
        availible: !this.state.currBatch.availible
      })
      .then(res => console.log(res))
      .catch(error => console.error(error));

    return window.location.reload(false);
  };

  //Para cambiar el mensaje del boton de habilitar y deshabilitar
  showMessage = () => {
    return this.state.currBatch.availible === false
      ? "Habilitar"
      : "Deshabilitar";
  };

  //toma los valores del form y hace un put (modificar) en el producto en el que esta metido
  handleFormSubmit = (event, batchID) => {
    //event.preventDefault();
    const product = event.Producto;
    const expiration_date = moment(event.FechaExp).format("YYYY-MM-DD");
    const elaboration_date = moment(event.FechaElab).format("YYYY-MM-DD");
    const actual_quantity = event.Cantidad;
    const quantity_sold = event.CantidadDeVendidos;
    const cost = event.Costo;
    const discount = event.Descuento;
    const price = event.Precio;
    const point_cost = event.PrecioEnPuntos;
    const local = event.Local;
    const availible = event.Available;

    axios
      .put(`http://127.0.0.1:8000/rest/pbatch/${batchID}/`, {
        product: product,
        expiration_date: expiration_date,
        elaboration_date: elaboration_date,
        actual_quantity: actual_quantity,
        quantity_sold: quantity_sold,
        cost: cost,
        discount: discount,
        price: price,
        point_cost: point_cost,
        local: local,
        availible: availible
      })
      .then(res => console.log(res))
      .catch(error => console.error(error));
    return window.location.reload(false);
  };

  //Cambiar el color del boton (pura carpinteria papa)
  colorStatus = () => {
    return this.state.currBatch.availible === false
      ? "rgba(11,226,8,0.5)"
      : "rgba(233,5,5,0.5)";
  };

  //metodo para obtener solo aquellos objetos que tengan el available en true
  getTheAvailables = arrToCheck => {
    const arrAvailables = arrToCheck.filter(x => x.availible === true);
    return arrAvailables;
  };

  render() {
    return (
      <>
        <Form
          {...layout}
          ref={this.formRef}
          name="control-ref"
          onFinish={event => this.handleFormSubmit(event, this.props.batchID)}
        >
          <Form.Item
            name="Producto"
            label="Producto"
            rules={[{ required: true }]}
            key={this.state.currBatch.product}
          >
            <Select
              name="produ"
              placeholder={this.state.currBatch.product}
              allowClear
            >
              {this.getTheAvailables(this.state.products).map(prod => (
                <Option value={prod.id} key={prod.product_name}>
                  {prod.product_name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="FechaExp"
            label="Fecha de expiracion"
            key={this.state.currBatch.expiration_date}
          >
            <DatePicker
              name="expiracion"
              placeholder={this.state.currBatch.expiration_date}
            />
          </Form.Item>

          <Form.Item
            name="fechaElab"
            label="Fecha de elaboracion"
            key={this.state.currBatch.elaboration_date}
          >
            <DatePicker
              name="elaboracion"
              placeholder={this.state.currBatch.elaboration_date}
            />
          </Form.Item>

          <Form.Item
            name="Cantidad"
            rules={[{ type: "number", required: true, min: 0 }]}
            label="Cantidad que se tiene"
            key={this.state.currBatch.actual_quantity}
          >
            <InputNumber
              name="cant"
              placeholder={this.state.currBatch.actual_quantity}
            />
          </Form.Item>

          <Form.Item
            name="CantidadDeVendidos"
            rules={[{ type: "number", required: true, min: 0 }]}
            label="Cantidad que se ha vendido"
            key={this.state.currBatch.quantity_sold}
          >
            <InputNumber
              name="cant"
              placeholder={this.state.currBatch.quantity_sold}
              en
              el
              local
            />
          </Form.Item>

          <Form.Item
            name="Costo"
            rules={[{ type: "number", required: true, min: 0 }]}
            label="Costo del batch"
            key={this.state.currBatch.cost}
          >
            <InputNumber
              name="cant"
              placeholder={this.state.currBatch.cost}
              en
              el
              local
            />
          </Form.Item>

          <Form.Item
            name="Descuento"
            rules={[{ type: "number", required: true, min: 0 }]}
            label="Descuento del batch"
            key={this.state.currBatch.discount}
          >
            <InputNumber
              name="cant"
              placeholder={this.state.currBatch.discount}
              en
              el
              local
            />
          </Form.Item>

          <Form.Item
            name="Precio"
            rules={[{ type: "number", required: true, min: 0 }]}
            label="Precio del batch"
            key={this.state.currBatch.price}
          >
            <InputNumber
              name="prec"
              placeholder={this.state.currBatch.price}
              en
              el
              local
            />
          </Form.Item>

          <Form.Item
            name="PrecioEnPuntos"
            rules={[{ type: "number", required: true, min: 0 }]}
            label="Precio del producto (En Puntos)"
            key={this.state.currBatch.point_cost}
          >
            <InputNumber
              name="prec2"
              placeholder={this.state.currBatch.point_cost}
            />
          </Form.Item>

          <Form.Item
            name="Local"
            label="Local"
            key={this.state.currBatch.local}
          >
            <Select
              name="Local"
              placeholder={this.state.currBatch.local}
              allowClear
            >
              {this.getTheAvailables(this.state.locals).map(loc => (
                <Option value={loc.id} key={loc.address}>
                  {loc.address}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {/* 
        <Form.Item
          name="Available"
          label="Available"
          rules={[{ required: true }]}
        >
          <Select name="availible" placeholder="Elige una opcion" allowClear>
            <Option value={true}>True</Option>
            <Option value={false}>False</Option>
          </Select>
        </Form.Item> */}

          <Form.Item
            name="Available"
            label="Available"
            key={this.state.currBatch.availible}
          >
            <Select
              defaultValue={this.state.currBatch.availible}
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
                this.handleChangeAvailable(event, this.props.batchID)
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

export default ModifyBatchForm;

import React from "react";
import { Form, Input, Button, Select, InputNumber, DatePicker } from "antd";
import axios from "axios";
import moment from "moment";

const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};

class BatchForm extends React.Component {
  formRef = React.createRef();

  onReset = () => {
    this.formRef.current.resetFields();
  };

  //estado con un array de proveedores y de categorias
  state = {
    products: [],
    locals: []
  };

  //me trae todos los proveedores y las categorias de la DB para poder mostrarlos en un dropdown en el form
  componentDidMount() {
    axios.get("http://127.0.0.1:8000/rest/prod/").then(res => {
      this.setState({
        products: res.data
      });
      console.log(this.state.products);
    });

    axios.get("http://127.0.0.1:8000/rest/local/").then(ras => {
      this.setState({
        locals: ras.data
      });
      console.log(this.state.locals);
    });
  }

  //recibo los datos del form y hago un post (crear) en los productos en restframework
  handleFormSubmit = event => {
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
      .post("http://127.0.0.1:8000/rest/pbatch/", {
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

  //metodo para obtener solo aquellos objetos que tengan el available en true
  getTheAvailables = arrToCheck => {
    const arrAvailables = arrToCheck.filter(x => x.availible === true);
    return arrAvailables;
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
          name="Producto"
          label="Producto"
          rules={[{ required: true }]}
        >
          <Select name="produ" placeholder="Selecciona un producto" allowClear>
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
          rules={[{ required: true }]}
        >
          <DatePicker name="expiracion" onChange={this.onChange} />
        </Form.Item>

        <Form.Item
          name="fechaElab"
          label="Fecha de elaboracion"
          rules={[{ required: true }]}
        >
          <DatePicker name="elaboracion" onChange={this.onChange} />
        </Form.Item>

        <Form.Item
          name="Cantidad"
          rules={[{ type: "number", required: true, min: 0 }]}
          label="Cantidad que se tiene"
        >
          <InputNumber
            name="cant"
            placeholder="Cantidad disponible en el local"
          />
        </Form.Item>

        <Form.Item
          name="CantidadDeVendidos"
          rules={[{ type: "number", required: true, min: 0 }]}
          label="Cantidad vendida"
        >
          <InputNumber name="cant" placeholder="Nro. de ventas" en el local />
        </Form.Item>

        <Form.Item
          name="Costo"
          rules={[{ type: "number", required: true, min: 0 }]}
          label="Costo del batch"
        >
          <InputNumber name="cant" placeholder="Costo" en el local />
        </Form.Item>

        <Form.Item
          name="Descuento"
          rules={[{ type: "number", required: true, min: 0 }]}
          label="Descuento del batch"
        >
          <InputNumber name="cant" placeholder="Descuento" en el local />
        </Form.Item>

        <Form.Item
          name="Precio"
          rules={[{ type: "number", required: true, min: 0 }]}
          label="Precio del batch"
        >
          <InputNumber name="prec" placeholder="Precio" en el local />
        </Form.Item>

        <Form.Item
          name="PrecioEnPuntos"
          rules={[{ type: "number", required: true, min: 0 }]}
          label="Precio del producto(en Puntos)"
        >
          <InputNumber
            name="prec2"
            placeholder="Precio del producto usando puntos"
          />
        </Form.Item>

        <Form.Item name="Local" label="Local" rules={[{ required: true }]}>
          <Select name="Local" placeholder="Selecciona un local" allowClear>
            {this.getTheAvailables(this.state.locals).map(loc => (
              <Option value={loc.id} key={loc.address}>
                {loc.address}
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

export default BatchForm;

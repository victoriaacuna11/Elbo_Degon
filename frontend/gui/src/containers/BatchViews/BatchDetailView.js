import React from "react";
import axios from "axios";
import { Card } from "antd";
import ModifyBatchForm from "../../components/batchComponents/modifyBatchForm";

class BatchDetail extends React.Component {
  state = {
    batches: [],
    batch: {},
    finalB: {},
    product: {},
    local: {}
  };

  componentDidMount() {
    const batchID = this.props.match.params.batchID;
    axios.get(`http://127.0.0.1:8000/rest/pbatch/${batchID}`).then(res => {
      this.setState({
        batch: res.data
      });
      axios
        .get(`http://127.0.0.1:8000/rest/prod/${this.state.batch.product}`)
        .then(res => {
          this.setState({
            product: res.data
          });
        });

      axios
        .get(`http://127.0.0.1:8000/rest/local/${this.state.batch.local}`)
        .then(res => {
          this.setState({
            local: res.data
          });
        });

      axios.get("http://127.0.0.1:8000/rest/vista_lotes").then(res => {
        this.setState({
          batches: res.data.data
        });
        console.log(this.state.batches);
        this.state.finalB = this.state.batches[this.state.batch.id - 1];
        console.log(this.state.finalB);
      });
    });
  }

  isAvailable = () => {
    return this.state.batch.availible === true ? "Si" : "No";
  };

  render() {
    return (
      <>
        <h2>Lote:</h2>
        <Card
          title={
            "ID del lote: " +
            this.state.batch.id +
            "---" +
            this.state.product.product_name +
            " (" +
            this.state.product.id +
            ")" +
            "---(elaborado):" +
            this.state.batch.elaboration_date +
            "---(vence):" +
            this.state.batch.expiration_date
          }
        >
          <p>Producto: {this.state.product.product_name}</p>
          <p>Elaborados en: {this.state.batch.elaboration_date}</p>
          <p>Expiran en: {this.state.batch.expiration_date}</p>
          <p>Local: {this.state.local.address}</p>
          <p>Cantidad actual: {this.state.batch.actual_quantity}</p>
          <p>
            Cantidad de productos vendidos: {this.state.batch.quantity_sold}
          </p>
          <p>Costo: {this.state.batch.cost}</p>
          <p>Descuento: {this.state.batch.discount}</p>
          <p>Precio: {this.state.batch.price}</p>
          <p>Precio en puntos: {this.state.batch.point_cost}</p>
          <p>Habilitado: {this.isAvailable()}</p>
        </Card>
        <br />
        <h2 style={{ marginLeft: 650 }}>Modificar Lote:</h2>
        <ModifyBatchForm batchID={this.props.match.params.batchID} />
      </>
    );
  }
}

export default BatchDetail;
